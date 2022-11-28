import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CategoryProduct from './CategoryProduct';

const CategoryProducts = () => {

    const products = useLoaderData();
    console.log(products);

    return (
        <div>
            {
                products.map(product => <CategoryProduct
                    key={product._id}
                    product={product}
                ></CategoryProduct>)
            }
        </div>
    );
};

export default CategoryProducts;