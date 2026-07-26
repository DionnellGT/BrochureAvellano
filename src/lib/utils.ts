import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value)
}

// Extrae un mensaje legible de un error de Axios (respetando el formato
// estándar de error de Nest: { statusCode, message, error }, donde
// "message" puede venir como string o como array de strings si es un
// error de validación). Si no hay respuesta del servidor (caída de red,
// CORS, timeout) o no se reconoce el formato, devuelve `fallback`.
export function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 413) {
      return "El archivo es demasiado grande. Reduce su tamaño e intenta de nuevo.";
    }

    const data = error.response?.data as { message?: string | string[] } | undefined;
    if (data?.message) {
      return Array.isArray(data.message) ? data.message.join(" ") : data.message;
    }

    if (!error.response) {
      return "No se pudo conectar con el servidor. Verifica tu conexión e intenta de nuevo.";
    }
  }

  return fallback;
}
