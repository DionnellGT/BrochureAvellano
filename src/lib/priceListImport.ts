import type { WorkBook } from "xlsx";

import type { LotPayload } from "@/api/pricesList.types";

// ---- Importación de listas + lotes desde CSV o Excel ----
//
// Formato esperado: una fila por lote. Los datos de la lista (nombre,
// descripción, link de tour 360°) se repiten en cada fila que pertenece a
// esa lista; las filas se agrupan por "name" para armar cada lista con
// todos sus lotes. La marca y el tipo NO van en el archivo: los define el
// tab desde el que se importa (igual que en "Crear lista").

export interface ImportGroup {
  name: string;
  description?: string;
  has360Tour?: string;
  lots: LotPayload[];
}

interface NormalizedRow {
  name?: string;
  description?: string;
  has360Tour?: string;
  lot?: string;
  typology?: string;
  area?: string;
  priceList?: string;
  installmentPrice?: string;
  installmentPrice2?: string;
  cashPrice?: string;
}

// Distintos encabezados posibles (es/en, con o sin tildes/espacios/mayúsculas)
// que se aceptan para cada columna.
const HEADER_ALIASES: Record<string, keyof NormalizedRow> = {
  name: "name",
  nombre: "name",
  lista: "name",
  proyecto: "name",
  description: "description",
  descripcion: "description",
  has360tour: "has360Tour",
  tour360: "has360Tour",
  tour: "has360Tour",
  linktour: "has360Tour",
  lot: "lot",
  lote: "lot",
  nlote: "lot",
  numerolote: "lot",
  typology: "typology",
  tipologia: "typology",
  area: "area",
  superficie: "area",
  superficiem2: "area",
  pricelist: "priceList",
  preciolista: "priceList",
  installmentprice: "installmentPrice",
  piecuotas: "installmentPrice",
  pie: "installmentPrice",
  installmentprice2: "installmentPrice2",
  cashprice: "cashPrice",
  contado: "cashPrice",
  preciocontado: "cashPrice",
};

function normalizeHeader(header: string): keyof NormalizedRow | null {
  const key = header
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita tildes
    .replace(/[^a-z0-9]/g, ""); // quita espacios, guiones y símbolos

  return HEADER_ALIASES[key] ?? null;
}

// Lee un archivo .csv o .xlsx/.xls y devuelve sus filas ya normalizadas
// (encabezados mapeados a las claves internas conocidas).
export async function parsePriceListFile(file: File): Promise<NormalizedRow[]> {
  const XLSX = await import("xlsx");
  const buffer = await file.arrayBuffer();

  let workbook: WorkBook;
  try {
    workbook = XLSX.read(buffer, { type: "array" });
  } catch {
    throw new Error("No se pudo leer el archivo. Verifica que sea un .csv o .xlsx válido.");
  }

  const sheetName = workbook.SheetNames[0];
  if (!sheetName) throw new Error("El archivo no tiene hojas con datos.");

  const sheet = workbook.Sheets[sheetName];
  const rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });

  if (rawRows.length === 0) throw new Error("El archivo no tiene filas de datos.");

  return rawRows.map((rawRow) => {
    const normalized: NormalizedRow = {};
    for (const [header, value] of Object.entries(rawRow)) {
      const key = normalizeHeader(header);
      if (key) normalized[key] = String(value).trim();
    }
    return normalized;
  });
}

interface GroupResult {
  groups: ImportGroup[];
  errors: string[];
}

// Valida cada fila y agrupa por nombre de lista. Las filas inválidas se
// reportan como errores (con su número de fila) y no bloquean al resto.
export function groupRowsIntoPriceLists(rows: NormalizedRow[]): GroupResult {
  const errors: string[] = [];
  const groupsByName = new Map<string, ImportGroup>();

  rows.forEach((row, index) => {
    const rowNumber = index + 2; // fila 1 = encabezado, planillas son 1-indexadas
    const name = row.name?.trim();

    if (!name) {
      errors.push(`Fila ${rowNumber}: falta el nombre de la lista ("name"/"nombre").`);
      return;
    }
    if (!row.typology) {
      errors.push(`Fila ${rowNumber} (${name}): falta la tipología del lote.`);
      return;
    }

    const lotNumber = Number(row.lot);
    const area = Number(row.area);
    const cashPrice = Number(row.cashPrice);

    if ([lotNumber, area, cashPrice].some((n) => Number.isNaN(n))) {
      errors.push(
        `Fila ${rowNumber} (${name}): "lote", "area" y "cashPrice" (precio contado) deben ser números.`,
      );
      return;
    }

    // "priceList" (precio lista) y "installmentPrice" (pie + cuotas) son
    // opcionales: una celda vacía o con "-" se interpreta como "sin dato"
    // (igual que en las listas publicadas a cliente, que solo traen
    // precio contado). Solo se reporta error si viene un valor no numérico
    // distinto de vacío/"-".
    const priceList = parseOptionalPrice(row.priceList);
    const installmentPrice = parseOptionalPrice(row.installmentPrice);
    const installmentPrice2 = parseOptionalPrice(row.installmentPrice2);

    if (priceList === "invalid" || installmentPrice  === "invalid" || installmentPrice2 === "invalid") {
      errors.push(
        `Fila ${rowNumber} (${name}): "priceList"/"installmentPrice"/"installmentPrice2" deben ser números, o dejarse vacíos/"-" si no aplican.`,
      );
      return;
    }

    const lot: LotPayload = {
      lot: lotNumber,
      typology: row.typology.trim(),
      area,
      ...(priceList !== undefined && { priceList }),
      ...(installmentPrice !== undefined && { installmentPrice }),
      ...(installmentPrice2 !== undefined && { installmentPrice2 }),
      cashPrice,
    };

    const key = name.toLowerCase();
    const existingGroup = groupsByName.get(key);

    if (existingGroup) {
      existingGroup.lots.push(lot);
    } else {
      groupsByName.set(key, {
        name,
        description: row.description?.trim() || undefined,
        has360Tour: row.has360Tour?.trim() || undefined,
        lots: [lot],
      });
    }
  });

  return { groups: Array.from(groupsByName.values()), errors };
}

// Interpreta una celda de precio opcional: vacía, "-" o ausente -> undefined
// (sin dato); un número válido -> ese número; cualquier otra cosa -> "invalid".
function parseOptionalPrice(value: string | undefined): number | undefined | "invalid" {
  const trimmed = value?.trim() ?? "";
  if (trimmed === "" || trimmed === "-") return undefined;

  const parsed = Number(trimmed);
  return Number.isNaN(parsed) ? "invalid" : parsed;
}

// Genera y descarga un .xlsx de ejemplo con los encabezados esperados, para
// que el usuario tenga una plantilla lista para completar.
export async function downloadImportTemplate() {
  const XLSX = await import("xlsx");

  const headers = [
    "name",
    "description",
    "has360Tour",
    "lot",
    "typology",
    "area",
    "priceList",
    "installmentPrice",
    "installmentPrice2",
    "cashPrice",
  ];
  const exampleRows = [
    [
      "Choroihue",
      "La combinación perfecta entre pradera y bosque.",
      "https://...",
      17,
      "Pradera - Bosque",
      5062,
      12500000,
      9500000,
      9500000,
      7500000,
    ],
    [
      "Fundo Bellavista",
      "Bosque y pradera con amplias superficies.",
      "https://...",
      99,
      "Postacion - Pozo",
      5000,
      26900000,
      20900000,
      20900000,
      18900000,
    ],
    [
      "Fundo Bellavista",
      "Bosque y pradera con amplias superficies.",
      "https://...",
      134,
      "Postacion - Pozo",
      5000,
      21900000,
      16900000,
      14900000,
    ],
    [
      "Quemchi Aucar",
      "Bosque, pradera y orilla de río.",
      "https://...",
      254,
      "Bosque - Orilla de Río",
      5000,
      "", // priceList: opcional, se puede dejar vacío o poner "-"
      "", // installmentPrice: opcional, se puede dejar vacío o poner "-"
      "", // installmentPrice2: opcional, se puede dejar vacío o poner "-"
      18900000,
    ],
  ];

  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...exampleRows]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Listas");
  XLSX.writeFile(workbook, "plantilla-listas-precios.xlsx");
}
