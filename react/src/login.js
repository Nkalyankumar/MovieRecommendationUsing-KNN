import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth';
import axios from 'axios';
import './login.css'


const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [lis, setLis] = useState(true);
  const auth = useAuth();

  const userchange = (event) => {
    setUser(event.target.value);
  };

  const passwordchange = (event) => {
    setPassword(event.target.value);
  };

  const handlelogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        user,
        password,
      });

      if (response.data === 'True') {
        auth.login(user);
        navigate('/mainpage');
      } else {
        setLis(false);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <div className='login-body'>
        <div className='login-form'>
        <h1>LOGIN</h1>
        <br></br>
        <br></br>
          <form onSubmit={handlelogin} action = "{{ url_for('login')}}">
            <label>Username</label><br></br>
            <input type="text" value={user} onChange={userchange} required />
            <br></br>
            <label>Password</label><br></br>
            <input type="password" value={password} onChange={passwordchange} required /><br></br>
            <button type="submit">Login</button>
          </form>
          {!lis ? <p>Invalid user and password</p> : ''}
          <h3>If you don't have an account</h3>
          <a href='signup'>Signup</a>
        </div>
    </div>
    <div className='footer'>
      <p>Developed using KNN Model fed with Movielens dataset</p>
    </div>
    </div>
  );
};

export default Login;


