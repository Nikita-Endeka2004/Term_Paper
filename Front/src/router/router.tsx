import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";
import Home, { HomeLoader } from "../pages/Home";
import Transactions, { transactionAction, transactionLoader } from "../pages/Transactions";
import Categories, { categoriesAction, categoryLoader } from "../pages/Categories";
import Auth from "../pages/Auth";
import { ProtectedRoute } from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        loader: HomeLoader,
        element: <ProtectedRoute><Home /></ProtectedRoute>,
      },
      {
        path: 'transactions',
        action: transactionAction,
        loader: transactionLoader,
        element: <ProtectedRoute><Transactions/></ProtectedRoute>
      },
      {
        path: 'categories',
        action: categoriesAction,
        loader: categoryLoader,
        element: <ProtectedRoute><Categories/></ProtectedRoute>
      },
      {
        path: 'auth',
        element: <Auth/>
      }
    ]
  }
])