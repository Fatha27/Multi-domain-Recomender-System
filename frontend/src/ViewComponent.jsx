import React from 'react';
import Movies from "./Assets/movies.jpg";

function ViewComponent({ titleClick, ...props }) {
  function onTitleClick(index) {
    return function() {
      titleClick(index);
      console.log(index)
    };
  }

  return (
    <>
      {props?.recommendations.map((recommendation, index) => (
        <div className='bg-[#F8F8FF] max-w-1/4 lg:w-1/4 rounded-xl border-4 border-[#3109BA] m-2' key={index}>
          <div className='w-auto m-auto p-2'><img src={recommendation?.Image || Movies} alt="" className='rounded-xl' /></div>
          <div className='bg-[#696DD2] rounded-lg m-3 mb-1 flex place-content-evenly text-white font-medium text-[12px] lg:text-[15px]'>
            <div>{props.info?.category}</div>
            <div>|</div>
            <div>{recommendation['Release Date'] ||  "★" + recommendation?.Rating }</div>
            <div>|</div>
            <div>{ recommendation?.Duration ? recommendation?.Duration  + props.info?.duration :  (recommendation?.Runtime || recommendation?.Pages) + " " + props.info?.duration}</div>
          </div>
          <button className='text-center text-[17px] lg:text-[20px]  font-semibold text-black m-auto flex hover:text-[#3109BA]' onClick={onTitleClick(index)}>{recommendation?.Series ? recommendation?.Series : recommendation?.Title}</button>
        </div>
      ))}
    </>
  );
}

export default ViewComponent;




