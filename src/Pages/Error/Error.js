import React from 'react';
import { Link } from 'react-router-dom';
import error from '../../assets/error.jpg'
const Error = () => {
    return (
        <div className='w-[80%] mx-auto mt-10'>
            <img src={error} alt="" />
            <div className='flex items-center justify-center mt-10'>
                <Link to='/' className='btn '>Go to home</Link>
            </div>
        </div>
    );
};

export default Error;