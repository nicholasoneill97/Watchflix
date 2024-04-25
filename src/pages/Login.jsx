
//import useState for email, password, and error 
import React, { useState } from 'react'

//import link for navigation to sign up page
import { Link, useNavigate } from 'react-router-dom'

//import UserAuth to check users credentials 
import { UserAuth } from '../context/Authcontext'


const Login = () => {


  //sets email to initially be empty string  
  const [email, setEmail] = useState('')

  //sets password to initially be empty string 
  const [password, setPassword] = useState('')

  //sets error to initially be empty string 
  const [error, setError] = useState('')

  //initializes userAuth
  const {user, logIn} = UserAuth()

  //initializes useNavigate set to navigate variable
  const navigate = useNavigate()

    //Checks user data submitted against what is saved in the database
    //Returns error message if credentials are not found

  const handleSubmit = async (e) => {
      e.preventDefault()
      setError('')
      try {
          await logIn(email, password)
          navigate('/')
      } catch (error) {
          console.log(error)
          setError(error.message)
      }
  }

  return (
    <div className='w-full h-screen'>
        <img className='hidden sm:block absolute w-full h-full object-cover' src ="https://www.okynemedialab.com/wp-content/uploads/2019/11/netflix-background-50-Black-1024x576.jpg" alt="/"  />
        <div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
        <div className='fixed w-full px-4 py-24 z-50'>
            <div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
                <div className='max-w-[320px] mx-auto py-16'>
                    <h1 className='text-3xl font-bold'>
                        Sign In
                    </h1>
                    {error ? <p className=''>{error}</p> : null}
                    <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
                        <input onChange={(e) => setEmail(e.target.value)} className='p-3 my-2 bg-gray-700 rounded'  type='email' placeholder='Email' autoComplete='email'/>
                        <input onChange={(e) => setPassword(e.target.value)} className='p-3 my-2 bg-gray-700 rounded' type='password' placeholder='Password' autoComplete='current-password' />
                        <button className='bg-cyan-600 py-3 my-6 rounded font-bold'>
                            Sign In
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
                                New to Watchflix?
                            </span>
                            <Link to="/signup" className='ml-6'>
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login