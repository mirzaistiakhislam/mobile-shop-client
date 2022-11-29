import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import useUserType from '../../../Hooks/useUserType';

const CategoryProduct = ({ product, setBookingProduct }) => {

    const { user } = useContext(AuthContext);
    const [userType] = useUserType(user?.email);
    const reportItem = (product) => {
    
}

    const { _id, image, location, resalePrice, originalPrice, publishedDate, description, authorName, purchaseYear, usedYear } = product;
    return (
        <div >
            <div className="card  shadow-xl flex flex-col gap-4">
                <figure><img src={image} alt="Album" className=' rounded border-2 border-rose-500' /></figure>
                <div className="card-body">
                    <h2 className='text-xl'><span className='text-xl font-bold'>Author Name:</span> {authorName}</h2>
                    <h2 className='text-xl'><span className='text-xl font-bold'>Product Name:</span> {product.productName}</h2>
                    <h2 className='text-xl'><span className='text-xl font-bold'>Location:</span> {location}</h2>
                    <h2 className='text-xl'><span className='text-xl font-bold'>Resale Price:</span> {resalePrice}</h2>
                    <h2 className='text-xl'><span className='text-xl font-bold'>Original Price:</span> {originalPrice}</h2>
                    <h2 className='text-xl'><span className='text-xl font-bold'>Purchase Year:</span> {purchaseYear}</h2>
                    <h2 className='text-xl'><span className='text-xl font-bold'>Used of Years:</span> {usedYear}</h2>
                    <h2 className='text-xl'><span className='text-xl font-bold'>Posted Time:</span> {publishedDate}</h2>

                    <p className='text-xl'><span className='text-xl font-bold'>Description:</span> {product.description}</p>
                    {
                        userType === 'Buyer' && <div className="card-actions grid grid-cols-2 mt-3">
                            <label
                                htmlFor="booking-modal"
                                className="btn btn-primary"
                                onClick={() => setBookingProduct(product)}
                            >Book Now</label>
                            <button
                                className="btn btn-warning"
                                onClick={() => reportItem(product)}
                            >Report This Item</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default CategoryProduct;