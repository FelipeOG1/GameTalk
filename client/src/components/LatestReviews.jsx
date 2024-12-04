import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";


const LatestReviews = ({ gameName, gameId, setAverageScore, setNumberReviews }) => {
  const [reviews, setReviews] = useState([]);
  
  const [latestReviews,setLatestReviews]=useState([]);
  const navigate=useNavigate();

  const viewAllReviews=()=>{


navigate(`/allReviews/${gameId}/${gameName}`);



  }
  const handleReviews = async (gameId) => {
    try {
      const response = await fetch(`http://localhost:3000/reviews/gameReview/${gameId}`, {
        credentials: 'include',
      });

      const data = await response.json();
      let arr = [];

      const rev=data.data;

      console.log(data.data)

      if(rev){
        for (let i = 0; i <= 2; i++) {
          if (rev[i] && rev[i].avatar_url) {
            arr.push(rev[i]);
          }
        }
        setLatestReviews(arr);
        setReviews(rev);
        setAverageScore(data.averageScore);
        setNumberReviews(data.numberReviews);
   

        

      }

     
      


        
    } catch (e) {
      console.log(e.message);
    }
  };



  useEffect(() => {
    if (gameId) {
      handleReviews(gameId);
    }
  }, [gameId]); 

  


  const getBackgroundColor = (roundedRating) => {
    if (roundedRating >= 75 && roundedRating<=90) return 'bg-cyan-500';
    if (roundedRating >= 50 && roundedRating<=75) return 'bg-cyan-700';
    if(roundedRating >=90) return 'bg-cyan-300';
    return 'bg-cyan-900';
};

  









  return (

<section className='w-full'>



    
<div className='flex flex-row gap-20 flex-wrap'>
    {latestReviews.length>0? latestReviews.map((r,index)=>{
      return <div key={index}  className="mt-4 w-80 pb-5 flex-flex rounded-md game-shadow">

      <div className="flex flex-row items-center gap-3 mb-4">
      <div className="w-20 h-20 overflow-hidden rounded-full bg-yellow-400 my-auto">
          <div className="relative h-full w-full">
            <img src={r.avatar_url} alt="Avatar" />
          </div>
        </div>
      <h1 className="font-semibold text-xl">{r.username}</h1>

      </div>


      <div>
      <audio src={r.audio_url}  controls />
      </div>
      
      
      <div className="flex justify-center align-middle mt-4">

      <div className={`h-12 w-12 ${getBackgroundColor(r.score)} flex justify-center items-center rounded-md py-5 px-5`}>

    <div className='text-center text-white font-semibold text-2xl'>{r.score}</div>

</div>
        
      </div>


      


    </div>
   



    }): <div>
      
 <h1 className="text-2xl font-bold text-black opacity-60">Be the First one to Talk About this Game!</h1>     
      </div>}

    </div>

    
    { reviews.length>3 && <div className="mt-2 flex justify-end">
      <h1 onClick={viewAllReviews} className="cursor-pointer hover:underline">View All Reviews</h1>
    </div>
 }
    

    


    


</section>
 
   
  )
};

export default LatestReviews;