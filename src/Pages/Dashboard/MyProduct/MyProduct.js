import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyProduct = () => {
    const { user } = useContext(AuthContext);

    const url = `http://localhost:5000/myproducts/${user?.email}`;

    const { data: myproducts = null, refetch } = useQuery({
        queryKey: ['myproducts', user?.email],
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
    const deleteProduct = (id) => {
        const data = {
            id: id
        }

        fetch(`http://localhost:5000/deleteproduct`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `barer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Delete Successfully!')
                }

                refetch()
            })

    }

    const advertiseProduct = (id) => {
        const data = {
            id: id
        }

        fetch(`http://localhost:5000/makeadvertise`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `barer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Advertise Successfully!')
                }
                refetch()
            })

    }

    return (
        <div className='w-[98%] mx-auto'>
            <h3 className='text-3xl mb-6 py-6 font-bold text-center'>My Products</h3>
            {
                myproducts && myproducts?.length > 0 ? <div className="overflow-x-auto">
                    <table className="table w-full">

                        <thead>
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <td>Sales Status</td>
                                <th>Advertise</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myproducts?.map((product, i) =>
                                    <tr key={product._id}>
                                        <th>{i + 1}</th>
                                        <td>
                                            <img src={product.image} className='w-16 h-16' alt="" />
                                        </td>
                                        <td>{product.productName}</td>
                                        <td>{product.resalePrice}</td>
                                        <td>{product.salesStatus}</td>
                                        <td>{
                                            product.advertise == 'No' ? <button onClick={() => advertiseProduct(product._id)} className='btn btn-success btn-sm'>Make Advertise</button> : <p className='text-green-500 font-semibold'>Advertised</p>
                                        }</td>
                                        <td><button onClick={() => deleteProduct(product._id)} className='btn btn-warning btn-sm '>Delete</button></td>
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

export default MyProduct;