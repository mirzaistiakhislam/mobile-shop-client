import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import CategoryProducts from "../../Pages/Home/ProductCategories/CategoryProducts";

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
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/categoryproducts/:name',
                element: <CategoryProducts></CategoryProducts>,
                loader: ({ params }) => fetch(`http://localhost:5000/categoryproducts/${params.name}`)
            }
        ]
    }
])

export default router;