import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRouter } from "./app.router";
import { useAuthStore } from "@/brochure/auth/store/useAuthStore";

const queryClient = new QueryClient();

export const BrochureApp = () => {
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  // Se valida el token guardado (si hay) una sola vez al montar la app,
  // antes de que las rutas protegidas decidan a dónde mandar al usuario.
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
};
