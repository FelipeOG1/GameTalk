import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';






const UpComingGames=(props)=>{

    const [covers,setCovers]=useState([]);
    const navigate=useNavigate();

    const [loading, setLoading] = useState(true);

    function goGamePage(id){
        window.location.href = `/game-details/${id}`;

    

    }

    const scrollLeft = () => {
        document.getElementById('game-carousel3').scrollBy({ left: -300, behavior: 'smooth' });
    };
  
    const scrollRight = () => {
        document.getElementById('game-carousel3').scrollBy({ left: 300, behavior: 'smooth' });
    };
  
  
   


    useEffect(()=>{


        setCovers(props.covers);
      },[])
      console.log(covers);
    


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
    
  
    <div id="game-carousel3" className="flex overflow-x-auto no-scrollbar pt-8 gap-3">
        {covers.map(g => {
            return (
                <div key={g.id} className="flex-none">
                    <div className="image-container relative">
                        <img onClick={() => { goGamePage(g.id) }} src={g.cover.url.replace('t_thumb', 't_cover_big')} className="h-56 rounded-md" alt={g.name} />
                    </div>
                    <h1 onClick={() => { goGamePage(g.id) }} className="game-title">{g.name}</h1>
                    
                </div>
            );
        })}
    </div>
    
</section>
      
  
  
    
)


}


export default UpComingGames;