
//import axios for url fetching
import axios from 'axios'

//import useEffect for getting data results
//import useState for setting movies in their respective rows
import React, { useEffect, useState } from 'react'

//import Movie 
import Movie from './Movie'

//import right and left icons for each row
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

const Row = ({title, fetchURL, rowID}) => {

    //initializes movies set to an empty array
    const [movies, setMovies] = useState([])
    
    //Data fetching for home page fullfillment

    useEffect(() => {
        axios.get(fetchURL).then ((response) => {
            setMovies(response.data.results)
        })
    }, [fetchURL])

    //Functions that push the sliders left or right

    const slideLeft = () => {
        var slider = document.getElementById('slider' + rowID)
        slider.scrollLeft = slider.scrollLeft-500;
        
    }

    const slideRight = () => {
        var slider = document.getElementById('slider' + rowID)
        slider.scrollLeft = slider.scrollLeft+500;
        
    }

    //Left and right icons are hooked up to corresponding slide left/right functions

  return (
    <>
    <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
    <div className='relative flex items-center group'>
        <MdChevronLeft  
        className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' 
        size={40} 
        onClick={slideLeft}/>
            <div id={'slider' + rowID} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                {movies.map((item, id) => (
                    <Movie key={id} item={item} />
                ))}
            </div>
        <MdChevronRight 
        className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' 
        size={40} 
        onClick={slideRight} />
    </div>
    </>
  )
}

export default Row