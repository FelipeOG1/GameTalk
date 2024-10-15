import React,{useState,useContext,useEffect} from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from "./Context";









const MyGames=()=>{

    const { user } = useContext(UserContext);
    const[games,setGames]=useState([]);
    const[loading,setLoading]=useState(true);




    const  loadData= async ()=>{


        try{

            const response=await fetch('http://localhost:3000/myGames',{
                method:'GET',

                credentials:'include'
            })


            const data=await response.json();
            setGames(data);

           

            




        }catch(e){


            console.error(e.message)
        }finally{

            setLoading(false)

          

        }






    }




useEffect(()=>{


    loadData()
},[])
  

if(!loading){
    console.log(games);
}


    return(


        <>



  {user &&   <h1 className="text-3xl bg-yellow-300 text-center">{user.username}'s Favorite Games</h1>}


        <div className="flex gap-3 ">
            {!loading && games.map(g=>{

            return <div key={g.id} className='w-40 h-56 cursor-pointer transition-all duration-300 hover:brightness-90 hover:contrast-125' >
                <div>
                <img   src={g.cover.url.replace('t_thumb', 't_cover_big')} className='w-full h-full object-cover'></img>

                </div>

                <div>
                    <h1></h1>
                    <button className="border-2 "></button>

                </div>
            
            </div>
            })}



</div>
  




        

        
        
        
        
        
        </>
    )









}


export default MyGames