import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import useUserType from '../../../Hooks/useUserType';

const MyOrders = () => {

    const { user } = useContext(AuthContext);
    const [userType, isLoading] = useUserType(user?.email);
    const navigate = useNavigate()

    const url = `https://phone-buy-and-sell-server.vercel.app/orders?email=${user?.email}`;

    const { data: orders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `barer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;

        }
    })
    if (userType !== 'Buyer') {
        return navigate('/dashboard');
    }

    return (
        <div className='w-[98%] mx-auto'>
            <h3 className='text-3xl mb-6 py-6 font-bold text-center'>My Orders</h3>
            {
                orders && orders?.length > 0 ? <div className="overflow-x-auto">
                    <table className="table w-full">

                        <thead>
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <td>Sales Status</td>
                                <th>Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders?.map((order, i) =>
                                    <tr key={order._id}>
                                        <th>{i + 1}</th>
                                        <td>
                                            <img src={order.image} className='w-16 h-16' alt="" />
                                        </td>
                                        <td>{order.productName}</td>
                                        <td>{order.resalePrice}</td>
                                        <td>{order.salesStatus}</td>
                                        {
                                            order?.salesStatus === 'Available' && order?.payment === 'No' && <td><button className='btn btn-warning btn-sm '>Pay</button></td>

                                        }
                                        {
                                            order?.payment === 'Yes' && <td><button className='text-green-500 text-base'>Payment done</button></td>

                                        }
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
                    :
                    <p className='text-center text-2xl font-semibold'>No Products found</p>
            }
        </div>
    );
};

export default MyOrders;