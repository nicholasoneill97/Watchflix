import React from 'react'

//import navigate to put user back to home page if they try to enter protected route
import { Navigate } from 'react-router-dom'

//import userauth to allow or deny access to protected route
import { UserAuth } from '../context/Authcontext'


const ProtectedRoute = ({children}) => {


    //initializes UserAuth to check for user
    const {user} =UserAuth()

    //Establishes that the user can't access this route unless they are a signed in authenticated user
    //Navigates them to home page if there is not a user present
    //If there is a user present, it will return children, granting access

    if(!user) {
    return <Navigate to="/" />
    } else {
    return children;
    }

  return (
    <></>
  )
}

export default ProtectedRoute