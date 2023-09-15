import React, { useState, useEffect } from "react";
import './history.css'

const History = () => {
    const [data1, setData1] = useState([]);

    useEffect(() => {
        fetch('/history')
        .then((response) => response.json())
        .then((data12) => {
            setData1(data12); 
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, []); 

    return (
        <div>
            <div className="history-body">
                <h1>The Content You Watched before</h1>
                {
                (() => {
                    const elements = [];
                    for (let i = 0; i < eval(data1).length; i++) {
                    elements.push(<strong><p>MOVIECONTENT:   {i+1}</p><p key={i} className="history-element">{eval(data1)[i]}</p></strong>);
                    }
                    return elements;
                })()
                }
            </div>
            <div className='footer'>
                <p>Developed using KNN Model fed with Movielens dataset</p>
            </div>
        </div>  
    );};

export default History;




