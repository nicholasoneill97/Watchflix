import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
  <div class=" bg-zinc-900 mt-10">
    <div class="max-w-2xl mx-auto text-white py-10">
        <div class="text-center">
          <Link to="/">
            <h1 className='text-cyan-600 text-4xl font-bold cursor-pointer origin-left  duration-300 scale-y-10 slidefromleft'>WATCHFLIX</h1>
          </Link>
            <p>Endless Movies</p>
            <div class="flex justify-center my-10">
                <div class="flex items-center border bg-black w-auto rounded-lg px-4 py-2 mx-2">
                  <img src='https://www.themoviedb.org/assets/2/v4/logos/408x161-powered-by-rectangle-green-bb4301c10ddc749b4e79463811a68afebeae66ef43d17bcfd8ff0e60ded7ce99.png' />
                </div>
            </div>
        </div>
        <div class="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
            <p class="order-2 md:order-1 mt-8 md:mt-0">  
              Coded by Nicholas O'Neill 
            </p>
            <div class="order-1 md:order-2">
              <Link to="/login"><span className="px-2 ">Sign In</span></Link>
              <Link to="/signup"><span className="px-2 border-l">Sign Up</span></Link>
            </div>
        </div>
    </div>
</div>
  )
}

export default Footer