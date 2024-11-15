import React, { useState, useEffect,useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../components/Context';
import { Navigate, useNavigate } from 'react-router-dom';




const AddGameButton = (props) => {
const navigate=useNavigate();
    const [isChecked, setIsChecked] = useState(props.originalState);
    const gameId=props.gameId;
    const { user } = useContext(UserContext); 
    
    

    const handleChange = async (event) => {
        if(user){
            setIsChecked(event.target.checked);
        if (event.target.checked) {
           

            try{

                const response = await fetch('http://localhost:3000/addGame', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ gameId }), 
                    credentials: 'include' 
                });
            }catch(e){
                    console.log(e.message);
            }
            
    
          
        } else {
            try{

                const response = await fetch(`http://localhost:3000/removeGame/${gameId}`,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials:'include'
                })

            }catch(e){
                console.log(e.message)

            }
          
          
        }

        }else{
            navigate('/login')
        }
        
      };


  

  return (
    <StyledWrapper>
      <div className='w-7/12'>
        <input type="checkbox"  checked={isChecked} id="favorite" name="favorite-checkbox" defaultValue="favorite-button"  onChange={handleChange} />
        <label htmlFor="favorite" className="container">
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
          <div className="action">
            <span className="option-1">Add to Favorites</span>
            <span className="option-2">Added to Favorites</span>
          </div>
        </label>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  label {
   background-color: white;
   display: flex;
   align-items: center;
   gap: 14px;
   padding: 10px 15px 10px 10px;
   cursor: pointer;
   user-select: none;
   border-radius: 10px;
   box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
   color: black;
  }

  input {
   display: none;
  }

  input:checked + label svg {
   fill: hsl(0deg 100% 50%);
   stroke: hsl(0deg 100% 50%);
   animation: heartButton 1s;
  }

  @keyframes heartButton {
   0% {
    transform: scale(1);
   }

   25% {
    transform: scale(1.3);
   }

   50% {
    transform: scale(1);
   }

   75% {
    transform: scale(1.3);
   }

   100% {
    transform: scale(1);
   }
  }

  input + label .action {
   position: relative;
   overflow: hidden;
   display: grid;
  }

  input + label .action span {
   grid-column-start: 1;
   grid-column-end: 1;
   grid-row-start: 1;
   grid-row-end: 1;
   transition: all .5s;
  }

  input + label .action span.option-1 {
   transform: translate(0px,0%);
   opacity: 1;
  }

  input:checked + label .action span.option-1 {
   transform: translate(0px,-100%);
   opacity: 0;
  }

  input + label .action span.option-2 {
   transform: translate(0px,100%);
   opacity: 0;
  }

  input:checked + label .action span.option-2 {
   transform: translate(0px,0%);
   opacity: 1;
  }`;

export default AddGameButton;
