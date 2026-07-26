import { Outlet } from "react-router";

export const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-[1400px] px-6 py-4">
          <h1 className="text-xl font-bold">Panel de administración</h1>
          <p className="text-sm text-muted-foreground">Gestión de listas de precios</p>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};
