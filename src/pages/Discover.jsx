import React, { useEffect, useState } from 'react'
import Card from '../components/Card';
import { FaSearch } from 'react-icons/fa';
import '../card.css'


let API_key="&api_key=d50834595a9ac5c2fd35904d6b68625b";
let base_url="https://api.themoviedb.org/3";
let url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
let arr=["Popular","SciFi","Crime","Action","Horror"];

const Discover = () => {
   
    const [movieData,setData]=useState([]);
    const [url_set,setUrl]=useState(url);
    const [search,setSearch]=useState();
    
    
    
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


        

        if(evt.key=="Enter")
        {
            evt.preventDefault()
            url=base_url+"/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query="+search;
            setUrl(url);
            setSearch(" ");
        }
    }



    return(
        <>
            <div className=" mx-auto text-center p-2">
                
               
                <ul className='flex flex-row justify-evenly align-baseline gap-1 text-center mx-auto mt-[200px] mb-4 border rounded w-[85%] cardfilter'>
                        {
                            arr.map((value,pos)=>{
                                return(
                                  <a class='text-center w-[20%] border-r border-l hover:bg-cyan-600 hover:text-black duration-1000 text-white font-xs' 
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
                      
                    

                    <FaSearch className="text-white ml-2 cursor-0 mr-2"/>
                        <input type="text" placeholder="Enter Movie"
                        className="rounded mb-4 lg:w-[600px] p-4 w-[50%] h-[20px] " onChange={(e)=>{setSearch(e.target.value)}} 
                        value={search} onKeyDown={searchMovie}>
                        </input>
                       
                    </div>
                    
                </form>
            </div>
            <div className="container">
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