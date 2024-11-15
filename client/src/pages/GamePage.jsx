import { useState,useEffect, Fragment,useContext } from 'react'
import { useParams } from 'react-router-dom';
import AllPlatforms from '../components/AllPlatforms';
import Login from './Login';
import RatingBar from '../components/RatingBar';
import NavBar from '../components/navBar';
import AudioRecorder from '../components/AudioRecorder';
import TalkAbout from './TalkAboutPage';
import LatestReviews from '../components/LatestReviews';
import AddGameButton from '../components/AddGameButton';
import { UserContext } from "../components/Context";








function GamePage(){
    const {id}=useParams();
    const { user } = useContext(UserContext); 
    const [gameData,setGameData]=useState([]);

    const [loading,setLoading]=useState(true);
    
    const[isFavorite,setIsFavorite]=useState(false);
    const [primaryPlatform,setPrimaryPlatform]=useState('');
    const [releaseDate,setReleaseDate]=useState('');
    const [platforms,setPlatforms]=useState([]);



    async function handleSubmit(e){


        try{

            const response = await fetch('http://localhost:3000/addGame', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  
                  
                  
                },
                body: JSON.stringify({ id }),
                credentials:'include'
              });

            


        }catch(e){

            console.error(e);


        }finally{

        }



        console.log(e.target);



    }


    async function loadData(){


        try{
            const response = await fetch(`http://localhost:3000/game-details/${id}`, {
                method: 'GET',
                credentials: 'include'  
            });
            const data = await response.json();
            
           setGameData(data.gameDetails[0]);
           setIsFavorite(data.isFavorite);
           setPrimaryPlatform(data.primaryPlatform);
           setReleaseDate(data.releaseDate)
           setPlatforms(data.platforms)
         
            
           


           


        }catch(e){

            console.error(e.message);



        }finally{

            setLoading(false);
        }



    }


    
    


   useEffect(()=>{
    loadData();
    
    
   },[id]);

console.log(platforms)
   

if(user){
    console.log(user.id);
}




   


  
   const roundedRating = gameData.rating ? parseFloat(gameData.rating.toFixed(0)) : null;

   const mainPlatform = gameData.platforms && !loading
    ? (gameData.platforms[0].name.startsWith('PC') ? 'PC' : gameData.platforms[0].name)
    : null;


    const getBackgroundColor = () => {
        if (roundedRating >= 75 && roundedRating<=90) return 'bg-cyan-500';
        if (roundedRating >= 50 && roundedRating<=75) return 'bg-cyan-700';
        if(roundedRating >=90) return 'bg-cyan-300';
        return 'bg-cyan-900';
    };
 

   

    const score = 85;


   
 

    
    


    return(

            <Fragment>
               

                {loading ? (
                    <p></p>
            ) : (
                

                <Fragment>
                      

    <NavBar> 
    
    </NavBar>




     

                    <div className='w-full'>


                    

                    <div className='w-8/12 m-auto mt-16 flex  rounded-md game-shadow'>

                 
                        {gameData.videos ? (
                       
                       <iframe className='h-96  w-11/12  rounded-md' src={`https://www.youtube.com/embed/${gameData.videos[0].video_id}`}    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>




                        ): 
                        <img className='h-96 w-11/12 rounded-md ' src={gameData.cover.url.replace('t_thumb', 't_original')} alt="" />
                        
                        }

    
                        <div className='w-1/2 ml-6 mr-6'>
                            <h1 className='text-3xl font-bold'>
                                {gameData.name}
                            </h1>

                            <div className='flex gap-5 mt-3 items-center mb-4'>

                            <h1 className='text-2xl font-bold'>{primaryPlatform}</h1>


                            {platforms.length>1 && <AllPlatforms platforms={platforms}></AllPlatforms>}
                           
                            </div>
                            
                            <h3 className='mb-3'><span className='font-semibold '>Released on:</span> {releaseDate}</h3>
                            <hr className='mb-4' />

                            <div className='flex justify-between'>

                                <div>
                                <h2 className='font-bold'>IGDB RATING</h2>
                                <p className='underline'>Based on {gameData.rating_count} Critic Reviews</p>

                                </div>

                                
                                <div className={`h-16 w-16 ${getBackgroundColor()} flex justify-center items-center rounded-md`}>


                                <div className='text-center text-white font-semibold text-4xl'>{roundedRating}</div>


                               </div>
                               

                            

                            </div>


                            <div className='mt-3 mb-3'>
                                {user? <AddGameButton gameId={id} originalState={isFavorite} userId={user.id}></AddGameButton>: <AddGameButton></AddGameButton>}
                               
                                
                           

                            </div>


                          
                                <TalkAbout gameId={id}></TalkAbout>
                          

                           
                           
                           
                                    
                           
                         
                            

                           
          




                    
           

                        </div>

                    </div>
                    </div>

                    <div className='w-8/12 m-auto mt-10'>
                    <h1 className='font-bold text-3xl'>Sumary</h1>

                    <p className='mb-3'>{gameData.summary}</p>
                    
                    


                    <div className='pb-5'>
                        <h1 className='font-bold text-3xl'>Latest Reviews</h1>
                        <hr  />

                        <LatestReviews gameId={id}></LatestReviews>



                    </div>


                    
                    </div>

                   



  


                </Fragment>
                
                
              
              
               
               
                
            )}
            



                




          
      
        


            </Fragment>  
       

      


    ) 



}




export default GamePage;