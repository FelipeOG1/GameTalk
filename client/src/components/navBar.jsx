import React,{useState,useContext,useEffect} from "react";
import {  useNavigate } from 'react-router-dom';
import { UserContext } from "../components/Context";





function NavBar(props){


  const { user, logout } = useContext(UserContext);
  const [game, setGame]=useState('');
  const navigate=useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  
   

  const handleChange=(e)=>{

    setGame(e.target.value);




  } 









const handleKeyDown=(e)=>{

  if(e.key=='Enter' && game.length>0){
    console.log(game);



    navigate(`/findGame/${game}`);



  }
}


  const nav=useNavigate();



    const handleClick = (e) => {
      console.log(e.target.id);

      if(e.target.id=='btn-login'){

        nav('/login')
      }else if(e.target.id=='btn-logout'){
        console.log(e.target.id);
        logout();
        nav('/');
        
      }else{
      nav('/');
      }
      
    
    }
   


  

  
  


 return(
  <>
  
    <nav className="p-5 bg-black flex items-center justify-between text-white">
      <div>
        <span className="cursor-pointer hover:text-cyan-500 duration-500">
          <h1 onClick={handleClick} className="text-4xl font-bold mb-2" id="gameLogo">GameTalk</h1>
        </span>
      </div>

      <div className="form__group field">
    <input type="input" className="form__field" placeholder="Name" required="" onChange={handleChange} onKeyDown={handleKeyDown} />
    <label  className="form__label">Find a Game</label>
    
</div>
  

    
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden block text-white  z-40"
      >
  
        {isMenuOpen ? (
        <img className="fas fa-times object-fit h-10 w-10 " src="logos/menu.png" alt="" />
        ) : (
          <img className="fas fa-times object-fit h-10 w-10 " src="logos/menu.png" alt="" />
        )}
      </button>

  
      <ul
        className={`md:flex md:items-center md:static absolute bg-black w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 transition-all ease-in duration-500 ${
          isMenuOpen ? 'top-0 opacity-100' : 'top-[-400px] opacity-0'
        }`}
      >
        {user && (
          <li className="mx-4 my-6 md:my-0">
            <a href="/MyProfile" className="text-xl hover:text-cyan-500 duration-500">
              My Profile
            </a>
          </li>
        )}

        <li className="mx-4 my-6 md:my-0">
          <a href="/latestReviewsPage" className="text-xl hover:text-cyan-500 duration-500">
            Latest Reviews
          </a>
        </li>

        {user ? (
          <li className="mx-4 my-6 md:my-0">
            <button
             id="btn-logout"
              onClick={handleClick}
              className="bg-cyan-400 text-white duration-500 px-4 py-2 mx-4 hover:bg-cyan-500 rounded"
            >
              Log Out
            </button>
          </li>
        ) : (
          <li className="mx-4 my-6 md:my-0">
            <button
             id="btn-login"
              onClick={handleClick}
              className="bg-cyan-400 text-white duration-500 px-4 py-2 mx-4 hover:bg-cyan-500 rounded"
            >
              Sign In
            </button>
          </li>
        )}
      </ul>
    </nav>
  
  </>
)}




export default NavBar;