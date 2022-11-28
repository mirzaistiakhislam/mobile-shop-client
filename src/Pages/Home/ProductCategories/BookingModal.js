import React from 'react';

const BookingModal = ({ service, setService }) => {

    const { product_name, resale_price } = service;

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
        setService(null);
    }
    return (

        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{product_name}</h3>

                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input name='name' type="text" placeholder="Enter Your Name" className="input w-full input-bordered" />
                        <input name='email' type="text" placeholder="Enter Your Email" className="input w-full input-bordered" />
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