import React, { useState, useEffect } from "react";
import axios from "axios";
import './mainpage.css'

const MainPage = () => {
  const [data1, setData1] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch('/mainpage')
      .then((response) => response.json())
      .then((data) => {
        setData1(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const handlePlayClick = (item) => {
    setHistory([...history, item[2]]);  
    const senddata = async () => {
      const response = await axios.post('/addtohistory', {
        'history_data': item[2] 
      });
    }
    senddata();
  };
  

  return (
    <div>
      <div className="main-pagebody">
        <h1>Welcome!! Content Recomended For You</h1>
        {data1.map((item, index) => (
          <div key={index} className="content">
            <strong><p>{item}</p></strong>
            <button onClick={() => handlePlayClick(item)}>Play</button>
          </div>
        ))}
      </div>
        <div className='footer'>
          <p>Developed using KNN Model fed with Movielens dataset</p>
        </div>
    </div>
  );
};

export default MainPage;
