
//import axios for fetching movie details
import axios from 'axios';

//import useEffect for grabbing movie details
//import useState for movie, like, and saving movies
import React, { useEffect, useState } from 'react'

//import heart icons for before it's clicked and after
import { FaHeart, FaRegHeart } from 'react-icons/fa';

//import UserAuth to make sure user is logged in to save movie
import { UserAuth } from '../context/Authcontext'

//import db to save movie details to their account once heart is clicked
import { db } from '../firebase'

//import arrayUnion, doc, and updateDoc for movie and movie details to be saved to account once heart is clicked
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'

//import useParams to catch ID for movie
import { useParams } from 'react-router-dom';

//import motion for animation
import { motion } from 'framer-motion';

//import loader for animation on page load
import Loader from '../components/Loader';

//import empty image placeholder and empty background in case image comes back empty
import emptyImage from '../images/overview_image_coming_soon.png'
import emptyBG from '../images/blank_bg.png'

//import overview styles sheet for responsiveness
import '../styles/overview.css'



const Overview = () => {

    //initializes movie to empty array
    const [movie, getMovie] = useState([])

    //initializes if movie is liked to false
    const [like, setLike] = useState(false)

    //initializes if movie is saved to false
    const [saved, setsaved] = useState(false)

    //initializes UserAuth to check if there's a user present
    const { user } = UserAuth()

    //declares movieID that will get set to user's account
    const movieID = doc(db, 'users', `${user?.email}`)

    //sets useParams to id passed in
    const { id } = useParams();
    

    //declares url that gets id passed in and returns movie details
    const url = {
        getDetails: `https://api.themoviedb.org/3/movie/${id}?api_key=d50834595a9ac5c2fd35904d6b68625b&language=en-US`
    } 
    
    //Grabs specific movie details from ID passed in
    useEffect(() => {
        axios.get(url.getDetails).then ((response) => {
            getMovie(response.data)
        })
    }, [])


    //in place to make sure the window always opens up to the top of the page
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    
    //Saves movies to their account

    const saveMovie = async () => {
        if(user?.email) {
            setLike(!like)
            setsaved(true)
            await updateDoc(movieID, {
                savedShows: arrayUnion (
                    {id: movie.id,
                     title: movie.title,
                     img: movie.backdrop_path
                     
                     
                     

                     
                    })
            })
        } else {
            alert ('Please log in to save a movie')
        }
    }
    
      

    //how specific movie clicked will be displayed to user

  return (
    <>
            <Loader />
        
            <div className='absolute w-full h-[550px]  bg-gradient-to-b from-black via-transparent to-black '></div>
            <img className="w-full h-full object-cover brightness-[15%] hidden lg:flex" src={movie?.backdrop_path === null ? emptyBG : `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
            <div className={movie?.backdrop_path === null ? 'empty-poster overview absolute w-full max-h-full top-[8%] lg:top-[20%] p-4 md:p-8 flex flex-row justify-evenly align-middle gap-6' : 'overview absolute w-full max-h-full top-[8%] lg:top-[20%] p-4 md:p-8 flex flex-row justify-evenly align-middle gap-6'}>
                <motion.div 
                    className='container flex lg:flex-row flex-col lg:gap-6 gap-2 justify-center h-full'
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: 1, scale: 1, }}
                    transition={{ duration: 2, delay: 1 }}>
                    <div className={movie?.backdrop_path === null ? 'empty-div image-container flex flex-col justify-center gap-4 align-middle' : 'image-container flex flex-col justify-center gap-4 align-middle'}>
                        <img className="poster h-[400px] w-[300px] border border-slate-600 relative xl:h-[350px] xl:w-[250px] mx-auto" src={movie?.poster_path === null ? emptyImage : `https://image.tmdb.org/t/p/original/${movie?.poster_path}`} alt={movie?.title} />
                        <a href={`https://www.themoviedb.org/movie/${movie?.id}?language=en-US`} target='_blank'>
                            <button className=' text-white px-4 py-2 border-white border rounded cursor-pointer w-full bg-slate-800 backdrop-blur-sm font-bold hover:bg-slate-500  hover:border-slate-300 transition duration-1000'>
                                Learn More
                            </button>
                        </a>
                    </div>
                    <div className='movie-info mt-0 h-full lg:mt-8'>
                        <h1 className='movie-title text-3xl md:text-5xl font-bold pt-1 text-white flex flex-row'>
                            {movie?.title} 
                            <p onClick={saveMovie}>
                                {like ? <FaHeart className=' text-gray-300 ml-4 mt-1' /> : <FaRegHeart className=' text-gray-300 hover:text-pink-500 ml-4 mt-1 z-10' />}   
                            </p>
                        </h1>
                        <p className='text-white text-lg mt-2'>
                            Released: {movie?.release_date}
                        </p>
                        <p className='text-white text-lg mt-1'>
                            Rotten Potatoes: {parseInt(movie.vote_average * 10)}%
                        </p>
                        <h1 className=' text-3xl text-left text-white mt-4'>
                            Overview
                        </h1>
                        <div className='overview-text text-left max-w-[400px] text-white mb-4'>
                            {movie?.overview}
                        </div>
                    </div>
                </motion.div>  
            </div>
           
        
       
        
    
    </>
  )
}

export default Overview