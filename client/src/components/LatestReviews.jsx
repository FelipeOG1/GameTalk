import React, {useEffect, useState} from "react";


const LatestReviews = (props) => {
  const [reviews, setReviews] = useState([]);

  const handleReviews = async (gameId) => {
    try {
      const response = await fetch(`http://localhost:3000/gameReview/${gameId}`, {
        credentials: 'include',
      });

      const data = await response.json();
      if(data){
        setReviews(data);

      }
     
    } catch (e) {
      console.log(e.message);
    }
  };


  useEffect(() => {
    if (props.gameId) {
      handleReviews(props.gameId);
    }
  }, [props.gameId]); 
console.log(reviews)

  const getBackgroundColor = (roundedRating) => {
    if (roundedRating >= 75 && roundedRating<=90) return 'bg-cyan-500';
    if (roundedRating >= 50 && roundedRating<=75) return 'bg-cyan-700';
    if(roundedRating >=90) return 'bg-cyan-300';
    return 'bg-cyan-900';
};

  









  return (

<section className='w-full'>



    
<div className='flex flex-row gap-20 flex-wrap'>
    {reviews.length>0 && reviews.map(r=>{
      return <div className="mt-4 w-80 pb-5 flex-flex rounded-md game-shadow">

      <div className="flex flex-row items-center gap-3 mb-6">
      <div className={`h-13 w-10 ${getBackgroundColor(r.score)} flex justify-center items-center rounded-md py-2 px-6`}>

     <div className='text-center text-white font-semibold text-2xl'>{r.score}</div>

      </div>

      <h1 className="font-semibold text-xl">{r.username}</h1>

      </div>


      <div>
      <audio src={r.audio_url}  controls />
      </div>


    </div>



    })}

    </div>


    


  



</section>




    
    
   
  )
};

export default LatestReviews;