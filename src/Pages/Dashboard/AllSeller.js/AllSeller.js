import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import useUserType from '../../../Hooks/useUserType';


const AllSeller = () => {


    const { user } = useContext(AuthContext);
    const [userType, isLoading] = useUserType(user?.email);
    const navigate = useNavigate();

    const url = `https://phone-buy-and-sell-server.vercel.app/allsellers`;

    const { data: sellers = null, refetch } = useQuery({
        queryKey: ['allsellers'],
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
    const verifySeller = (id) => {
        const data = {
            id: id
        }
        fetch(`https://phone-buy-and-sell-server.vercel.app/makeadverify`, {
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
                    toast.success('Verified Successfully!')
                }
                refetch()
            })

    }
    const deleteSeller = (id) => {
        const data = {
            id: id
        }

        fetch(`https://phone-buy-and-sell-server.vercel.app/deleteseller`, {
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
            <h3 className='text-3xl mb-6 py-6 font-bold text-center'>All Seller</h3>
            {
                sellers && sellers?.length > 0 ? <div className="overflow-x-auto">
                    <table className="table w-full">

                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <td>Type</td>
                                <th>Verify</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sellers?.map((seller, i) =>
                                    <tr key={seller._id}>
                                        <th>{i + 1}</th>
                                        <td>{seller.name}</td>
                                        <td>{seller.email}</td>
                                        <td>{seller.type}</td>
                                        <td>{
                                            seller.isVerified == 'No' ? <button onClick={() => verifySeller(seller._id)} className='btn btn-success btn-sm'>Make Verified</button> : <p className='text-green-500 font-semibold'>Verified</p>
                                        }</td>
                                        <td><button onClick={() => deleteSeller(seller._id)} className='btn btn-warning btn-sm '>Delete</button></td>
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

export default AllSeller;