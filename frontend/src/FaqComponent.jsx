import React, { useState } from 'react';

function FaqComponent({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-[#F8F8FF] border-4 border-[#3109BA] rounded-[20px] shadow-md w-full  md:w-5/6 md:ml-6 m-2">
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer"
        onClick={toggleAccordion}
      >
        <h3 className=" font-semibold text-[12px] md:text-[20px]">{question} </h3>
        <svg
          className={`w-6 h-6 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="px-4 py-2">
          <p className="text-gray-700 font-normal text-[15px] md:text[18px]">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default FaqComponent;
