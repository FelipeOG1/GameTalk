import React, { Fragment,useState,useEffect,useContext } from 'react';
import ConsoleGames from '../components/ConsoleGames';
import NavBar from '../components/navBar';
import { UserContext } from '../components/Context';
import PcGames from '../components/PcGames';



function HomePage(){
    const { user } = useContext(UserContext);


    

  

    
   




    useEffect(() => {
        if (user) {
          console.log('Usuario:', user); 
        }else{
            console.log('no user');
        }
      }, [user]);
    
   


    return(
        <Fragment>

            <div className='home-container'>

            <NavBar></NavBar>
            
          
            <div className='w-3/4 m-auto'>
               
               
        <header className="gradient text-white p-6 mb-5 mt-5 pb-36 rounded">
         <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
           <div className="text-center md:text-left">
           
               <p className="text-lg mb-4">Explora una vasta colección de videojuegos, comparte tus opiniones y descubre datos interesantes sobre tus juegos favoritos.</p>
               
           </div>
          
       </div>
   </header>
           
           

          <div>
          <ConsoleGames /> 

          </div>


          <div>
            <PcGames></PcGames>

          </div>
          

           
           </div>
           
           



            </div>


           
            

        </Fragment>
       
           

   
      
    )



}

export default HomePage