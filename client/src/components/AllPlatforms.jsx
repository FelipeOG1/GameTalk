import React,{useState} from "react";
import { useNavigate } from "react-router-dom";







function AllPlatforms(props){
  const navigate=useNavigate();

    const [modal,setModal]= useState(false);


    

    const handleModal=()=>{

       setModal(!modal);
       console.log(props.platforms);

    }

    if(modal){
        document.body.classList.add('active-modal')
    }else{
        document.body.classList.remove('active-modal')
    }
   

    return (
      <>
        <button className="button-6" onClick={handleModal}>
          See all platforms
        </button>
    
        {modal && (
          <div className="modal">
            <div className="overlay" onClick={handleModal}></div>
            <div className="modal-content">
              <h2 className="text-2xl font-bold mt-7 mb-7">All Platforms</h2>
              {props.platforms.map((p, index) => (
                <div key={index} className="modal-cards flex items-center gap-4 p-4 bg-white shadow-md rounded-lg mb-4">
                 

                
                 
                  <a 
                    href={p.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-lg font-semibold text-gray-700"
                  >
                    {p.name}
                  </a>
                </div>
              ))}
              <button className="button-6 mt-6" onClick={handleModal}>Close</button>
            </div>
          </div>
        )}
      </>
    );






}


export default AllPlatforms;