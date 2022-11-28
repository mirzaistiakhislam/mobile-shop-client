import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const BookingModal = ({ service, setService }) => {

    const { product_name, resale_price } = service;

    const { user } = useContext(AuthContext);
    // console.log(user);

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const location = form.location.value;

        const booking = {
            product_name: product_name,
            buyer_name: name,
            resale_price: resale_price,
            email,
            phone,
            location
        }

        console.log(booking);
        // setService(null);
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setService(null);
                    toast.success('booking confirmed');
                }
            })

    }
    return (

        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{product_name}</h3>

                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input name='name' type="text" defaultValue={user?.displayName
                        } readOnly disabled placeholder="Enter Your Name" className="input w-full input-bordered" />
                        <input name='email' type="text" defaultValue={user?.email} readOnly disabled placeholder="Enter Your Email" className="input w-full input-bordered" />
                        <input type="text" value={resale_price} disabled className="input w-full input-bordered" />

                        <input name='phone' type="text" placeholder="Enter your phone number" className="input w-full input-bordered" />
                        <input name='location' type="text" placeholder="Enter your meeting location" className="input w-full input-bordered" />
                        <br />
                        <input className='w-full btn btn-active' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;