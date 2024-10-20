import React,{useState,useContext, useEffect} from "react";
import RatingBar from "./RatingBar";
import AudioRecorder from "./AudioRecorder";
import { UserContext } from "./Context";
import { Navigate,useNavigate } from "react-router-dom";











function TalkAbout(props){
    const { user } = useContext(UserContext);
    const [modal,setModal]= useState(false);
    const navigate= useNavigate();
    const [ratingScore, setRatingScore] = useState(0);
    const [blop,setBlop]=useState('')
    const[gameId,setGameId]=useState('');
    const[review,setReview]=useState(false);


    useEffect(()=>{
        setGameId(props.gameId);
       



    },[gameId])
    

  const handleScoreChange = (newScore) => {
    setRatingScore(newScore); 
    console.log(ratingScore) 
  };
  const handleBlopChange = (newBlop) => {
    setBlop(newBlop);
    setReview(true);
    console.log('Nuevo blob:', newBlop);
};

const sendReview= async ()=>{
    setReview(false);
    if(!ratingScore || ! blop){
        console.log('No blop ')
        return
    }
    
    

   

 setGameId(props.gameId)
  const formData = new FormData();
  formData.append('audio', blop, 'audio.wav');
  formData.append('score',ratingScore);
  formData.append('gameId',gameId)

 

  


  try {
    const response = await fetch('http://localhost:3000/addReview', {
        method: 'POST',
        body: formData,
        credentials: 'include', // Si necesitas enviar cookies de sesión
    });
    console.log('datos enviados');
    
    const result = await response.json();
    
} catch (error) {
    console.error('Error al enviar la reseña:', error);
}
  

  

 

 

           
    







}



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
                    
                    <AudioRecorder onChangeBlop={handleBlopChange} > 

                    </AudioRecorder>
                </div>


                <div>
                {review==true && <button onClick={sendReview} className='button-6'>Send Review</button>}
                </div>
      


    

    




    <button className="absolute" onClick={handleModal}>Close</button>

    
</div>
</div>



)}

      
            
            </>




    )










}


export default TalkAbout;