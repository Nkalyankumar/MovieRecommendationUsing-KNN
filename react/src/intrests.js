import React from "react";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import Select from "react-select";
const Intrests = () => {
    const navigate = useNavigate();
    const myData = [
      { label: 'Books', value: 1 },
      { label: 'Movies, Music & Games', value: 2 },
      { label: 'Electronics & Computers', value: 3 },
      { label: 'Home, Garden & Tools', value: 4 },
      { label: 'Health & Beauty', value: 5 },
      { label: 'Toys, Kids & Baby', value: 6 },
      { label: 'Clothing & Jewelry', value: 7 },
      { label: 'Sports & Outdoors', value: 8 },
      { label: 'Automotive & Industrial', value: 9 }
    ];
  
    const handleChange = (selectedOptions) => {
      // Handle the selected options here
      console.log("Selected Options:", selectedOptions);
    };
  
    return (
      <div>
        <h2>Select Your Interests:</h2>
        <Select
          options={myData}
          isMulti
          onChange={handleChange}
        />
        {/* Add a button or other UI elements to proceed */}
        <button onClick={() => navigate('/next-page')}>Next</button>
      </div>
    );
  };
  
  export default Intrests;
  