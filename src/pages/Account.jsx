import React from 'react'

//import saved shows for user's account
import SavedShows from '../components/SavedShows'

//import loader for animation on page load
import Loader from '../components/Loader'


//Account page with "Saved Shows" returning what has been saved into their account by them

const Account = () => {
  return (
    <>
    <Loader />
    <div className='w-full text-white'>
      <img className=' w-full h-[400px] object-cover' src ="https://singh-cp.github.io/netflix-landingpage/images/netflix-background-image.jpg" alt="/"  />
      <div className='bg-black/60 fixed top-0 left-0 w-full h-[550px]'></div>
        <div className='absolute top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl font-bold'>My Shows</h1>
      </div>
    </div>
    <SavedShows />
    </>
  )
}

export default Account