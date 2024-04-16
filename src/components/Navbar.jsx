import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../animation&nav.css'
import { UserAuth } from '../context/Authcontext'

const Navbar = () => {

  const {user, logOut} = UserAuth()
  const navigate = useNavigate()
 

  const handleLogout = async () => {
    try {
      await logOut()
      navigate('/')
    } catch(error) {

    }
  }

  return (
    <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>
        <Link to="/">
          <h1 className=' text-cyan-600 text-4xl font-bold cursor-pointer origin-left  duration-300 scale-y-10 slidefromleft navbutton'>WATCHFLIX</h1>
        </Link>
        
        {user?.email ?  (<div>
          <Link to="/account">
            <button className='transparent border px-4 py-2 text-white slidefromright rounded mr-2 hover:bg-white hover:text-black animation duration-700 navbutton navbuttonline'>
              Account
            </button>
          </Link>
            
            <button onClick={handleLogout} className='bg-cyan-600 px-6 py-2 text-white slidefromright rounded hover:bg-black hover:text-white hover:border-white border border-cyan-600 animation duration-700 navbutton mr-2'>
              Log Out
            </button>
            
          <Link to="/discover">
            <button className='transparent px-4 py-2 text-white slidefromright rounded mr-2 hover:bg-white hover:text-black animation duration-700 navbutton navbuttonline border'>
              Discover
            </button>
          </Link>

        </div>) : (<div>
                      <Link to="/login">
                        <button className='transparent px-4 py-2 text-white slidefromright rounded mr-2 hover:bg-white hover:text-black animation duration-700 navbutton navbuttonline'>
                          Sign In
                        </button>
                      </Link>
                      <Link to="/signup">
                        <button className='bg-cyan-600 px-6 py-2 text-white slidefromright rounded hover:bg-white hover:text-black animation duration-700 navbutton'>
                          Sign Up
                        </button>
                      </Link>
                  </div>)}
    </div>
  )
}

export default Navbar