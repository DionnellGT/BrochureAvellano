import { createBrowserRouter, Navigate, RouterProvider } from "react-router"
import { BrochureLayout } from "../layout/BrochureLayout"
import { ListaCliente } from "../pages/ListaCliente"
import { ListaVendedores } from "../pages/ListaVendedores"
import { AdminLayout } from "../admin/layout/AdminLayout"
import { DashboardPage } from "../admin/pages/DashboardPage"


const appRouter = createBrowserRouter([
    //Public routes
    {
        path: '/',
        element: <BrochureLayout/>,
        children: [
            {
                index: true,
                element: <ListaCliente/>
            },
            {
                path: "lista-vendedores",
                element: <ListaVendedores />
            }
        ]
    },

    //Admin Routes
    {
        path: '/admin',
        element: 
                    <AdminLayout/>,
        children: [
            {
                index: true,
                element: <DashboardPage/>
            },
            
        ]
    },


    {
        path: '*',
        element: <Navigate to='/' />
    },
])

export function AppRouter() {
  return <RouterProvider router={appRouter} />
}