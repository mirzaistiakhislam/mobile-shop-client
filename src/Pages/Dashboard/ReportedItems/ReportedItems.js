import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';


const ReportedItems = () => {

    const url = `http://localhost:5000/reporteditems`;

    const { data: reportedItems = null, refetch } = useQuery({
        queryKey: ['reportedItems'],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }
    })

    const deleteProduct = (id) => {
        const data = {
            id: id
        }

        fetch(`http://localhost:5000/deletereporteditem`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
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
            <h3 className='text-3xl mb-6 py-6 font-bold text-center'>All Reported Items</h3>
            {
                reportedItems && reportedItems?.length > 0 ? <div className="overflow-x-auto">
                    <table className="table w-full">

                        <thead>
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Product Name</th>
                                <td>Reporter Name</td>
                                <th>Reporter Email</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                reportedItems?.map((item, i) =>
                                    <tr key={item._id}>
                                        <th>{i + 1}</th>
                                        <td>
                                            <img src={item.image} className='w-16 h-16' alt="" />
                                        </td>
                                        <td>{item.productName}</td>
                                        <td>{item.reporterName}</td>
                                        <td>{item.reporterEmail}</td>
                                        <td><button onClick={() => deleteProduct(item.productId)} className='btn btn-warning btn-sm '>Delete</button></td>
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

export default ReportedItems;