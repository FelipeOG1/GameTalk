import React,{useState,useContext, useEffect} from "react";
import RatingBar from "../components/RatingBar";
import AudioRecorder from "../components/AudioRecorder";
import { UserContext } from "../components/Context";
import { Navigate,useNavigate, useSubmit } from "react-router-dom";
import downSound from '../assets/sounds/down.wav';
import upSound from '../assets/sounds/up.wav';



function TalkAbout(props){
    const { user } = useContext(UserContext);
    const [modal,setModal]= useState(false);
    const navigate= useNavigate();
    const [ratingScore, setRatingScore] = useState(0);
    const[rating,setRating]=useState(false)
    const[currentRating,setCurrentRating]=useState(0);
    const [blop,setBlop]=useState('')
    const[gameId,setGameId]=useState('');
    const[review,setReview]=useState(false);
    const [isRecording, setIsRecording] = useState(false);

  const handleRecordingStatusChange = (status) => {
    setIsRecording(status);
    console.log('Recording status:', status);
  };



    const playSound=(sound,volume)=>{
        const audio=new Audio(sound);
        audio.volume=volume

        audio.play();


    }


    useEffect(()=>{
        setGameId(props.gameId);
       



    },[gameId])
    

    const handleScoreChange = (newScore) => {
        console.log(newScore);
        setRatingScore(newScore); 
    
        if (newScore > currentRating) {  
            playSound(upSound, 0.1);  
            setCurrentRating(newScore);  
        } else if (newScore < currentRating) {  
            playSound(downSound, 0.1);  
            setCurrentRating(newScore);  
        }
    
        setRating(true);  
    };
  const handleBlopChange = (newBlop) => {
    setBlop(newBlop);
    setReview(true);
    console.log('Nuevo blob:', newBlop);
};

const sendReview= async ()=>{
 setGameId(props.gameId)
  const formData = new FormData();
  formData.append('audio', blop, 'audio.wav');
  formData.append('score',ratingScore);
  formData.append('gameId',gameId)


if(!props.isReviewed){
    try {
        const response = await fetch('http://localhost:3000/reviews/addReview', {
            method: 'POST',
            body: formData,
            credentials: 'include', 
        });
        console.log('datos enviados');
        
        const result = await response.json();
    
    
        
    } catch (error) {
        console.error('Error al enviar la reseña:', error);
    }finally{
        setModal(!modal);
        setReview(false);
        navigate(0);
    }
      
     

}else if(props.isReviewed){

    try {
        const response = await fetch('http://localhost:3000/reviews/edit-review', {
            method: 'PUT',
            body: formData,
            credentials: 'include', 
        });
        console.log('datos enviados');
        
        const result = await response.json();
    
    
        
    } catch (error) {
        console.error('Error al enviar la reseña:', error);
    }finally{
        setModal(!modal);
        setReview(false);
        navigate(0);
    }
      


    
}
  
  

 

 

           
    


}



    const handleModal=()=>{

        if(user){
            setModal(!modal);
            setRating(false);
            setReview(false);

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

<button className="button-6 hover:bg-cyan-500 duration-500" onClick={handleModal}>{props.isReviewed? 'Edit your Review!':'Talk About this Game!'}</button>
 {modal &&(

    
<div className="modal">
<div className="overlay" onClick={handleModal}></div>
<div className="modal-content">

                <div className="pt-3 mb-5">
                    <h1>Hover and click to give a rating!</h1>
                    <RatingBar onScoreChange={handleScoreChange}></RatingBar>

                </div>

                <div className="pb-3">
                    
                   {rating && <AudioRecorder onChangeBlop={handleBlopChange} onRecordingStatusChange={handleRecordingStatusChange}/>  } 

                   
                </div>


                <div>
                {review==true && !isRecording && <button onClick={sendReview} className='button-6'>{props.isReviewed? 'Edit your Review':'Send Review!'}</button>}
                </div>
      


    

    


    
</div>
</div>



)}

      
            
            </>




    )










}


export default TalkAbout;