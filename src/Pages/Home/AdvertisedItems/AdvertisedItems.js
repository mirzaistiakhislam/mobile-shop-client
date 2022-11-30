import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AdvertisedItems = () => {

    const url = `http://localhost:5000/advertisedItems`;

    const { data: advertisedItems = [] } = useQuery({
        queryKey: ['advertisedItems'],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data;

        }
    })
    return (
        <div className='w-[98%] mx-auto'>
            <h3 className='text-3xl mb-6 py-6 font-bold text-center'>Advertise Items</h3>
            {
                advertisedItems && advertisedItems?.length > 0 ?

                    <div className='grid grdi-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {
                            advertisedItems.map(item =>
                                <div >
                                    <div className="card  shadow-xl flex flex-col gap-4">
                                        <figure><img src={item.image} alt="Album" className=' rounded border-2 border-rose-500' /></figure>
                                        <div className="card-body">
                                            <h2 className='text-xl'><span className='text-xl font-bold'>Author Name:</span> {item.authorName}</h2>
                                            <h2 className='text-xl'><span className='text-xl font-bold'>Product Name:</span> {item.productName}</h2>
                                            <h2 className='text-xl'><span className='text-xl font-bold'>Location:</span> {item.location}</h2>
                                            <h2 className='text-xl'><span className='text-xl font-bold'>Resale Price:</span> {item.resalePrice}</h2>
                                            <h2 className='text-xl'><span className='text-xl font-bold'>Original Price:</span> {item.originalPrice}</h2>
                                            <h2 className='text-xl'><span className='text-xl font-bold'>Purchase Year:</span> {item.purchaseYear}</h2>
                                            <h2 className='text-xl'><span className='text-xl font-bold'>Used of Years:</span> {item.usedYear}</h2>
                                            <h2 className='text-xl'><span className='text-xl font-bold'>Posted Time:</span> {item.publishedDate}</h2>

                                            <p className='text-xl'><span className='text-xl font-bold'>Description:</span> {item.description}</p>

                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                    :
                    <p className='text-center text-2xl font-semibold'>No Products found</p>

            }

        </div>
    );
};

export default AdvertisedItems;