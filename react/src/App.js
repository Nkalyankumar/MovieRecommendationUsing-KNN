
import './App.css';
import Navbar from './nav';
import {Routes,Route} from 'react-router-dom'
import Home from './Home';
import Login from './login';
import MainPage from './Mainpage';
import History from './history';
import Intrests from './intrests';
import Profile from './profile';
import { AuthProvider } from './auth';
import Signup from './signup';
function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path = '/' element = {<Home/>}></Route>
        <Route path = '/login' element = {<Login/>}></Route>
        <Route path = '/mainpage' element = {<MainPage/>}></Route>
        <Route path = "/history" element = {<History/>}></Route>
        <Route path = "/intrests" element = {<Intrests/>}></Route>
        <Route path = "/profile" element = {<Profile/>}></Route>
        <Route path = '/mainpage' element = {<MainPage/>}></Route>
        <Route path = '/signup' element = {<Signup/>}></Route>
      </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
