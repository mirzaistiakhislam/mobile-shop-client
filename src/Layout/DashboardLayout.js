import React, { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useUserType from '../Hooks/useUserType';
import Loading from '../Pages/Shared/Loading/Loading';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {

    const { user } = useContext(AuthContext);
    const [userType, isLoading] = useUserType(user?.email);
    const navigate = useNavigate()

    if (isLoading === true) {
        return <Loading></Loading>
    } else {
        // if (userType == 'Admin') {
        //     navigate('/dashboard/allsellers')
        // }
        // if (userType == 'Seller') {
        //     navigate('/dashboard/addproduct')
        // }
        // if (userType == 'Buyer') {
        //     navigate('/dashboard/myorders')
        // }
        // else {
        // navigate('/login')
        // }
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content  md:ml-3">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-black text-white">
                        {
                            userType === 'Admin' && <>
                                <li><Link to='/dashboard/allseller'>ALL Seller</Link></li>
                                <li><Link to='/dashboard/allbuyer'>ALL Buyer</Link></li>
                                <li><Link to='/dashboard/reporteditems'>Reported items</Link></li>
                            </>
                        }
                        {
                            userType === 'Seller' && <>
                                <li><Link to='/dashboard/addproduct'>Add Product</Link></li>
                                <li><Link to='/dashboard/myproducts'>My Products</Link></li>
                            </>
                        }
                        {
                            userType === 'Buyer' && <>
                                <li><Link to='/dashboard/myorders'>My Orders</Link></li>
                            </>
                        }

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;