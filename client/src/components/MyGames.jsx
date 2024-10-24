import React,{useState,useContext,useEffect} from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from "./Context";



const MyGames = () => {
    const { user } = useContext(UserContext); 
    const [games, setGames] = useState([]); 
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate();





    const loadData = async () => {
        try {
            const response = await fetch('http://localhost:3000/myGames', {
                method: 'GET',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Error al obtener los juegos');
            }

            const data = await response.json();
            setGames(data); 

        } catch (e) {
            console.error(e.message);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        loadData(); 
    }, []);

    const goGamePage=(id)=>{


        navigate(`/game-details/${id}`);



    }

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


console.log(games.length)
    

return (
    <>
        <div className="relative w-full">

        <section className="mt-10">
            <div className="mb-3">
            <h1 className="text-2xl font-bold">My Games</h1>

            
        
       

            </div>
        
            <div id="game-carousel" className="flex flex-wrap pt-8 gap-3">
                {!loading && games.map(g => {
                    return (
                        <div key={g.id} className="flex-none ">
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

        

          
        </div>
    </>
);
};

export default MyGames;





