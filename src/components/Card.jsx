
//import useState for likes and saving movies
import react, { useState } from "react";

//import styles for search results
import '../styles/card.css'

//import link for "learn more" button on each search result
import { Link } from "react-router-dom";

//import heart icons for users to like specific movies
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

//import UserAuth to check if user is present in order to like movies
import { UserAuth } from "../context/Authcontext";

//import arrayUnion, doc, db, and updateDoc to save movie and movie details to user's account if movie is liked
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

//import motion for animation on load
import { motion } from "framer-motion";

//import coming soon image in case image can't be loaded in for movie
import  coming_soon  from '../images/image_coming_soon.png'


const Card=(movie, item)=>{


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



  


    
    
    //declares movie image path's base url and width to be rendered of image
    let img_path="https://image.tmdb.org/t/p/w500";

   
    return(
        <>
        
            <motion.div 
                className="flex flex-row card justify-center gap-0 lg:gap-1 items-center border border-l-0 border-solid border-slate-600 lg:w-[400px] w-[220px] lg:h-auto h-[120px] mx-auto mb-8 relative rounded hover:shadow-lg hover:shadow-cyan-800"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 3 }}>
                <div>
                    <img src={img_path+movie.info.poster_path} alt={movie.info.title} className="h-[120px] w-[130px] lg:h-[220px]  lg:w-[220px] rounded" ></img>
                </div>
                    <div className="w-[100%] lg:ml-4  ml-2">
                    
                        <h4 className="text-white font-bold text-[10px] lg:text-lg flex cardtitle w-[110px] lg:w-[210px]">
                            {movie.info.title}
                            <p onClick={saveMovie}>
                                {like ? <FaHeart className='text-gray-300 ml-1 mr-1  lg:mt-1 mt-2 absolute top-0 right-1' /> : <FaRegHeart className=' text-gray-300 hover:text-pink-500 ml-1 mr-1  lg:mt-1 mt-2 absolute top-0 right-1' />}   
                         
                            </p>
                        </h4>
                    
                    
                        <h4 className="text-white mt-0 lg:mt-2 w-[120px] lg:w-[200px] text-[10px] lg:text-lg mb-1">
                            Released {movie.info.release_date}
                        </h4>
                        <div className=' text-white flex mb-10 lg:mb-4 text-[10px] lg:text-lg'>
                            <FaStar className='mr-1 mt-[2px] lg:mt-[5px]'/>
                            <p>
                                {movie?.info.vote_average.toFixed(0) / 2 }/5
                            </p>
                        </div>
                        
                        <Link className="" key={movie.id} to={`/overview/${movie.info.id}`}>
                            <button className='text-white  px-2 py-1 border cursor-pointer w-[100px] lg:w-[120px] bg-transparent backdrop-blur-sm font-bold hover:bg-slate-500  hover:border-black transition duration-1000 absolute lg:bottom-[5%] bottom-3 text-sm lg:text-md'>
                                Learn More
                            </button>
                        </Link>
                    </div>   
                    
                
                
            </motion.div> 
        
            
        </>
    )
}
export default Card;