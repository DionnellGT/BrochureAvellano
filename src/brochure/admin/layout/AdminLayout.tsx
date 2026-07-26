import { Outlet, useNavigate } from "react-router";
import { LogOut } from "lucide-react";

import { useAuthStore } from "@/brochure/auth/store/useAuthStore";
import { Button } from "@/components/ui/button";

export const AdminLayout = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/auth/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-4">
          <div>
            <h1 className="text-xl font-bold">Panel de administración</h1>
            <p className="text-sm text-muted-foreground">Gestión de listas de precios</p>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <span className="hidden text-sm text-muted-foreground sm:inline">
                {user.fullName}
              </span>
            )}
            <Button variant="outline" size="sm" className="gap-1.5" onClick={handleLogout}>
              <LogOut className="size-4" /> Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};
