import react, { useState } from "react";
import '../card.css'
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/Authcontext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";


const Card=(movie, item)=>{

    const [like, setLike] = useState(false)
    const [saved, setsaved] = useState(false)
    const { user } = UserAuth()

    const movieID = doc(db, 'users', `${user?.email}`)

    //Saves movie to their account when Heart Icon is clicked

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





    
    
   
    let img_path="https://image.tmdb.org/t/p/w500";
    return(
        <>
        
            <div className="card justify-center gap-2 lg:gap-10 items-center border-solid border border-slate-800 w-full mx-auto mb-8 relative">
                <div>
                
                <img src={img_path+movie.info.poster_path} className="h-auto" ></img>
                
                
                </div>
                    <div className="w-[100%]">
                    
                    <h4 className="text-white font-bold text-xl flex  cardtitle">
                        {movie.info.title}
                        <p onClick={saveMovie}>
                            {like ? <FaHeart className='text-gray-300 ml-2 mt-1' /> : <FaRegHeart className=' text-gray-300 hover:text-pink-500 ml-2  mt-1' />}   
                         
                        </p>
                    </h4>
                    
                    
                        <h4 className="text-white mt-4 w-[120px] lg:w-[250px] text-xs lg:text-lg">
                            Released {movie.info.release_date}
                        </h4>
                        
                        <Link className="relative" key={movie.id} to={`/overview/${movie.info.id}`}>
                            <button className='text-white mt-4 px-2 py-1 border cursor-pointer w-[80px] lg:w-full bg-transparent backdrop-blur-sm font-bold hover:bg-cyan-600 hover:text-black hover:border-cyan-600 hover:font-extrabold transition duration-1000'>
                                Learn More
                            </button>
                        </Link>
                    </div>   
                    
                
                
                </div> 
        
            
        </>
    )
}
export default Card;