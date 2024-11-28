import React, { useState,useEffect } from "react";
import { useFetcher,useNavigate } from "react-router-dom";







const MyReviews=()=>{

    const [reviews,setReviews]=useState([]);
    const [loading,setLoading]=useState(true);

    const navigate=useNavigate();


    const goGamePage=(id)=>{


        navigate(`/game-details/${id}`);


    }

    const getBackgroundColor = (roundedRating) => {
        if (roundedRating >= 75 && roundedRating<=90) return 'bg-cyan-500';
        if (roundedRating >= 50 && roundedRating<=75) return 'bg-cyan-700';
        if(roundedRating >=90) return 'bg-cyan-300';
        return 'bg-cyan-900';
    };

   

      
    const loadReviews=async ()=>{


        try {
                const response = await fetch('http://localhost:3000/reviews/myReviews', {
                method: 'GET',
                credentials: 'include'
            });

            const data=await response.json();
            setReviews(data);
            console.log(data);




        





    }catch(e){
        console.log(e.message);

    }finally{
        setLoading(false);
    }


    }







    useEffect(()=>{

loadReviews();
    },[])

console.log(reviews);

    return(
        <>


         <div className="relative w-full">

        <section className="mt-10">
            <div className="mb-3">
            <h1 className="text-2xl font-bold mb-3">My Reviews</h1>
            <hr />

            
        

            </div>
        
            <div className="flex flex-wrap pt-8 gap-25">
                {!loading && reviews.length>0? reviews.map((g,index)=> {
                    return (
                        <div key={index} className="flex-none bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl mr-4 mb-4">
                            <div className="relative flex-col justify-center items-center ml-16 mb-3">
                                <img onClick={() => { goGamePage(g.game_id) }} src={g.cover_url.replace('t_thumb', 't_cover_big')} className="h-56 rounded-md mb-1 cursor-pointer " alt={g.game_name} />
                                <h1 onClick={() => { goGamePage(g.game_id) }} className="game-title">{g.game_name}</h1>
                            </div>
                            

                            <div className="mb-3">
                                <audio  src={g.audio_url}   controls />
                            </div>
                            <div className="relative flex justify-center items-center">
                                <div className={`h-12 w-12 ${ getBackgroundColor(g.score)} flex justify-center items-center rounded-md py-5 px-5`}>
                                    <div className='text-center text-white font-semibold text-2xl'>{g.score}</div>
                                </div>

                            </div>
                        </div>
                    );
                }):!loading && <div> 
                    
                    <h1 className="text-2xl font-bold text-black opacity-60"></h1>     
                    </div>}
            </div>



        </section>

        

          
        </div>
        
       
           
        
        
        
        </>




        
    )








}



export default MyReviews