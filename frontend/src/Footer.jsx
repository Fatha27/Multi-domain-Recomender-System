import React from 'react'

function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <footer className='m-10 border-t-4 p-4 border-[#29293C] text-white text-[20px] text-center'>
      <p>&copy; {currentYear} Recom-Ai. All rights reserved.</p>
      </footer>
  )
}

export default Footer