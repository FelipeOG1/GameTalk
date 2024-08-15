import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'





function App() {
const [covers,setCovers]=useState([]);
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


covers.map(c=>{
  
})



return(

  <section className='w-screen bg-black mt-96 '>
    <h1 className='font-bold text-5xl text-yellow-400 text-center mb-5'>Game covers</h1>

    <div className='flex flex-row gap-5 flex-wrap w-9/12 m-auto'>
      {covers.map(c=>{
        
        return <div key={c.id} className='w-40 h-56 cursor-pointer transition-all duration-300 hover:brightness-90 hover:contrast-125' >
          <img  src={c.cover.url.replace('t_thumb', 't_cover_big')} className='w-full h-full object-cover'></img>
        </div>
          
        
      })}



    </div>
    


  </section>


  
)
  


}


export default App
