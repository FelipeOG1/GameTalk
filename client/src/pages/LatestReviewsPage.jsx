import {React,useState,useEffect, Fragment} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import NavBar from "../components/navBar";
import Footer from "../components/Footer";








const LatestReviewsPage=()=>{

    const [reviews,setReviews]=useState([]);
    const[loading,setLoading]=useState(false);

    const navigate=useNavigate();


    const goGamePage=(id)=>{


        navigate(`/game-details/${id}`);

    }


    const loadLatestReviews=async ()=>{

        try{

            const response=await fetch('http://localhost:3000/reviews/latestReviews',{

                credentials: 'include'
            })
    
    
            const data=await response.json();
    
            setReviews(data);
    


        }catch(e){
            console.log(message.error);
        }finally{
            setLoadingloading(false);
        }

       

    }


    useEffect(()=>{

        loadLatestReviews();
    },[])

    const getBackgroundColor = (roundedRating) => {
        if (roundedRating >= 75 && roundedRating<=90) return 'bg-cyan-500';
        if (roundedRating >= 50 && roundedRating<=75) return 'bg-cyan-700';
        if(roundedRating >=90) return 'bg-cyan-300';
        return 'bg-cyan-900';
    };












    return(


        <Fragment>

            <div className="latest-reviews-container">

                <div>
                    <NavBar/>

                </div>

            <div className='w-3/5 m-auto mt-20'>

            <div>
                <h1 className="mb-3 text-3xl font-bold">Latest Reviews GameTalk Reviews</h1>
                <hr />
            </div>

            <div className="flex flex-wrap pt-8 gap-25">
                {!loading && reviews.length>0? reviews.map((g,index)=> {
                    return (
                        <div key={index} className="flex-none bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl mr-4 mb-4">

<div className="flex flex-row items-center gap-3 mb-4">
      <div className="w-20 h-20 overflow-hidden rounded-full bg-cyan-500 my-auto">
          <div className="relative h-full w-full">
            <img src={g.avatar_url} alt="Avatar" />
          </div>
        </div>
      <h1 className="font-semibold text-xl">{g.username}</h1>

      </div>



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
                }):!loading  &&  <div> 
                    
                    <h1 className="text-2xl font-bold text-black opacity-60">You havent reviewed any Game yet!</h1>     
                    </div>}
            </div>






            
            
            
            
            </div>




            </div>

            <div>
        <Footer/>
      </div>
        </Fragment>
    )



}



export default LatestReviewsPage;