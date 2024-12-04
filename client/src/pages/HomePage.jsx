import React, { Fragment,useState,useEffect,useContext } from 'react';
import ConsoleGames from '../components/ConsoleGames';
import NavBar from '../components/navBar';
import { UserContext } from '../components/Context';
import PcGames from '../components/PcGames';
import UpComingGames from '../components/upComingGames';
import Footer from '../components/Footer';


function HomePage(){
    const { user } = useContext(UserContext);
    const [pcCovers,setPcCovers]=useState([]);
    const [authState,setAuthState]=useState(false);
    const [pcloading, setPcLoading] = useState(true);
    const [ps5Covers,setPs5Covers]=useState([]);
    const [ps5loading, setPs5Loading] = useState(true);


   

    async function loadPcCovers() {
  
      try{


        const response=await fetch(`http://localhost:3000/games/pcGames`, {
          method: 'GET',
          credentials: 'include',
          
        });

        const data= await response.json();

          setPcCovers(data);
          

        

      }catch(e){
        console.log(e);

      }finally{
        setPcLoading(false)
      }
      
    }


    async function loadPs5Covers() {
  
      try{


        const response=await fetch(`http://localhost:3000/games/newPs5Games`, {
          method: 'GET',
          credentials: 'include',
          
        });

        const data= await response.json();

        setPs5Covers(data);
          

        

      }catch(e){
        console.log(e);

      }finally{
        setPs5Loading(false)
      }
      
    }


    


    


  



  useEffect(()=>{
    loadPcCovers();
    loadPs5Covers();
  },[])


    

  

    
   




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
               
               
       
           

          <div className='mb-10 mt-10'>
          <h1 className='text-2xl font-semibold mb-3'>Highest Rated Console Games</h1>
          <hr />
          <ConsoleGames /> 

          </div>


          <div className='mb-10'>
          <h1 className='text-2xl font-semibold mb-3'>Highest Rated Pc Games</h1>
          <hr />
            {!pcloading && <PcGames covers={pcCovers}></PcGames>}

          </div>

          <section class="hero-background text-white py-20 px-5 text-center mb-3 rounded-sm ">
  <div class="max-w-3xl mx-auto">
    <h1 class="text-4xl font-bold mb-4">Share Your Gaming Thoughts, Your Way</h1>
    <p class="text-lg mb-6">
    At GameTalk, reviews come to life! Record and share your opinions about your favorite games with voice memos.
    </p>
   
  </div>
</section>
           

          <div>
          <h1 className='text-2xl font-semibold mb-3'>Upcoming Ps5 Games</h1>
          <hr />


            {!ps5loading && <UpComingGames covers={ps5Covers}></UpComingGames>}

</div>

          

           
           </div>

          
           

        


            </div>


            <div>
        <Footer/>
      </div>
         
        </Fragment>
       
           

   
      
    )



}

export default HomePage