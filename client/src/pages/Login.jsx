import React, {useState,useContext} from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../components/Context";

   



function Login(){


    const { setUser } = useContext(UserContext);     
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const[passHolder,setPassHolder]=useState('');
    const[emailHolder,setEmailHolder]=useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    


    const navigate=useNavigate();


    function handleCLick(e){


      

      if(e.target.id=='homeButton'){
        navigate('/');
      }else{
        navigate('/register');
      }

      


    }

    
    
   

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
    
      const validateForm = () => {
        const newErrors = {};
    
        
        if (!email) {
          newErrors.email = 'Email is required';
          setEmailHolder('Email is required');
          
        } else if (!validateEmail(email)) {
          newErrors.email = 'Email is not valid';
          setEmail('');
          



        }
        if (!password){
            newErrors.password = 'Password is required';
            setPassHolder('Password is required')
            


        } 
    
        setErrors(newErrors);
  
        return Object.keys(newErrors).length === 0;
      };
  
    const handleSubmit = async (e) => {
    
      e.preventDefault();

      if (!validateForm()) {
        return;
      }
  
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });

        const data = await response.json();
        if (response.ok) {
          
          
          setUser(data.user);
        
          navigate('/');
            
      
        } else {
            
            if (data.error === 'Invalid credentials') {
              setErrorMessage('Incorrect username or password');

            } else {
              setErrorMessage('Incorrect username or password');
            }
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
    }
    };

    
    const getInputClass = (field) => {
        return errors[field] ? 'input-error' : '';
      };
      



    return(

        <>
        <div className="">

        </div>

        <div className="login-container">
        <h1 onClick={handleCLick} className=" cursor-pointer text-4xl font-bold mt-5 bg-black py-4 px-3 rounded hover:bg-cyan-500 duration-500 text-white" id="homeButton">GameTalk</h1>
        
       

      <div className="flex flex-col w-96  justify-center  rounded-md game-shadow mt-5 text-black px-6">
      <form onSubmit={handleSubmit}>
      <h1 className="mt-4 font-semibold text-3xl">Sign in</h1>

    
      <div className="mb-3">

      <h1 className="font-semibold">Email</h1>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={emailHolder}
        className="w-full rounded bg-cyan-100"
       
      />


      </div>
     
     
      <div className="mb-3">

      <h1 className="font-semibold">Password</h1>
      <input
       
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={passHolder}
        className="w-full rounded bg-cyan-100"
        
       
    
        
      />

      </div>

      <div className="mb-6">
      <button  className="w-full text-center text-white bg-cyan-300 cursor-pointer hover:bg-cyan-400 duration-500 font-semibold rounded py-1  " type="submit" id="loginButton">Sign in</button>

      </div>
     

      
     
    </form>

    {errorMessage && (
                    <div className="mt-1 text-red-500 text-sm font-semibold text-center">
                        {errorMessage}
                    </div>
                )}


    <div className="mb-5">
        <p className="text-sm text-center mb-2">New to GameTalk?</p>
        <button onClick={handleCLick}  className="w-full text-center text-white bg-black cursor-pointer hover:bg-cyan-500 duration-500 font-semibold rounded py-1 text-sm" type="submit" id="registerButton">Create account</button>

      </div>



        </div>


            





        </div>
        
        
        
        
        
        </>
    )





    
}



export default  Login;