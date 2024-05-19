
//import useState for movies
//import useEffect for grabbing saved shows' details for user's account
import React, { useState, useEffect } from 'react'

//import left and right icons for slider
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

//import X icon for user to delete saved shows of their choosing
import { AiOutlineClose } from 'react-icons/ai'

//import UserAuth
import {UserAuth} from '../context/Authcontext'

//import db
import { db } from '../firebase'

//import updateDoc, doc, onSnapshot for user's saved shows' details
import { updateDoc, doc, onSnapshot } from 'firebase/firestore'

//import star icon for rating
import { FaStar } from 'react-icons/fa'

//import link to get to overview of movie
import { Link } from 'react-router-dom'

//import empty image placeholder for if an image comes back empty
import emptyImage from '../images/image_coming_soon.png'

const SavedShows = () => {

    //initializes movies set to an empty array
    const[movies, setMovies] = useState([])

    //UserAuth checks for user
    const {user} = UserAuth()

    //Functions that push the sliders left or right   

    const slideLeft = () => {
        var slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft-500;
        
    }

    const slideRight = () => {
        var slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft+500;
        
    }

    //Initializes user data and checks for saved movies in their "Saved Shows"

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
                setMovies(doc.data()?.savedShows)
        })
    },[user?.email])

    

    //Function that deletes the saved shows once a user clicks delete
    //Sets the passed ID from the movie they clicked to be not equal to an item.id
    //It then updates the doc to reflect the change

    const movieRef = doc(db, 'users', `${user?.email}`)

    const deleteShow = async (passedID) => {
        try {
            const result = movies.filter((item) => item.id !== passedID)
            await updateDoc(movieRef, {
                savedShows: result
            })
        } catch (error) {
            console.log(error)
        }
    }

    


  return (
    <>
    <h2 className='text-white font-bold md:text-xl p-4'>My Shows</h2>
    <div className='relative flex items-center group'>
        <MdChevronLeft 
        className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' 
        size={40} 
        onClick={slideLeft}/>
        <div id={'slider'} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
            {movies.map((item, id) => (
                <div key={id} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
                    <img className='w-full h-auto block' src={item?.img === null ? emptyImage : `https://image.tmdb.org/t/p/w500/${item?.img}`} alt={item?.title} />
                    <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                        <Link key={item} item={item} to={`/overview/${item.id}`}>
                        <p className='white-space-normal text-[.6rem] md:text-sm font-bold flex flex-col justify-center items-center md:mt-0 mt-2 h-full text-center'>
                            {item?.title}
                        </p>
                        </Link>
                        <p onClick={()=> deleteShow(item.id)} className='absolute text-gray-300 top-4 right-4 z-[100]'>
                            <AiOutlineClose  />
                        </p>
                    </div>
                </div>
            ))}
        </div>
        <MdChevronRight className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40} 
        onClick={slideRight} />
    </div>
    </>
  )
}

export default SavedShows