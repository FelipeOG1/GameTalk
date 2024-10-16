import { useState,useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom';
import Modal from './Modal';
import Login from './Login';
import RatingBar from './RatingBar';
import NavBar from './navBar';
import AudioRecorder from './AudioRecorder';
import TalkAbout from './TalkAboutPage';
import LatestReviews from './LatestReviews';









function GamePage(){
    const {id}=useParams();

    const [gameData,setGameData]=useState([]);

    const [loading,setLoading]=useState(true);
    const [authState,setAuthState]=useState(false);


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
           

        
           console.log(data.AuthState);


           


        }catch(e){

            console.error(e.message);



        }finally{

            setLoading(false);
        }



    }


    
    


   useEffect(()=>{
    loadData();
    
    
   },[id]);

   


   


  
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

                            <h1 className='text-2xl font-bold'>{mainPlatform}</h1>
                            <Modal>
                                
                            </Modal>
                        
                            </div>
                            
                            <h3 className='mb-3'><span className='font-semibold '>Released on:</span> {gameData.release_dates[0].human}</h3>
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


                            <div className='mb-3'>
                                <h1>Add to favorites</h1>
                                <button onClick={handleSubmit} className='border-2 border-black'>Add</button>
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