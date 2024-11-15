import React, {useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/Context";


   



function CreateAccount(){

     const { setUser } = useContext(UserContext);  
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const[userHolder,setUserHolder]=useState('');
    const[passHolder,setPassHolder]=useState('');
    const[emailHolder,setEmailHolder]=useState('');
    const [rePassword,setRePassword]=useState('');
    const[reHolder,setReHolder]=useState('');
    


    const navigate=useNavigate();


    function handleCLick(){


      navigate('/');



    }

    
    
   

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
    
      const validateForm = () => {
        const newErrors = {};
    
        if (!username){
            newErrors.username = 'Username is required'
            setUserHolder('Username is required');



        } 
        if (!email) {
          newErrors.email = 'Email is required';
          setEmailHolder('Email is required');
          
        } else if (!validateEmail(email)) {
          newErrors.email = 'Email is not valid';
          setEmail('');
          setEmailHolder('Email is not valid')


        }
        if (!password){
            newErrors.password = 'Password is required';
            setPassHolder('Password is required')


        } 
        if(!rePassword){
            newErrors.rePassword='Re-password is required';
            setReHolder('Re-password is required');
            
            
        }
        if(password!=rePassword){
          newErrors.noMatch='Passwords dont match';
          setReHolder('Passwords must match');
          setPassHolder('Passwords must match');
          setRePassword('');
          setPassword('');
          
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
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            
            
            
          },
          body: JSON.stringify({ username, email, password}),
          credentials:'include'
        });
  
        const data = await response.json();
        if(data=='0'){
          setEmail('');
          setEmailHolder('Email already exist');
        }else{
          setUser(data.user)
          navigate(`/new-avatar-page/${data.user.id}/${data.user.username}`);
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

        <div className="login-container">
        <h1 onClick={handleCLick} className=" cursor-pointer text-4xl font-bold mt-5 bg-black py-4 px-3 rounded hover:bg-cyan-500 duration-500 text-white">GameTalk</h1>
        
       

      <div className="flex flex-col w-96  justify-center  rounded-md game-shadow mt-5 text-black px-6">
      <form onSubmit={handleSubmit}>
      <h1 className="mt-4 font-semibold text-3xl">Create Account</h1>

      <div className="mb-3">

      <h2 className="font-semibold">Username</h2>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder={userHolder}
        className="w-full border-2 border-black rounded "
        

        
      />

      </div>

      <div className="mb-3">

      <h1 className="font-semibold">Email</h1>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={emailHolder}
        className="w-full border-2 border-black rounded"

       
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
        className="w-full rounded border-2 border-black"
        
       
    
        
      />

      </div>

      <div className="mb-3">

<h1 className="font-semibold">Re-enter password</h1>
<input
 
  type="password"
  name="rePassword"
  value={rePassword}
  onChange={(e) => setRePassword(e.target.value)}
  placeholder={reHolder}
  className="w-full rounded border-2 border-black"
  
 

  
/>

</div>
      <div className="pb-4"> 
      <button className="w-full text-center text-white bg-black cursor-pointer hover:bg-cyan-300 duration-500 font-semibold rounded " type="submit">Register</button>


      </div>
     
    </form>



        </div>


            





        </div>
        
        
        
        
        
        </>
    )





    
}



export default CreateAccount;