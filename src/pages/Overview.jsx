import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserAuth } from '../context/Authcontext'
import { db } from '../firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { Link, useParams } from 'react-router-dom';



const Overview = ({item, fetchURL}) => {

    const [movie, getMovie] = useState([])
    const [like, setLike] = useState(false)
    const [saved, setsaved] = useState(false)
    const { user } = UserAuth()

    const movieID = doc(db, 'users', `${user?.email}`)

    const { id } = useParams();
    

    const url = {
        getDetails: `https://api.themoviedb.org/3/movie/${id}?api_key=d50834595a9ac5c2fd35904d6b68625b&language=en-US`
    } 
    
    useEffect(() => {
        axios.get(url.getDetails).then ((response) => {
            getMovie(response.data)
        })
    }, [])

    


    const saveMovie = async () => {
        if(user?.email) {
            setLike(!like)
            setsaved(true)
            await updateDoc(movieID, {
                savedShows: arrayUnion (
                    {id: movie.id,
                     title: movie.title,
                     img: movie.backdrop_path,
                     details: movie.overview,
                     

                     
                    })
            })
        } else {
            alert ('Please log in to save a movie')
        }
    }
    
      

    

  return (
    <>
    
        
            <div className='absolute w-full h-[550px]  bg-gradient-to-b from-black via-transparent to-black '></div>
            <img className="w-full h-full object-cover brightness-[25%] hidden lg:flex" src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
            <div className='absolute w-full max-h-full top-[8%] lg:top-[20%] p-4 md:p-8 flex flex-row justify-evenly align-middle gap-6'>
                <div className='flex lg:flex-row flex-col lg:gap-6 gap-2 justify-center h-full'>
                    <div className='flex flex-col justify-center gap-4 align-middle'>
                    <img className="h-[400px] w-auto border relative xl:h-[350px]" src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`} alt={movie?.title} />
                    <a href={`https://www.themoviedb.org/movie/${movie?.id}?language=en-US`} target='_blank'>
                        <button className='text-white px-4 py-2 border cursor-pointer w-full bg-transparent backdrop-blur-sm font-bold hover:bg-cyan-600 hover:text-black hover:border-cyan-600 hover:font-extrabold transition duration-1000'>
                        Learn More
                        </button>
                    </a>
                    </div>
                    <div className='mt-0 h-full lg:mt-8'>
                        <h1 className='text-3xl md:text-5xl font-bold pt-1 text-white flex flex-row'>
                            {movie?.title} 
                            <p onClick={saveMovie}>
                            {like ? <FaHeart className=' text-gray-300 ml-4 mt-1' /> : <FaRegHeart className=' text-gray-300 hover:text-pink-500 ml-4 mt-1 z-10' />}   
                         
                            </p>
                        </h1>
                        <p className='text-white text-lg mt-2'>Released: {movie?.release_date}</p>
                        <p className='text-white text-lg mt-1'>Rating: {parseInt(movie.vote_average * 10)}%</p>
                        <h1 className=' text-3xl text-left text-white mt-4'>Overview</h1>
                        <div className='text-left max-w-[400px] text-white mb-4'>{movie?.overview}</div>
                        
                    </div>
                    
                </div>  
            
                
                    
                   
                
            </div>
           
        
       
        
    
    </>
  )
}

export default Overview