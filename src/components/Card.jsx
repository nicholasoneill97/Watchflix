
//import useState for likes and saving movies
import react, { useState } from "react";

//import styles for search results
import '../card.css'

//import link for "learn more" button on each search result
import { Link } from "react-router-dom";

//import heart icons for users to like specific movies
import { FaHeart, FaRegHeart } from "react-icons/fa";

//import UserAuth to check if user is present in order to like movies
import { UserAuth } from "../context/Authcontext";

//import arrayUnion, doc, db, and updateDoc to save movie and movie details to user's account if movie is liked
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";


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
                     img: movie.info.backdrop_path,
                     details: movie.info.overview,
                     

                     
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
        
            <div className="flex flex-row card justify-center gap-0 lg:gap-1 items-center border-solid border border-slate-600 lg:w-[400px] w-[175px] lg:h-auto h-[120px] mx-auto mb-8 relative rounded hover:shadow-lg hover:shadow-cyan-800">
                <div>
                    <img src={img_path+movie.info.poster_path} className="h-[100px] w-[100px] lg:h-[220px]  lg:w-[220px] rounded" ></img>
                </div>
                    <div className="w-[100%] lg:ml-4  ml-2">
                    
                        <h4 className="text-white font-bold text-[10px] lg:text-lg flex cardtitle w-[80px] lg:w-[120px]">
                            {movie.info.title}
                            <p onClick={saveMovie}>
                                {like ? <FaHeart className='text-gray-300 ml-1 mr-1  lg:mt-1 mt-2 absolute top-0 right-1' /> : <FaRegHeart className=' text-gray-300 hover:text-pink-500 ml-1 mr-1  lg:mt-1 mt-2 absolute top-0 right-1' />}   
                         
                            </p>
                        </h4>
                    
                    
                        <h4 className="text-white mt-0 lg:mt-2 w-[120px] lg:w-[200px] text-[10px] lg:text-lg mb-6">
                            Released {movie.info.release_date}
                        </h4>
                        
                        <Link className="" key={movie.id} to={`/overview/${movie.info.id}`}>
                            <button className='text-white  px-2 py-1 border cursor-pointer w-[100px] lg:w-[120px] bg-transparent backdrop-blur-sm font-bold hover:bg-cyan-600 hover:text-black hover:border-cyan-600 hover:font-extrabold transition duration-1000 absolute lg:bottom-[10%] bottom-3 text-sm lg:text-md'>
                                Learn More
                            </button>
                        </Link>
                    </div>   
                    
                
                
                </div> 
        
            
        </>
    )
}
export default Card;