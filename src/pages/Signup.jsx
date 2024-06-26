
//import useState for email and password
import React, { useState } from 'react'

//import link and useNavigate for navigation
import { Link, useNavigate } from 'react-router-dom'

//import UserAuth for sign up
import { UserAuth } from '../context/Authcontext'

//import loader for animation on page load
import Loader from '../components/Loader'



const Signup = () => {

    //initializes email to empty string
    const [email, setEmail] = useState('')

    //initializes password to empty string
    const [password, setPassword] = useState('')

    //initializes UserAuth 
    const {user, signUp} = UserAuth()

    //declares variable navigate set to useNavigate
    const navigate = useNavigate()

    //Handles the user data submitted to sign the user up
    //Navigates the user back to the home page

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await signUp(email, password)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <>
    <Loader />
    <div className='w-full h-screen'>
        <img className='hidden sm:block absolute w-full h-full object-cover' src ="https://www.okynemedialab.com/wp-content/uploads/2019/11/netflix-background-50-Black-1024x576.jpg" alt="/"  />
        <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
        <div className='fixed w-full px-4 py-24 z-50'>
            <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
                <div className='max-w-[320px] mx-auto py-16'>
                    <h1 className='text-3xl font-bold'>
                        Sign Up
                    </h1>
                    <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
                        <input onChange={(e) => setEmail(e.target.value)} className='p-3 my-2 bg-gray-700 rounded'  type='email' placeholder='Email' autoComplete='email'/>
                        <input onChange={(e) => setPassword(e.target.value)} className='p-3 my-2 bg-gray-700 rounded' type='password' placeholder='Password' autoComplete='current-password' />
                        <button className='bg-cyan-600 py-3 my-6 rounded font-bold border border-cyan-600 hover:border-white hover:bg-transparent duration-500'>
                            Sign Up
                        </button>
                        <div className='flex justify-between items-center text-sm text-gray-500'>
                            <p>
                                <input className='mr-2' type="checkbox" name="" id="" />
                                Remember me
                            </p>
                            <p>
                                Need Help?
                            </p>
                        </div>
                        <p className='py-8'>
                            <span className='text-gray-500'>
                                Already subscribed to Watchflix?
                            </span>
                            <Link to="/login" className='ml-6 hover:text-slate-400 duration-500'>
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Signup