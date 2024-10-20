import React, { Fragment,useState,useEffect,useContext } from 'react';
import GameList from './GameList';
import NavBar from './navBar';
import { UserContext } from './Context';
import PcGames from './pcGames';



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
               <input  type="text" className='mr-3 text-cyan-500' />
               <a href="#explore" className="bg-cyan-800 py-2 px-3 rounded-md">¡Empieza a explorar!</a>
           </div>
          
       </div>
   </header>
           
           

          <div>
          <GameList /> 

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