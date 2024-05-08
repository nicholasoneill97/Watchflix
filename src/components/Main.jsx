
//import useEffect for grabbing movie details
//import useState for movies
import React, { useEffect, useState } from 'react'

//import requests for specific data for movie rows
import requests from '../Requests'

//import axios to fetch url
import axios from 'axios'

//import link for "More info" button in hero
import { Link } from 'react-router-dom'

//import star for rating
import { FaStar } from 'react-icons/fa'



const Main = () => {

    //initializes movies to an empty array
    const [movies, setMovies] = useState([])
    
    //Randomizes movie selection to be on home page

    const movie = movies[Math.floor(Math.random() * movies.length)]


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
          <h1 className='text-3xl md:text-5xl font-bold'>
            {movie?.title}
          </h1>
          <div className='my-4'>
            <Link key={movie} to={`/overview/${movie?.id}`}>
              <button className='border text-black bg-gray-300 border-gray-300 py-2 px-5 rounded hover:bg-black hover:text-white duration-1000'>
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