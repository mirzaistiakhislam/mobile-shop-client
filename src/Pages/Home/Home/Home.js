import React, { useContext } from 'react';
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
        </div>
    );
};

export default Home;