import React,{useState,useContext} from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from "./Context";




function NavBar(props){


  const { user } = useContext(UserContext);
   





  const nav=useNavigate();



  const handleClick=(e)=>{

    if(e.target.id=='gameLogo'){
      nav('/');
    }else{
      nav('/login');

    }



   
  }


 return(
  <>
  <nav className="p-5 bg-black flex md:items-center md:justify-between text-white">
    <div>

      <span className="cursor-pointer hover:text-cyan-500 duration-500">
        <h1 onClick={handleClick} className="text-4xl font-bold mb-2" id="gameLogo">GameTalk</h1>
      </span>

    </div>

   <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-black w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
    

    <li className="mx-4 my-6 md:my-0">
    {user && <a href="/MyProfile" className="text-xl hover:text-cyan-500 duration-500">My Profile</a>}
    </li>

    <li className="mx-4 my-6 md:my-0">
      <a href="#" className="text-xl hover:text-cyan-500 duration-500">Latest Reviews</a>
    </li>

    <button onClick={handleClick}className="bg-cyan-400 text-white duration-500 px-4 py-2 mx-4 hover:bg-cyan-500 rounded">{user? `Welcome, ${user.username}`: `Sign In`}</button> 
   </ul>
   

    
  </nav>
  
  
  </>
 )

}


export default NavBar;