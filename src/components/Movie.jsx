import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { UserAuth } from '../context/Authcontext'
import { db } from '../firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'
 const Movie = ({item}) => {




    const [like, setLike] = useState(false)
    const [saved, setsaved] = useState(false)
    const { user } = UserAuth()

    const movieID = doc(db, 'users', `${user?.email}`)

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


    
   // function   viewMovie() {
   //      console.log("trying to view movie")
         
   //        const url = "https://www.themoviedb.org/movie/" + item.id + '?language=en-US'
   //        window.location.href= url
   //    }
    

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
                            {like ? <FaHeart className='text-transparent md:text-gray-300 absolute top-4 left-4 ' /> : <FaRegHeart className='text-transparent sm:text-gray-300 absolute top-4 left-4 ' />}    
                        </p> 
                    </div>
                    
                </div>
  )
}

export default Movie