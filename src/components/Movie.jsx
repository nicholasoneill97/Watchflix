
// import useState for liking and saving movies
import React, { useState } from 'react'

//import heart icons for movie saving
import { FaHeart, FaRegHeart } from 'react-icons/fa'

//import UserAuth
import { UserAuth } from '../context/Authcontext'

//import database
import { db } from '../firebase'

//import arrayUnion, doc, and updateDoc to save movies liked to user's account
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'

//import Link for each movie, when clicked brings them to overview page
import { Link } from 'react-router-dom'
 

    const Movie = ({item}) => {

    //initializes if the movie is liked to false
    const [like, setLike] = useState(false)

    //initializes if the movie is saved to false
    const [saved, setsaved] = useState(false)

    //initialies UserAuth to check for a user
    const { user } = UserAuth()

    
    //declares movieID destination for when heart it clicked
    const movieID = doc(db, 'users', `${user?.email}`)


    //Saves movie to their account when Heart Icon is clicked and unifies array filled with movies details

     const saveMovie = async () => {
        if(user?.email) {
            setLike(!like)
            setsaved(true)
            await updateDoc(movieID, {
                savedShows: arrayUnion (
                    {id: item.id,
                     title: item.title,
                     img: item.backdrop_path,
                     details: item.overview,
                     

                     
                    })
            })
        } else {
            alert ('Please log in to save a movie')
        }
    }


    
  //how each movie will be displayed inside of the row sliders on home page
    

  return (
    <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
                  <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} />
                    <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                    <Link key={item} item={item} to={`/overview/${item.id}`}>
                        <p  className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
                            {item?.title}
                        </p>
                    </Link>
                    
                
                        
                        <p onClick={saveMovie}>
                            {like ? <FaHeart className='text-gray-300 absolute top-4 left-4 ' /> : <FaRegHeart className='text-gray-300 absolute top-4 left-4 ' />}    
                        </p> 
                    </div>
                    
                </div>
  )
}

export default Movie