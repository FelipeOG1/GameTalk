import { useState,useEffect, Fragment} from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/navBar";

import Footer from "../components/Footer";


const AllReviews=()=>{

    const[allReviews,setAllReviews]=useState();
    const[loading,setLoading]=useState(false);
    


    
    const {id}=useParams();
    const{gameName}=useParams();

    const loadReviews=async()=>{
        


        const response=await fetch(`http://localhost:3000/reviews/allGameReviews/${id}`,{
            credentials: 'include',
          })


          const data=await response.json();
          setAllReviews(data);



        
    }




useEffect(()=>{

    loadReviews();
    


},[])

const getBackgroundColor = (roundedRating) => {
    if (roundedRating >= 75 && roundedRating<=90) return 'bg-cyan-500';
    if (roundedRating >= 50 && roundedRating<=75) return 'bg-cyan-700';
    if(roundedRating >=90) return 'bg-cyan-300';
    return 'bg-cyan-900';
};




    return(
        
        <Fragment>



            <div className="reviews-page-container">

                <NavBar></NavBar>


            <div className='w-3/4 m-auto mt-20'>


                <div>
                <h1 className="mb-3 text-3xl font-bold">All {gameName} reviews</h1>
                <hr />
                </div>


                <div className='flex flex-row gap-20 flex-wrap'>


                    {allReviews && allReviews.map((r,index)=>{


                            return <div className="mt-4 w-80 pb-5 flex-flex rounded-md game-shadow">



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
                    })}

                    



                    
                </div>
               

           


            
            
            
            
            
            
            
            
            
            </div>










            </div>



            <Footer/>
         



        </Fragment>
        
        
    
    )




}




export default AllReviews;