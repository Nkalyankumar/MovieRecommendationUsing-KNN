import React from 'react'
import {useNavigate} from 'react-router-dom'
import './home.css'
const Home = () =>{
    const navigate= useNavigate()
    return(
        <div>
            <div className='main-content'>
            <div>
            <h1>Movie Recommendation System</h1>
            <p>Please do login or signup</p>
            </div>
            </div>
            <div className='footer'>
                <p>Developed using KNN Model fed with Movielens dataset</p>

            </div>
        </div>
    )
}

export default Home;