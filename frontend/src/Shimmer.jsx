
import React from 'react';

const Shimmer = () => {
    return (
        <div className="bg-[#F8F8FF] w-1/4  rounded-xl border-4 border-[#3109BA] m-2 animate-pulse">
            <div className='w-60 m-auto p-1 h-3/4'>
                <div className="h-60 bg-gray-300  rounded-xl"></div>
            </div>
            {/* <div className='h-6 bg-[#696DD2] rounded-lg m-3 mb-1'></div> */}
            <div className='h-6 bg-[#696DD2] rounded-lg m-2'></div>
            <div className='h-10 bg-gray-300 rounded m-2'></div>
        </div>
    );
};

export default Shimmer;
