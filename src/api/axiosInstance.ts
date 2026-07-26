import axios from "axios";

// URL base de la Api principal (GlobalApi). Configurable vía variable de
// entorno `VITE_API_URL` (ej: https://api.rematedeterrenos.cl).
// El backend expone todas sus rutas bajo el prefijo global "/api".
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

// OJO: no se fija un "Content-Type" por defecto acá a propósito. Axios ya
// setea "application/json" automáticamente para bodies que son objetos
// planos, pero si se fuerza ese header en la instancia, se aplica a TODAS
// las requests de este cliente — incluidas las que suben archivos con
// `FormData` (ej. el PDF de brochure), rompiéndolas: con un Content-Type
// ya fijado a "application/json", ni el navegador ni Axios calculan el
// boundary de "multipart/form-data", así que el backend nunca recibe el
// archivo (llega como si no se hubiese adjuntado nada).
export const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
});

// Adjunta el token de sesión (JWT) a cada request, si existe. Sin esto,
// ningún endpoint protegido (`@Auth()`/`@Auth(admin)` en el backend, que
// incluye el check de sesión y todas las acciones del admin) funcionaría.
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Resuelve una ruta relativa de un archivo estático (ej. el PDF de brochure,
// "/uploads/brochures/elavellano-cliente.pdf") contra el host de la Api.
// A diferencia de las demás rutas, los assets estáticos NO llevan el
// prefijo "/api" (ver ServeStaticModule en el backend), por eso no se usa
// `apiClient` acá.
export function getAssetUrl(path: string): string {
  return `${API_URL}${path}`;
}
