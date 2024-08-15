import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';






function GamePage(){
    const {id}=useParams();
    return <h1>This is my game page of the call of duty that have a id of {id}</h1>



}




export default GamePage;