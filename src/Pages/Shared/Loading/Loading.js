import React from 'react';

const Loading = () => {
    return (
        <div className='flex items-center justify-center'>
            <progress className="progress w-56  mt-40"></progress>
        </div>
    );
};

export default Loading;