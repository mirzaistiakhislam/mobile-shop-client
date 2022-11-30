import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const ProductCategories = () => {

    // const [productCategories, setProductCategories] = useState([]);
    // const products = useLoaderData();
    // console.log(products);

    const [productCategories, setProductCategories] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:5000/categories').then(res => {
            setProductCategories(res.data);
        });
    })



    // useEffect(() => {
    //     fetch('http://localhost:5000/categories')
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             setProductCategories(data)
    //         })
    // }, [])

    return (
        <div className='my-16 w-[95%] mx-auto'>
            <h2 className='text-4xl font-semibold mb-6'>Product Categories</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {
                    productCategories?.map(productCategory =>
                        <Link key={productCategory._id}
                            to={`/category/${productCategory._id}`}>
                            <button className="btn btn-outline w-full" >{productCategory.category_name}</button>
                        </Link>

                    )
                }
            </div>

        </div>
    );
};

export default ProductCategories;