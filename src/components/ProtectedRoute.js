import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../context/Authcontext'


const ProtectedRoute = ({children}) => {

    const {user} =UserAuth()

    //Establishes that the user can't access this route unless they are a signed in authenticated user
    //Navigates them to home page 

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