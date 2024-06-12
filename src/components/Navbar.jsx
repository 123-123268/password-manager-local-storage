import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-gray-800 text-white flex justify-between p-4 w-full'>
        <div>MeowManager</div>
        <ul className='flex gap-5'>
            <li>Home</li>
            <li>Contact</li>
            <li>About</li>
        </ul>
    </nav>
  )
}

export default Navbar
