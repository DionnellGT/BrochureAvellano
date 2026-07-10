import { createBrowserRouter, Navigate, RouterProvider } from "react-router"
import { BrochureLayout } from "../layout/BrochureLayout"
import { ListaCliente } from "../pages/ListaCliente"
import { ListaVendedores } from "../pages/ListaVendedores"


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

    {
        path: '*',
        element: <Navigate to='/' />
    },
])

export function AppRouter() {
  return <RouterProvider router={appRouter} />
}