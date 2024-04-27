
//import useEffect for data fetching 
//import useState for movie data, setting url, and search
import React, { useEffect, useState } from 'react'

//import each search results' contents and structure
import Card from '../components/Card';

//import search icon
import { FaSearch } from 'react-icons/fa';

//import how each search result will look
import '../styles/card.css'



//urls to be used for custom searches and category searches
let API_key="&api_key=d50834595a9ac5c2fd35904d6b68625b";
let base_url="https://api.themoviedb.org/3";
let url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;

//array with category titles
let arr=["Popular","SciFi","Crime","Action","Horror"];

const Discover = () => {
   

    //initializes movieData as empty array
    const [movieData,setData]=useState([]);

    //initializes url
    const [url_set,setUrl]=useState(url);

    //initilizes search 
    const [search,setSearch]=useState();
    
    //useEffect fetches data from url_set then sets setData to data.results 
    
    useEffect(()=>{
        fetch(url_set).then(res=>res.json()).then(data=>{
            setData(data.results);
        });
    },[url_set])

    //Checks which search button was pressed in array
    //Returns the corresponding url for the data assigned to that button's value

    const getData=(movieType)=>{
        if(movieType=="Popular")
        {
            url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
        }
        if(movieType=="SciFi")
        {
          url=base_url+"/discover/movie?with_genres=878&sort_by=popularity.desc"+API_key;
        }
        if(movieType=="Crime")
        {
            url=base_url+"/discover/movie?with_genres=80&sort_by=popularity.desc"+API_key;
        }
        if(movieType=="Action")
        {
            url=base_url+"/discover/movie?with_genres=28&sort_by=popularity.desc"+API_key;
        }
        if(movieType=="Horror")
        {
            url=base_url+"/discover/movie?with_genres=27&sort_by=popularity.desc"+API_key;
            
        }
        setUrl(url);

    }

    //Takes the base url, attaches it to a movie search path that takes in the search query from the user

    const searchMovie=(evt)=>{


        

        if (evt.key=="Enter")
        {
            evt.preventDefault()
            url = base_url+"/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query="+search;
            setUrl(url);
            setSearch(" ");
        }
    }

    //maps array of each movie category button and gives them their specific keys, names, values, and onClick functions

    return(
        <>
            <div className=" mx-auto text-center p-2">
                
               
                <ul className='flex flex-row justify-evenly align-middle gap-1 text-center mx-auto mt-[200px] mb-4 border rounded w-[90%] lg:w-[85%] md:w-[80%] cardfilter'>
                        {
                            arr.map((value,pos)=>{
                                return(
                                  <a class='text-center w-[20%] border-r border-l hover:bg-cyan-600 hover:font-bold duration-1000 text-white font-xs' 
                                  href="#" 
                                  key={pos} 
                                  name={value} 
                                  onClick={(e)=>{getData(e.target.name)}}>
                                  {value}
                                  </a>
                                )
                            })
                        }
                       
                </ul>
                <form>
                    <div className=" flex flex-row justify-center">
                      
                    

                    <FaSearch className="text-white ml-2 cursor-0 mr-2 mt-2"/>
                        <input type="text" placeholder="Enter Movie"
                        className="rounded mb-4 lg:w-[600px] md:w-[400px] p-4 w-[70%] h-[20px] " onChange={(e)=>{setSearch(e.target.value)}} 
                        value={search} onKeyDown={searchMovie}>
                        </input>
                       
                    </div>
                    
                </form>
            </div>
            <div className="container flex flex-wrap mx-auto">
                {
                    (movieData.length==0)?<p className="text-white text-center mt-8">Not Found</p>: movieData.map((res,pos)=>{
                        return(
                          
                            <Card info={res} key={pos}/>
                          
                        )
                    })
                }
            </div>
            
        </>
    )
}

export default Discover