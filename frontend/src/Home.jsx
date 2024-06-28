import React from 'react'
import { BiSolidCameraMovie } from "react-icons/bi";
import { GiMeal } from "react-icons/gi";
import { TbBooks } from "react-icons/tb";
import TR from "./Assets/tailored-rec.png"
import MD from './Assets/multi-domain-compat.png'
import UI from "./Assets/user-interface.png"
import c1 from "./Assets/c2-1.png"
import c2 from "./Assets/c2-2.png"
import c3 from "./Assets/c2-3.png"
import c4 from "./Assets/c2-4.png"
import c5 from "./Assets/c2-5.png"
import {useNavigate} from "react-router-dom"

function Home() {
  const navigate=useNavigate()

  return (
    <div className='font-[Amaranth]'>
      <div className='text-[#595FF0] place-content-center flex font-semibold text-[60px] mt-4'>RECOM-AI</div>
      <div className='text-white place-content-center flex m-auto'>
        <div className='text-[20px] font-medium'>
          <div className='flex place-content-evenly gap-2'>
            <p className='flex items-center gap-1'>Films <BiSolidCameraMovie /></p>
            <p className='border-2'></p>
            <p className='flex items-center gap-1'>Feasts <GiMeal /></p>
            <p className='border-2'></p>
            <p className='flex items-center gap-1'>Literature <TbBooks /></p>
          </div>
          <div>with Tailored Recommendations</div>
        </div>
      </div>
      <div className='text-[25px] font-medium text-center w-3/4 m-auto mt-5 text-white'>Welcome to our comprehensive recommender system!
        Whether it's movies, restaurants, books, web series, or online courses, we've got you covered.
        Simply input your favorite in any category, and unlock a world of tailored recommendations across all domains.
      </div>
      <div className='m-auto flex flex-wrap place-content-evenly gap-8 mt-8 text-center text-[15px] '>
        <div class="cardContainer">
          <div class="card">
            <img src={TR} alt="" />
            <p class="city">TAILORED RECOMMENDATION</p>
          </div>
        </div>
        <div class="cardContainer">
          <div class="card">
            <img src={MD} alt="" />

            <p class="city">MULTI-DOMAIN COMPATIBILITY</p>
          </div>
        </div>
        <div class="cardContainer">
          <div class="card">
            <img src={UI} alt="" />

            <p class="city">USER-FRIENDLY INTERFACE</p>
          </div>
        </div>
      </div>
      <div className='text-[25px] font-medium text-center w-3/4 m-auto mt-16 text-white'>Dive in, explore, and let our algorithm surprise you with recommendations perfectly suited to your taste. Whether you're in the mood for
      </div>
      <div className='m-auto flex flex-wrap place-content-evenly font-medium text-[18px] mt-10'>
        <div className="card2 w-56 h-72  mb-8">
          <div class="card2-info place-content-around">
            <img src={c1} alt="" className='m-auto' />
            <p class="title text-center mt-2 ">A thrilling movie</p>
          </div>
        </div>
        <div class="card2 w-56 h-72 mb-8">
          <div class="card2-info place-content-center">
            <img src={c2} alt="" className='m-auto' />
            <p class="title text-center mt-2">A delectable dining experience</p>
          </div>
        </div>
        <div class="card2 w-56 h-72 mb-8">
          <div class="card2-info place-content-center">
            <img src={c3} alt="" className='m-auto' />
            <p class="title text-center mt-2">An enthralling read</p>
          </div>
        </div>
        <div class="card2 w-56 h-72 mb-8">
          <div class="card2-info place-content-center">
            <img src={c4} alt="" className='m-auto' />
            <p class="title text-center mt-2">Captivating online course</p>
          </div>
        </div>
        <div class="card2 w-56 h-72 mb-8">
          <div class="card2-info place-content-center">
            <img src={c5} alt="" className='m-auto' />
            <p class="title text-center mt-2 ">A binge-worthy web series</p>
          </div>
        </div>
      </div>
      <div className='text-[25px] font-medium text-center w-3/4 m-auto text-white mt-16 mb-10'>we're here to guide you on your journey of discovery. Ready to embark on an adventure?
        Start exploring now!"
      </div>
      <div className='mt-10 mb-10 place-content-center flex'>
        <button class="cssbuttons-io-button" onClick={()=>{navigate('/recommenders')}}>
          Get started
          <div class="icon">
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </button>
      </div>
      
    </div>
  )
}

export default Home

// import React, { useState, useEffect } from 'react';

// function App() {
//   const [inputValue, setInputValue] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   useEffect(() => {
//     fetch('http://localhost:5000/data.json')  // Adjust the path to your JSON file
//       .then(response => response.json())
//       .then(data => {
//         // Extract keys from JSON data
//         setSuggestions(data);
//       })
//       .catch(error => console.error('Error fetching JSON data:', error));
//   }, []);
  
  

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };
//   console.log(suggestions)

//   const filteredSuggestions = suggestions?.filter((suggestion) =>
//     suggestion?.toLowerCase().includes(inputValue.toLowerCase())
//   );

//   return (
//     <div>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={handleInputChange}
//         list="suggestions"
//         placeholder="Type something..."
//       />
//       <datalist id="suggestions">
//         {filteredSuggestions.map((suggestion, index) => (
//           <option key={index} value={suggestion} />
//         ))}
//       </datalist>
//     </div>
//   );
// }

// export default App;
