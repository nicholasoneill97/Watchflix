
//import useState for search input
import { useState } from "react";

//import search icon
import { FaSearch } from "react-icons/fa";



export const SearchBar = () => {

  //initializes input set to an empty string
  const [input, setInput] = useState("");


  //handles change of input and sets the data to be fetched to the value inputted
  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className='flex flex-row justify-center absolute top-[20%] right-[50%]'>
      <FaSearch className="text-white"/>
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        className="mx-auto block text-center absolute "
      />
    </div>
  );
};