import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Intrests from "./intrests";
import Select from "react-select";
import axios from "axios";
import './signup.css'
const Signup = () =>{
       const navigate = useNavigate();
        const [user, setUser] = useState('');
        const [password, setPassword] = useState('');
        const [Name,setName] = useState('')
        const [age,setage] = useState('')
        const [selectedOptions, setSelectedOptions] = useState([]); 
        const [Signupsuccess,setSignupsuccess] = useState(true)
        const myData = [
            { label: 'Adventure', value: 1 },
            { label: 'Drama', value: 2 },
            { label: 'Thriller', value: 3 },
            { label: 'War', value: 4 },
            { label: 'Comedy', value: 5 },
            { label: 'Musical', value: 6 },
            { label: 'Fantasy', value: 7 },
            { label: 'Mystery', value: 8 },
            { label: 'Crime', value: 9 },
            { label: 'Animation', value: 10 },
            { label: 'Horror', value: 11 },
            { label: 'Film-Noir', value: 12 },
            { label: "Children's", value: 13 },
            { label: 'Film-Noir', value: 14 },
            { label: 'Action', value: 15 },
            { label: 'Sci-Fi', value: 16 },
            { label: 'Romance', value: 17 }
          ];
          const handleChange = (selectedOptions) => {
            setSelectedOptions(selectedOptions);
          };

        const userchange = (event) => {
            setUser(event.target.value);
          };
        
          const passwordchange = (event) => {
            setPassword(event.target.value);
          };
          const Namechange = (event) => {
            setName(event.target.value);
          };  
          const agechange = (event) => {
            setage(event.target.value);
          };  
        const handlesignup = async(event) =>{
            event.preventDefault();
            try{
                const selectedOptionValues = selectedOptions.map((option) => option.label); 
                const response = await axios.post('http://localhost:5000/signup',{
                    user,
                    password,
                    Name,
                    age,
                    selectedOptions: selectedOptionValues});
                    if (response.data === 'True') {
                        navigate('/');
                    }
                    else{
                        setSignupsuccess(false)
                    }
            }
            catch (error) {
                console.error('An error occurred:', error);
        }
    }

          return(
            <div>

              <div className="signup-body">
                <h1>Signup</h1>
                <form onSubmit={handlesignup}>
                <label>Username</label><br></br>
                <input type="text" value={user} onChange={userchange} required />
                <br></br>
                <label>Password</label><br></br>
                <input type="password" value={password} onChange={passwordchange} required /><br></br>
                <label>Name</label><br></br>
                <input type="text" value={Name} onChange={Namechange} required />
                <br></br>
                <label>Age</label><br></br>
                <input type="text" value={age} onChange={agechange} required />
                <h2>Select Your Interests:</h2>
                <Select 
                options={myData}
                isMulti
                onChange={handleChange}
                value={selectedOptions}
                />
                <br></br>
                <button type="submit">Submit Details</button>
                </form>
                {!Signupsuccess ? <p>UsernameAlready Exists</p> : ''}
                </div>
                <div className='footer'>
                    <p>Developed using KNN Model fed with Movielens dataset</p>
                </div>

                          
            </div>
          )


}

export default Signup