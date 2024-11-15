import React,{useState,useContext,useEffect} from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from "../components/Context";





function NavBar(props){


  const { user } = useContext(UserContext);
  const [game, setGame]=useState('');
  const navigate=useNavigate();

  
   

  const handleChange=(e)=>{

    setGame(e.target.value);




  } 









const handleKeyDown=(e)=>{

  if(e.key=='Enter'){
    console.log(game);



    navigate(`/findGame/${game}`);



  }
}


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

    <div class="form__group field">
    <input type="input" class="form__field" placeholder="Name" required="" onChange={handleChange} onKeyDown={handleKeyDown} />
    <label for="name" class="form__label">Find a Game</label>
</div>
   <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-black w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
    

    <li className="mx-4 my-6 md:my-0">
    {user && <a href="/MyProfile" className="text-xl hover:text-cyan-500 duration-500">My Profile</a>}
    </li>

    <li className="mx-4 my-6 md:my-0">
      <a href="#" className="text-xl hover:text-cyan-500 duration-500">Latest Reviews</a>
    </li>

    {user? <button onClick={handleClick}
  className="group flex items-center justify-start w-11 h-11 bg-cyan-500 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
>
  <div
    className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3"
  >
    <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
      <path
        d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
      ></path>
    </svg>
  </div>
  <div
    className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
  >
    Logout
  </div>
</button>
:<button onClick={handleClick}className="bg-cyan-400 text-white duration-500 px-4 py-2 mx-4 hover:bg-cyan-500 rounded">Sign In</button> 
}

   </ul>
   

    
  </nav>
  
  
  </>
)}




export default NavBar;