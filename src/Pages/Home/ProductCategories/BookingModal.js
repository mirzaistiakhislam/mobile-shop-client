import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const BookingModal = ({ bookingProduct, setBookingProduct }) => {

    const { productName, resalePrice, _id, image } = bookingProduct;
    const { user } = useContext(AuthContext);

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const location = form.location.value;

        const booking = {
            productName: productName,
            buyerName: name,
            resalePrice: resalePrice,
            productId: _id,
            payment: 'No',
            image: image,
            email,
            phone,
            location,

        }
        console.log(booking)
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setBookingProduct(null);
                    toast.success('Booking confirmed');
                }
                if (data.status) {
                    setBookingProduct(null);
                    toast.error(data.status)
                }
            })

    }
    return (

        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{productName}</h3>

                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input name='name' type="text" defaultValue={user?.displayName
                        } readOnly disabled placeholder="Enter Your Name" className="input w-full input-bordered" />
                        <input name='email' type="text" defaultValue={user?.email} readOnly disabled placeholder="Enter Your Email" className="input w-full input-bordered" />
                        <input type="text" value={productName} disabled className="input w-full input-bordered" />
                        <input type="text" value={resalePrice} disabled className="input w-full input-bordered" />

                        <input name='phone' type="text" placeholder="Enter your phone number" className="input w-full input-bordered" required />
                        <input name='location' type="text" placeholder="Enter your meeting location" className="input w-full input-bordered" required />
                        <br />
                        <input className='w-full btn btn-active' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;