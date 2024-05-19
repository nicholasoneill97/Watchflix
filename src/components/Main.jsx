
//import useEffect for grabbing movie details
//import useState for grabbing movie and liking movie
import React, { useEffect, useState } from 'react'

//import requests for specific data for movie rows
import requests from '../Requests'

//import axios to fetch url
import axios from 'axios'

//import link for "More info" button in hero
import { Link } from 'react-router-dom'

//import star for rating
//import hear icons for liking movie to save to account
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa'

//import updateDoc, UserAuth, db, doc, and arrayUnion for saving movies
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { UserAuth } from '../context/Authcontext'



const Main = () => {

    //initializes movies to an empty array
    const [movies, setMovies] = useState([])
    
    //Randomizes movie selection to be on home page

    const movie = movies[Math.floor(Math.random() * movies.length)]




    //initializes if the movie is liked to false
    const [like, setLike] = useState(false)

    //initializes if the movie is saved to false
    const [saved, setsaved] = useState(false)

    //initializes userAuth to check for user
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
                    {id: movie.info.id,
                     title: movie.info.title,
                     img: movie.info.backdrop_path
                     

                     
                    })
            })
        } else {
            alert ('Please log in to save a movie')
        }
    }



    //Grabs popular movies

    useEffect(() => {
      axios.get(requests.requestPopular).then ((response) => {
        setMovies(response.data.results)
      })
    }, []);
  

    //Makes home page movie description shorter in length

  const truncateString = (str, num) => {
    if(str?.length > num) {
      return str.slice(0, num) + '...'
        } else {
          return str
        }
  };


  return (
    <div className='w-full h-[550px] text-white'>
      <div className='w-full h-full'>
        <div className='absolute w-full h-[550px] bg-gradient-to-r from-black'>
        </div>
        <img className="w-full h-full object-cover" src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
        <div className='absolute w-full top-[20%] p-4 md:p-8'>
          <div className='text-3xl md:text-5xl font-bold flex'>
            {movie?.title}
            <p onClick={saveMovie}>
                                {like ? <FaHeart className=' text-gray-300 ml-4 mt-1' /> : <FaRegHeart className=' text-gray-300 hover:text-pink-500 ml-4 mt-1 z-10' />}   
            </p>
          </div>
          <div className='my-4'>
            <Link key={movie} to={`/overview/${movie?.id}`}>
              <button className='border text-black bg-gray-300 border-gray-300 py-2 px-5 rounded hover:bg-slate-800 hover:text-white duration-1000'>
                More Info
              </button>
            </Link>
          </div> 
          <p className='text-gray-400 text-sm'>
            Released: {movie?.release_date}
          </p>
          <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>
            {truncateString(movie?.overview, 150)}
          </p>
          <div className='flex mt-2'>
            <FaStar className='mr-1 mt-[5px] text-lg'/>
            <div className='text-lg'>
              {movie?.vote_average.toFixed(0) / 2 }/5
            </div>
          </div>
        </div>
        
        
      </div>
        
    </div>
  )
}

export default Main