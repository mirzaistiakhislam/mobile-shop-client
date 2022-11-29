import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyOrders = () => {

    const { user } = useContext(AuthContext);

    const url = `http://localhost:5000/orders?email=${user?.email}`;

    const { data: orders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data;

        }
    })

    return (
        <div>
            <h3 className='text-3xl mb-6 py-6 font-bold'>My Orders</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <td>Sale Status</td>
                            <th>Tansaction-Id</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((booking, i) =>
                                <tr key={booking._id}>
                                    <th>{i + 1}</th>
                                    <td>{booking.buyer_name}</td>
                                    <td>{booking.product_name}</td>
                                    <td>{booking.resale_price}</td>
                                    <td>{booking.location}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyOrders;