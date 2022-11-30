import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Blogs from "../../Pages/Blogs/Blogs";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import AllBuyer from "../../Pages/Dashboard/AllBuyer/AllBuyer";
import AllSeller from "../../Pages/Dashboard/AllSeller.js/AllSeller";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import MyProduct from "../../Pages/Dashboard/MyProduct/MyProduct";
import ReportedItems from "../../Pages/Dashboard/ReportedItems/ReportedItems";
import Error from "../../Pages/Error/Error";
import Home from "../../Pages/Home/Home/Home";
import CategoryProducts from "../../Pages/Home/ProductCategories/CategoryProducts";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/category/:id',
                loader: ({ params }) => fetch(`https://phone-buy-and-sell-server.vercel.app/categoryproducts/${params.id}`, {
                    headers: {
                        'content-type': 'application/json',
                        authorization: `barer ${localStorage.getItem('accessToken')}`
                    },
                }),
                element: <PrivateRoute><CategoryProducts></CategoryProducts></PrivateRoute>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/myorders',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard/allseller',
                element: <AllSeller></AllSeller>
            },
            {
                path: '/dashboard/allbuyer',
                element: <AllBuyer></AllBuyer>
            },
            {
                path: '/dashboard/myproducts',
                element: <MyProduct></MyProduct>
            },
            {
                path: '/dashboard/addproduct',
                element: <AddProduct></AddProduct>
            },
            {
                path: '/dashboard/reporteditems',
                element: <ReportedItems></ReportedItems>
            },
        ]
    }, {
        path: '*',
        element: <Error></Error>
    }
])

export default router;