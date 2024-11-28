import React,{useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import NavBar from '../components/navBar';
import RatingBox from "../components/RatingBox";
import { useNavigate } from "react-router-dom";







const FindGamePage=()=>{
    const {game}=useParams();
    const navigate=useNavigate();

    const[gameData,setGameData]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(false);


    const handleClick=(id)=>{

      window.location.href = `/game-details/${id}`;



    }


    const loadGames = async () => {
        try {
          const response = await fetch(`http://localhost:3000/games/findGame/${game}`, {
            method: 'GET',
            credentials: 'include'
          });
      
          
          if (response.status === 204) {
            setError(true);
            console.log('No games');
            return;
          }
      
          
          if (response.ok) {
            const data = await response.json();
            setGameData(data);
            console.log('Games found:', data);
            if(error){
                setError(false)
            }
          } else {
            console.log('Unexpected status:', response.status);
          }
        } catch (e) {
          console.log('Fetch error:', e.message);
        } finally {
          setLoading(false);
        }
      };





    useEffect(()=>{
        loadGames();




        
    },[game]);

    console.log(error)


    return(
        <>
        <div className="find-games-container">
        <div>
            <NavBar></NavBar>

        </div>


        <div className="w-3/4 m-auto mt-20">


        <div>
            <h1 className="mb-4">Search Results for <span className="font-bold">"{game}"</span></h1>
            <hr />

        </div>
        {error ? (
  <div>
    <h1>No games found</h1>
  </div>
) : (
  gameData.length > 0 ? (
    
    gameData.map((g, index) => (
        <div className="flex w-7/12 items-start justify-between mb-4 mt-6 py-5 hover:bg-gray-100 cursor-pointer" onClick={()=>{handleClick(g.id)}} key={index}>
      
        <div className="flex-shrink-0">
          <img src={g.cover.replace('t_thumb', 't_cover_big')} alt={`${g.name} cover`} className="w-20 h-auto rounded-lg" />
        </div>
        <div className="flex flex-col justify-between ml-3">
          <h1 className="text-xl font-semibold">{g.name}</h1>
          <div>
            <h2 className="text-sm text-gray-500">{g.primaryPlatform}</h2>
          </div>
        </div>
      
        <div className="ml-auto self-end">
          <RatingBox rating={g.rating} />
          
        </div>
      
   
      </div>
      
    ))
  ) : (
    <div>
      <h1>Loading games...</h1>
    </div>
  )
)}
        

        
        
        </div>


       
       
       
         

        </div>

        
        
        
      
        </>
    )






}




export default FindGamePage;