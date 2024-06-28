import React, { useEffect, useState } from 'react'
import Movie from "./Assets/movie.png"
import { Link, useNavigate } from 'react-router-dom'
import restraunts from './Assets/restt.png'
import book from "./Assets/book.png"
import course from "./Assets/course.png"
import webseries from "./Assets/webseries.png"
import ChatComponent from './Components/ChatComponent'
import { BiSolidCameraMovie } from "react-icons/bi";
import { MdMenuBook } from "react-icons/md";
import { RiRestaurantFill } from "react-icons/ri";
import { FaComputer } from "react-icons/fa6";
import { BiMoviePlay } from "react-icons/bi";


function Recommenders() {
  const [activeTab, setActiveTab] = useState('model');
  const [user, setUser] = useState(null);

  const navigate=useNavigate()

  useEffect(() => {
    // Check if user data exists in local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  // console.log(user)
  function handleTabClick(tab) {
    setActiveTab(tab)
  }
  return (
    <div className='bg-[#16161D]'>


      <div className='flex m-auto w-60 h-20 rounded-[40px] text-black font-medium text-[20px] bg-[#F8F8FF] place-content-between mt-5 border-[5px]  border-[#2C0AA0]'>
        <div
          onClick={() => handleTabClick('model')}
          className={`cursor-pointer m-auto ml-2 p-2 rounded-3xl w-28 text-center ${activeTab === 'model' ? 'bg-[#674CC4] text-white' : ''
            } transition-all`}
        >
          Model
        </div>
        <div
          onClick={() => handleTabClick('prompt')}
          className={`cursor-pointer m-auto mr-2 p-2 rounded-3xl w-28 text-center ${activeTab === 'prompt' ? 'bg-[#674CC4] text-white' : ''
            } transition-all`}
        >
          Prompt
        </div>
      </div>
      {activeTab === 'model' &&
        <div className='flex mt-16 ml-1 mr-1 md:ml-14 md:mr-14  place-content-evenly flex-wrap gap-20'>
          {/* <Link to={`/recommenders/movies`} className=' m-16 w-[332px] h-[176px] border-4 rounded-lg border-gradient-to-left from-purple-600 to-red-500 '>
            <div className='flex h-[92px] w-[92px] mb-2 mt-4 m-auto justify-center'><img src={Movie} alt="" /></div>
            <div className='text-center font-bold text-[30px]'>MOVIES</div>
          </Link> */}
         
            <button class="reccard2 w-56 h-72 mb-8" onClick={()=>{navigate('/recommenders/movies')}}>
          <div class="reccard2-info place-content-center">
          <BiSolidCameraMovie color='white' className='m-auto' size={80}/>
            <p class="rectitle text-center mt-2  font-bold text-[30px] ">MOVIES</p>
          </div>
        </button>
        <button class="reccard2 w-56 h-72 mb-8" onClick={()=>{navigate('/recommenders/books')}}>
          <div class="reccard2-info place-content-center">
          <MdMenuBook color='white' className='m-auto' size={80}/>
            <p class="rectitle text-center mt-2  font-bold text-[30px] ">BOOKS</p>
          </div>
        </button>
        <button class="reccard2 w-56 h-72 mb-8" onClick={()=>{navigate('/recommenders/restaurants')}}>
          <div class="reccard2-info place-content-center">
          <RiRestaurantFill color='white' className='m-auto' size={80}/>
            <p class="rectitle text-center mt-2  font-bold text-[30px] ">RESTAURANTS</p>
          </div>
        </button>
        <button class="reccard2 w-56 h-72 mb-8" onClick={()=>{navigate('/recommenders/courses')}}>
          <div class="reccard2-info place-content-center">
          <FaComputer color='white' className='m-auto' size={80}/>
            <p class="rectitle text-center mt-2  font-bold text-[30px] ">ONLINE COURSES</p>
          </div>
        </button>
        <button class="reccard2 w-56 h-72 mb-8" onClick={()=>{navigate('/recommenders/web-series')}}>
          <div class="reccard2-info place-content-center">
          <BiMoviePlay  color='white' className='m-auto' size={80}/>
            <p class="rectitle text-center mt-2  font-bold text-[30px] ">WEB SERIES</p>
          </div>
        </button>
        
        
          


          {/* <Link to={`/recommenders/books`} className='reccard m-16 w-[332px] h-[176px] rounded-[40px] border-[6px] '>
            <div className='flex h-[92px] w-[92px] mb-2 mt-4 m-auto justify-center'><img src={book} alt="" /></div>
            <div className='text-center font-bold text-[30px]'>BOOKS</div>
          </Link>
          <Link to={`/recommenders/restaurants`} className='reccard m-16 w-[332px] h-[176px] rounded-[40px] border-[6px] '>
            <div className='flex h-[92px] w-[92px] mb-2 mt-4 m-auto justify-center'><img src={restraunts} alt="" width={500} /></div>
            <div className='text-center font-bold text-[30px]'>RESTAURANTS</div>
          </Link>
          <Link to={`/recommenders/courses`} className='reccard m-16 w-[332px] h-[176px] rounded-[40px] border-[6px] '>
            <div className='flex h-[92px] w-[92px] mb-2 mt-4 m-auto justify-center'><img src={course} alt="" /></div>
            <div className='text-center font-bold text-[30px]'>ONLINE COURSES</div>
          </Link>
          <Link to={`/recommenders/web-series`} className='reccard m-16 w-[332px] h-[176px] rounded-[40px] border-[6px] '>
            <div className='flex h-[92px] w-[92px] mb-2 mt-4 m-auto justify-center'><img src={webseries} alt="" /></div>
            <div className='text-center font-bold text-[30px]'>WEB SERIES</div>
          </Link> */}
          {/* <Link to={`/recommenders/movies`} className='bg-[#F8F8FF] m-16 w-[332px] h-[176px] rounded-[40px] '>
            <div className='flex h-[92px] w-[92px] mb-2 mt-4 m-auto justify-center'><img src={Movie} alt="" /></div>
            <div className='text-center font-bold text-[30px]'>COLLEGES</div>
          </Link> */}
        </div>
      }
      {activeTab === 'prompt' && <ChatComponent />}

    </div>
  )
}

export default Recommenders