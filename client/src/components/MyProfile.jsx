import React,{useState,useContext,useEffect} from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from "./Context";
import NavBar from "./navBar";
import MyGames from "./MyGames";
import MyReviews from "./MyReviews";
import AvatarSelection from "./AvatarSelection";





const MyProfile=()=>{
    

    return(
        <>
        <div className="profile-container">

            
        

        <div>
            <NavBar></NavBar>
        </div>

        <div className='w-3/5 m-auto'>



        <section className="mt-14">
        
          <AvatarSelection>
                    
          </AvatarSelection>
           

        </section>

        
        <section>
        <MyGames>

        </MyGames>

    </section>
    <MyReviews>
        
    </MyReviews>


    <section>

    </section>
        

    

        

            </div>



      
           
       


        
        
        
        </div>
        </>
    )






}




export default MyProfile;