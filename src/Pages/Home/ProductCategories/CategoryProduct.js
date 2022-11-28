import React from 'react';

const CategoryProduct = ({ product }) => {
    return (
        <div>

            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure><img src={product.product_image} alt="Album" className='w-96' /></figure>
                <div className="card-body">
                    <h2 className="card-title">{product.product_name}</h2>
                    <h2 className="card-title">Location: {product.location}</h2>
                    <h2 className="card-title">Resale Price: {product.resale_price}</h2>
                    <h2 className="card-title">Original Price: {product.original_price}</h2>
                    <h2 className="card-title">Purchase Year: {product.purchase_year}</h2>
                    <h2 className="card-title">Posted Time: {product.posted_date}</h2>
                    <h2 className="card-title">Reseller Name: {product.reseller_name}</h2>
                    <p>{product.description}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Listen</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryProduct;