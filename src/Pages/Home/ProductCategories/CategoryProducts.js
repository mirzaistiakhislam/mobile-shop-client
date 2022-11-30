import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import BookingModal from './BookingModal';
import CategoryProduct from './CategoryProduct';

const CategoryProducts = () => {
    const { user, logOut } = useContext(AuthContext);
    
    const products = useLoaderData();   
    let categoryName = '';
    if (products?.categoryName) {
        categoryName = products?.categoryName;
    }
    else {
        categoryName = products[0]?.categoryName;
    }
    const [bookingProduct, setBookingProduct] = useState(null);

    return (
        <div className='w-[98%] mx-auto py-6'>
            <h3 className='text-3xl mb-6 py-6 font-bold text-center'>Products by <span className='text-primary'>{categoryName}</span> </h3>
            {
                    Array.isArray(products) === false  && 
                    <p className='text-center text-2xl font-semibold'>No Products found</p>

                }
            <div className='grid grdi-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    products?.length > 0 && products?.map(product => <CategoryProduct
                        key={product._id}
                        product={product}
                        setBookingProduct={setBookingProduct}
                    ></CategoryProduct>) 
                    
                        
                }
                
                {
                    bookingProduct &&
                    <BookingModal
                        bookingProduct={bookingProduct}
                        setBookingProduct={setBookingProduct}
                    ></BookingModal>
                }
            </div>
        </div>

    );
};

export default CategoryProducts;