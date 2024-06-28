import React from 'react'
import { FaStar } from "react-icons/fa";
import Udemy from "../Assets/udemy.png"
import Coursera from "../Assets/coursera.png"
function CourseComponent(props) {
    console.log(props.recommendations)
    return (
        <>
            {props?.recommendations.map((course, index)=> (
                <div className='bg-[#F8F8FF] w-full md:w-1/2 lg:w-1/3 rounded-[35px] border-4 border-[#595FF0] m-1  md:m-4 lg-m-4' key={index}>
                    <img src={course?.Skills ? Coursera : Udemy} alt="" className='p-2 w-full rounded-[20px] border-1 border-[#595FF0]' />
                    <div className='m-4 pl-3 pr-3'>
                        <div className='flex place-content-between font-bold text-[22px]' >
                            <div>{course?.Course}</div>
                            <div className='flex gap-1'><FaStar className='' /> {course?.Rating}</div>
                        </div>
                        <div className='text-[18px] font-semibold text-[#3109BA]'>By: {course?.Partner ? course.Partner : course?.Instructor}</div>
                        <div className='font-medium text-[14px] mt-2'>{course?.Skills ? "Skills : " + course.Skills : course?.Description}</div>
                    </div>
                    <div className=' pb-1 p-3 font-semibold text-[15px] text-[#EE3F4A] text-center'> {course?.Level} course with completion time of around {course?.Duration}.</div>
                </div>
            ))}

        </>
    )
}

export default CourseComponent