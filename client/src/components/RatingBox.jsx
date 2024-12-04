import React, {useEffect, useState} from "react";







const RatingBox=(props)=>{


    const roundedRating=Math.round(props.rating);

    const getBackgroundColor = (roundedRating) => {
        if (roundedRating >= 75 && roundedRating<=90) return 'bg-cyan-500';
        if (roundedRating >= 1 && roundedRating<=75) return 'bg-cyan-700';
        if(roundedRating >=90) return 'bg-cyan-300';
        return 'bg-white';
    };

    const favorableState=(rating)=>{
        if (rating >= 75 && rating<=90) return 'Generally Favorable';
        if (rating >= 50 && rating<=75) return 'Mixed';
        if(rating >=90) return 'Universal Acclaim';
    
       
  
      }
  


    return(


       
        <div className={`h-16 w-16 ${props.rating== null  ? `border-2 border-gray-400 ${getBackgroundColor(0)}` : getBackgroundColor(roundedRating)} flex justify-center items-center rounded-md`}>
        <div className={`text-center font-semibold ${props.rating == null ? 'text-4xl font-bold text-black' : 'text-4xl text-white'}`}>
          {props.rating ==null ? 'tbd' : roundedRating}
        </div>
      </div>
       
    )




}




export default RatingBox;