import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';



function GameList(){
    const [covers,setCovers]=useState([]);
    const navigate=useNavigate();
    const [authState,setAuthState]=useState(false);

    function handleClick(id){
        navigate(`/game-details/${id}`);

    

    }
 
      async function loadCovers() {
  
        try{
  
  
          const response=await fetch('http://localhost:3000/games', {
            method: 'GET',
            credentials: 'include'
          });
  
          const data= await response.json();
  
            setCovers(data.games);
            setAuthState(data.authState);
  
          
  
        }catch(e){
          console.log(e);
  
        }
        
      }
  
  
    
  
  
  
    useEffect(()=>{
      loadCovers();
    },[])

    console.log(covers);



    
  
  
  
  
  
  
  return(
  
    <section className='w-full'>
      <h1 className=' font-gaming text-5xl text-white text-center mb-5 pt-3'>Find a Game</h1>
  
      <div className='flex flex-row gap-5 flex-wrap w-9/12 m-auto'>
        {covers.map(c=>{
          
          return <div key={c.id} className='w-40 h-56 cursor-pointer transition-all duration-300 hover:brightness-90 hover:contrast-125' >
            <img onClick={()=>{handleClick(c.id)}}  src={c.cover.url.replace('t_thumb', 't_cover_big')} className='w-full h-full object-cover'></img>
          </div>
            
          
        })}
  
  
  
      </div>
      
  
  
    </section>
  
  
    
  )
    
  




}


export default GameList

