import React,{useState,useContext} from "react";
import RatingBar from "./RatingBar";
import AudioRecorder from "./AudioRecorder";
import { UserContext } from "./Context";
import { Navigate,useNavigate } from "react-router-dom";











function TalkAbout(){
    const { user } = useContext(UserContext);

    const [modal,setModal]= useState(false);
    const navigate= useNavigate();
    const [ratingScore, setRatingScore] = useState(0);

  const handleScoreChange = (newScore) => {
    setRatingScore(newScore);  
  };



    const handleModal=()=>{

        if(user){
            setModal(!modal);
                return 
        }
        navigate('/login');
        
        

      

    }

    if(modal){
        document.body.classList.add('active-modal')
    }else{
        document.body.classList.remove('active-modal')
    }
    return(
      <>

<button className="button-6 hover:bg-cyan-500 duration-500 " onClick={handleModal}>Talk About this Game!</button>
 {modal &&(

    
<div className="modal">
<div className="overlay"></div>
<div className="modal-content">

                <div className="pt-3 mb-3">
                    <h1>Give it a Score form 10 to a 100!</h1>
                    <RatingBar onScoreChange={handleScoreChange}></RatingBar>
                </div>

                <div className="pb-3">
                    
                    <AudioRecorder> 

                    </AudioRecorder>
                </div>


    

    




    <button className="absolute" onClick={handleModal}>Close</button>

    
</div>
</div>



)}

      
            
            </>




    )










}


export default TalkAbout;