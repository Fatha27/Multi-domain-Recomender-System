import React from 'react'
import faq from "./Assets/faq-image.png"
import FaqComponent from './FaqComponent'
import { Faqdata } from './FaqData'

function Faq() {
  return (
    <div className='flex m-2 lg:m-14'>
      <div className=' w-full lg:w-1/2'>
        <div className='font-extrabold text-[25px] md:text-[40px] ml-2'>
          <p className='text-white'>Your Queries</p>
          <p className='text-[#595FF0]'>Our Solutions</p>
        </div>
        <div className='bg-[#29293C] w-full md:w-5/6 m-auto mt-4  rounded-[40px] mb-4 space-y-4 p-2'>
          <div className='scroller w-full h-full md:max-h-96 overflow-y-auto overflow-x-hidden md:mr-4 p-4' >
          {Faqdata.map((data, index) => 
              <FaqComponent question={data.question} key={index}
                answer={data.answer} />
              )}
              </div>

        </div>

      </div>
      <div className='hidden m-auto md:hidden lg:block lg: '>

        <img src={faq} alt="" />
      </div>
    </div>
  )
}

export default Faq