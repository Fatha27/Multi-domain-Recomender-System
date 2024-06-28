import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { IoReturnDownBack, IoBookSharp } from "react-icons/io5";
import Movies from "../Assets/movies.jpg";
import { useParams } from 'react-router-dom';
import { RiMovie2Line } from "react-icons/ri";
function MovieComponent({ backClick, ...props }) {

    const { id } = useParams()


    function onBackClick() {
        backClick()
    }
    console.log(props.recommendations)
    return (
        <>
            {/* { props?.recommendations.map((recommendation, index) => ( */}
            {/* <div className='bg-neutral-800 w-1/4 rounded-xl m-2 place-content-start'  >
                <div className=' text-[20px] p-2 font-semibold text-white bg-zinc-600 m-2 rounded-xl'>
                    <div className='p-1 flex place-content-between'> <p>{props.recommendations?.Title}</p>
                        <IoReturnDownBack className='w-[25px] h-7 hover:text-black' onClick={onBackClick} />
                    </div>
                    <div className='flex text-[14px] place-content-evenly space-x-2'>
                        <div className='bg-zinc-900 p-1 rounded-md text-[12px]'>EN</div>
                        <div className='flex place-items-center'> <FaStar />{props?.recommendations['Vote Average'] || props?.recommendations?.Rating}</div>
                        <div className='flex place-items-center'><FaCalendar />{props?.recommendations['Release Date']}</div>
                        <div className='flex place-items-center'> {props.info?.duration === "min" ? <IoIosTime /> : <IoBookSharp />} {props.recommendations?.Runtime || props.recommendations?.Pages} {props.info?.duration}</div>
                    </div>
                </div>
                <div className=' rounded-lg m-2  place-content-evenly text-gray-400 font-normal text-[15px] ml-4'>
                    <div>Cast: {props?.recommendations?.Cast || props?.recommendations?.Author}</div>
                    <div>Genre: {props?.recommendations?.Genres}</div>
                    {/* <div>Scores: 9.03 by 1800 views</div> */}
            {/* </div> */}
            {/* <div className='m-2 mt-4 text-[12px] text-zinc-300 font-normal p-1 ml-3 */}

            {/* '> */}
            {/* {props?.recommendations?.Overview} */}
            {/* </div> */}
            {/* </div> */}
            {/* ))} */}

            {/* Testing */}

            <div className='bg-[#F8F8FF] border-4 border-[#3109BA] flex flex-col  md:flex-row  md:max-w-5/6 rounded-xl items-center md:items-start '  >
                <div className='m-4  w-1/3 '>
                    <img src={props.recommendations?.Image ? props.recommendations?.Image : Movies} alt="" className=' rounded-lg ' />
                </div>
                <div className=' md:w-2/3 '>
                    <div className='text-[20px] md:text-[30px] p-2 font-semibold text-white bg-[#674CC4] m-2 rounded-xl'>
                        <div className='p-1 flex place-content-between font-bold'> <p>{props?.recommendations?.Series ? props?.recommendations?.Series : props.recommendations?.Title}</p>
                            <IoReturnDownBack className='w-[35px] h-7 hover:text-red-600' onClick={onBackClick} />
                        </div>
                        <div className='flex text-[12px] md:text-[14px] place-content-evenly'>
                            <div className='bg-zinc-900 p-1 rounded-md text-[12px]'>EN</div>
                            <div className='flex place-items-center gap-1'> <FaStar />{props?.recommendations['Vote Average'] || props?.recommendations?.Rating}</div>
                            {id !== "web-series" && <div className='flex place-items-center gap-1'><FaCalendar />{props?.recommendations['Release Date']}</div>
                            }
                            <div className='flex place-items-center gap-1'> { props.info?.duration==="/episode" ? <RiMovie2Line />: ( props.info?.duration === "min" ? <IoIosTime /> : <IoBookSharp />)} { props?.recommendations?.Duration ? props?.recommendations?.Duration + " min" : props.recommendations?.Runtime || props.recommendations?.Pages} {props.info?.duration}</div>
                        </div>
                    </div>
                    <div className=' rounded-lg m-2  place-content-evenly  font-medium text-[12px] md:text-[15px] ml-4 '>
                        <div>Cast : {props?.recommendations?.Cast || props?.recommendations?.Author}</div>
                        <div>Genre : {props?.recommendations?.Genres ? props?.recommendations?.Genres : props?.recommendations?.Genre}</div>
                        {/* <div>Scores: 9.03 by 1800 views</div> */}
                    </div>
                    <div className='m-2 mt-4 text-[12px] md:text-[15px]  font-semibold p-1 ml-3

'>
                        {props?.recommendations?.Overview ? props?.recommendations?.Overview : props?.recommendations?.Description}
                    </div>
                </div>
            </div>




        </>
    )
}



export default MovieComponent