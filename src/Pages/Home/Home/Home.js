import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import useUserType from '../../../Hooks/useUserType';
import AdvertisedItems from '../AdvertisedItems/AdvertisedItems';
import Banner from '../Banner/Banner';
import ProductCategories from '../ProductCategories/ProductCategories';

const Home = () => {
    const { user } = useContext(AuthContext);
    const data = useUserType(user?.email)
    return (
        <div>

            <Banner></Banner>
            <ProductCategories></ProductCategories>
            <AdvertisedItems></AdvertisedItems>
            <div className="hero px-4 py-10 bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse gap-8">
                    <img src={`https://img.freepik.com/free-vector/online-shop-cartoon-poster-hand-give-shopping-bag_107791-7042.jpg?w=2000`} className="rounded-lg shadow-2xl lg:w-[50%] h-full" />
                    <div>
                        <h1 className="text-5xl font-bold">Sell and Buy Mobile.</h1>
                        <p className="py-6">Sell your mobile phone for cash!
                            Get the most cash for your phone.Mobile phone recycling refers to the process to trading in your phone, so it can either be recycled for parts or refurbished for resale.
                            Even older phones contain valuable parts and materials that can be reused. Recycling companies will extract these often-toxic materials in a way that's safe and environmentally friendly.
                            Meanwhile, by trading in your phone to be recycled you'll get some cash to spend while doing your bit for the environment.</p>
                        <Link to='/' className="btn btn-primary">Get Started</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;