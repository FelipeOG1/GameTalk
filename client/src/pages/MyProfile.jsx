import React,{useState,useContext,useEffect} from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from "../components/Context";
import NavBar from "../components/navBar";
import MyGames from "../components/MyGames";
import MyReviews from "../components/MyReviews";
import AvatarSelection from "../components/AvatarSelection";
import Footer from "../components/Footer";





const MyProfile=()=>{

    const { user } = useContext(UserContext);


    

    return(
        <>
        <div className="profile-container">

            
        

        <div>
            <NavBar></NavBar>
        </div>

        <div className='w-3/5 m-auto'>



        <section className="mt-14">
        
          <AvatarSelection user={user? user: 'loading'} >
                    
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



      
           
       


        
            <div>
       
      </div>
        </div>

        <Footer/>
       
        </>
    )






}




export default MyProfile;