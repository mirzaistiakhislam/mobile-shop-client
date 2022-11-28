import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from './BookingModal';
import CategoryProduct from './CategoryProduct';

const CategoryProducts = () => {

    const products = useLoaderData();
    console.log(products);


    const [service, setService] = useState(null);

    return (
        <div>
            {
                products.map(product => <CategoryProduct
                    key={product._id}
                    product={product}
                    setService={setService}
                ></CategoryProduct>)
            }
            {
                service &&
                <BookingModal
                    service={service}
                    setService={setService}
                ></BookingModal>
            }
        </div>
    );
};

export default CategoryProducts;