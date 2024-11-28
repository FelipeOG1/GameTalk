import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';



function ConsoleGames(){
    const [covers,setCovers]=useState([]);
    const navigate=useNavigate();
    const [authState,setAuthState]=useState(false);
    const [loading, setLoading] = useState(true);


    function goGamePage(id){

        
        window.location.href = `/game-details/${id}`;

    

    }
 
      async function loadCovers() {
  
        try{
  
  
          const response=await fetch('http://localhost:3000/games/consoleGames', {
            method: 'GET',
            credentials: 'include'
          });
  
          const data= await response.json();
  
            setCovers(data);
            
  
          
  
        }catch(e){
          console.log(e);
  
        }finally{
          setLoading(false)
        }
        
      }

  
    
  
  
  
    useEffect(()=>{
      loadCovers();
    },[])

    const getBackgroundColor = (roundedRating) => {
      if (roundedRating >= 75 && roundedRating<=90) return 'bg-cyan-500';
      if (roundedRating >= 50 && roundedRating<=75) return 'bg-cyan-700';
      if(roundedRating >=90) return 'bg-cyan-300';
      return 'bg-cyan-900';
  };

  const roundedRating=(rating)=>{
      return parseFloat(rating.toFixed(0));
    
    }

    const favorableState=(rating)=>{
      if (rating >= 75 && rating<=90) return 'Generally Favorable';
      if (rating >= 50 && rating<=75) return 'Mixed';
      if(rating >=90) return 'Favorable';
  
     

    }

    const scrollLeft = () => {
      document.getElementById('game-carousel').scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
      document.getElementById('game-carousel').scrollBy({ left: 300, behavior: 'smooth' });
  };





    
  
  
  
  
  
  
  return(
  
    <section className='w-full relative'>
    
    <div className="absolute right-3 top-3 flex gap-2 z-10">
       
        <button className="bg-black bg-opacity-50 text-white p-2 rounded-full" onClick={scrollLeft}>
            ←
        </button>
        <button className="bg-black bg-opacity-50 text-white p-2 rounded-full" onClick={scrollRight}>
            →
        </button>
    </div>
    
  
    <div id="game-carousel" className="flex overflow-x-auto no-scrollbar pt-8 gap-3">
        {!loading && covers.map(g => {
            return (
                <div key={g.id} className="flex-none">
                    <div className="image-container relative">
                        <img onClick={() => { goGamePage(g.id) }} src={g.cover.url.replace('t_thumb', 't_cover_big')} className="h-56 rounded-md" alt={g.name} />
                    </div>
                    <h1 onClick={() => { goGamePage(g.id) }} className="game-title">{g.name}</h1>
                    <div className="flex flex-row">
                        <div className={`h-3 w-3 ${g.rating ? getBackgroundColor(g.rating) : getBackgroundColor(0)} flex justify-center items-center rounded-md py-5 px-5`}>
                            <div className='text-center text-white font-semibold text'>{g.rating ? roundedRating(g.rating) : 'N/A'}</div>
                        </div>
                        <h1 className="text-xs text-center my-auto">{g.rating ? favorableState(roundedRating(g.rating)) : 'No ratings'}</h1>
                    </div>
                </div>
            );
        })}
    </div>
    
</section>
      
  
  
    
  
  
    
  )
    
  




}


export default ConsoleGames

