
// import useState for liking and saving movies
import React, { useState } from 'react'

//import heart icons for movie saving
import { FaHeart, FaRegHeart } from 'react-icons/fa'

//import star icon to show rating
import { FaStar } from "react-icons/fa";

//import UserAuth
import { UserAuth } from '../context/Authcontext'

//import database
import { db } from '../firebase'

//import arrayUnion, doc, and updateDoc to save movies liked to user's account
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'

//import Link for each movie, when clicked brings them to overview page
import { Link } from 'react-router-dom'

//import empty image placeholder for when image comes back empty
import emptyImage from '../images/image_coming_soon.png'
 

    const Movie = ({item}) => {

    //initializes if the movie is liked to false
    const [like, setLike] = useState(false)

    //initializes if the movie is saved to false
    const [saved, setSaved] = useState(false)

    //initialies UserAuth to check for a user
    const { user } = UserAuth()

    
    //declares movieID destination for when heart it clicked
    const movieID = doc(db, 'users', `${user?.email}`)


    //Saves movie to their account when Heart Icon is clicked and unifies array filled with movies details

     const saveMovie = async () => {
        if(user?.email) {
            setLike(!like)
            setSaved(true)
            await updateDoc(movieID, {
                savedShows: arrayUnion (
                    {id: item.id,
                     title: item.title,
                     img: item.backdrop_path,
                     
                     

                     
                    })
            })
        } else {
            alert ('Please log in to save a movie')
        }
    }

   

    
  //how each movie will be displayed inside of the row sliders on home page


  return (
    <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
                  <img className='w-full h-auto block' src={item.backdrop_path === null ? emptyImage : `https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} />
                    <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                    <Link key={item} item={item} to={`/overview/${item.id}`}>
                        <div  className='text-[.6rem] md:text-[1rem] font-bold flex flex-col justify-center items-center h-full text-center md:mt-0 mt-2'>
                            {item?.title} 
                            
                            <div className='flex mt-2'>
                                <FaStar className='mr-1 mt-[1px] md:mt-0'/>
                                <div>
                                    {item?.vote_average.toFixed(0) / 2 }/5
                                </div>
                            </div>

                            
                    
                        </div>

                    </Link>
                    
                
                        
                        <p onClick={saveMovie}>
                            {like ? <FaHeart className='text-gray-300 absolute top-4 left-4 ' /> : <FaRegHeart className='text-gray-300 absolute top-4 left-4 hover:text-pink-400 ' />}    
                        </p> 
                    </div>
                    
                </div>
  )
}

export default Movie