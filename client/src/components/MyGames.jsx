import React,{useState,useContext,useEffect} from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from "./Context";


const MyGames = () => {
    const { user } = useContext(UserContext); 
    const [games, setGames] = useState([]); 
    const [loading, setLoading] = useState(true);

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





    

return(

   <>
   <div className="flex flex-row mt-10 gap-4"> 
   {!loading && games.map(g=>{




    return <div>
        <img src={g.cover.url.replace('t_thumb', 't_cover_big')} className="h-56 rounded-md" alt="" />
    </div>


   })}

   </div>

   
   
   
   
   </>
)








}

export default MyGames;






