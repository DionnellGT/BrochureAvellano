import { createBrowserRouter, Navigate, RouterProvider } from "react-router"
import { BrochureLayout } from "../layout/BrochureLayout"
import { ListaCliente } from "../pages/ListaCliente"
import { ListaVendedores } from "../pages/ListaVendedores"
import { AdminLayout } from "../admin/layout/AdminLayout"
import { DashboardPage } from "../admin/pages/DashboardPage"
import { LoginPage } from "../auth/pages/LoginPage"
import { AdminRoute, NotAuthenticatedRoute } from "@/components/routes/AuthenticatedRoute"
import { AuthLayout } from "../auth/layout/AuthLayout"


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
        element: <AdminRoute>
                    <AdminLayout/>
                </AdminRoute>,
        children: [
            {
                index: true,
                element: <DashboardPage/>
            },
            
        ]
    },

     //Auth Routes
    {
        path: '/auth',
        element: <NotAuthenticatedRoute>
                    <AuthLayout/>
                 </NotAuthenticatedRoute>,
        children: [
            {
                index: true,
                element: <Navigate to='/auth/login' />
            },
            {
                path: 'login',
                element: <LoginPage/>
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