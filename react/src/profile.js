import React from 'react'
import {useAuth} from './auth'
import { useNavigate } from 'react-router-dom'
import './profile.css'
const Profile = () => {
    const auth=useAuth()
    const navigate = useNavigate()
    const handlelogout=()=>{
        auth.logout()
        navigate('/')
    }
  return (
    <div>
      <div className='profile-body'>
        <h1>Welcome user</h1>
        <button onClick={handlelogout} >Logout</button>
      </div>
      <div className='footer'>
              <p>Developed using KNN Model fed with Movielens dataset</p>
          </div> 
    </div>
  )
}

export default Profile