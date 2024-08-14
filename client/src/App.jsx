import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'





function App() {
const [cover,setCovers]=useState([]);
    async function loadCovers() {




      try{


        const response=await fetch(import.meta.env.VITE_API_URL);

        const data= await response.json();

          setCovers(data);

        

      }catch(e){
        console.log(e);

      }
      
    }


  



  useEffect(()=>{
    loadCovers();
  },[])


console.log(cover);




return(
  <h1 className='text-yellow-300'>hola</h1>
)
  


}


export default App
