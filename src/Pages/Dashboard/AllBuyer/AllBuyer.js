import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import useUserType from '../../../Hooks/useUserType';


const AllBuyer = () => {


    const { user } = useContext(AuthContext);
    const [userType, isLoading] = useUserType(user?.email);
    const navigate = useNavigate();

    const url = `https://phone-buy-and-sell-server.vercel.app/allbuyers`;

    const { data: buyers = null, refetch } = useQuery({
        queryKey: ['allbuyers'],
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
    if (userType !== 'Admin') {
        return navigate('/dashboard');
    }
    const deleteBuyer = (id) => {
        const data = {
            id: id
        }

        fetch(`http://localhost:5000/deletebuyer`, {
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
    return (
        <div className='w-[98%] mx-auto'>
            <h3 className='text-3xl mb-6 py-6 font-bold text-center'>All Buyers</h3>
            {
                buyers && buyers?.length > 0 ? <div className="overflow-x-auto">
                    <table className="table w-full">

                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <td>Type</td>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                buyers?.map((buyer, i) =>
                                    <tr key={buyer._id}>
                                        <th>{i + 1}</th>
                                        <td>{buyer.name}</td>
                                        <td>{buyer.email}</td>
                                        <td>{buyer.type}</td>

                                        <td><button onClick={() => deleteBuyer(buyer._id)} className='btn btn-warning btn-sm '>Delete</button></td>
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

export default AllBuyer;