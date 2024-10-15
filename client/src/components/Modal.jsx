import React,{useState} from "react";








function Modal(){

    const [modal,setModal]= useState(false);


    const handleModal=()=>{

       setModal(!modal);

    }

    if(modal){
        document.body.classList.add('active-modal')
    }else{
        document.body.classList.remove('active-modal')
    }
    return(
      <>

        <button className="button-6" onClick={handleModal}>See all platforms</button>
 {modal &&(

    
<div className="modal">
<div className="overlay"></div>
<div className="modal-content">
    <h2 className="text-2xl font-bold mt-7 mb-7">All Platforms</h2>

    
    <div className="modal-cards">
        <img src="/logos/ps5.svg" width={100} alt="" />
    </div>
    <div className="modal-cards">
        <img src="/logos/xbox.svg" width={80}  alt="" />
    </div>
    <div className="modal-cards"> 
       <img src="/logos/pc.svg" width={80} alt="" />
    </div>

    




    <button className="absolute" onClick={handleModal}>Close</button>

    
</div>
</div>



)}

      
            
            </>




    )










}


export default Modal;