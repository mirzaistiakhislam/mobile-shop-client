import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const ProductCategories = () => {

    const [productCategories, setProductCategories] = useState([]);
    // const products = useLoaderData();
    // console.log(products);

    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProductCategories(data)
            })
    }, [])

    return (
        <div className='my-16'>
            <h2 className='text-4xl mb-6'>Product Categories</h2>
            <div>
                {
                    productCategories.map(productCategory => <button className="btn btn-outline w-full" key={productCategory._id}><Link to={`/categoryproducts/${productCategory.category_name}`}>{productCategory.category_name}</Link></button>
                    )
                }
            </div>

        </div>
    );
};

export default ProductCategories;