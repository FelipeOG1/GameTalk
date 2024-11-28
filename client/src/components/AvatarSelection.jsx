import React, { useState, useEffect,useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from "../components/Context";





const AvatarSelection = (props) => {
  
  const [avatarUrl, setAvatarUrl] = useState(null);
  const navigate=useNavigate();
  const[loading,setLoading]=useState(true);
 
 

  const handleAvatar=()=>{
    

    navigate(`/edit-avatar-page/${props.user.id}/${encodeURIComponent(avatarUrl)}/${props.user.username}`);
  }



  
const loadAvatar=async()=>{
  try {
    const response = await fetch('http://localhost:3000/avatar/myAvatar', {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Error al obtener los juegos');
    }

    const data = await response.json();
    setAvatarUrl(data.myAvatar);

     

} catch (e) {
    console.error(e.message);
} finally {
    setLoading(false); 
  
}



  
}
 
  




useEffect(()=>{
  

loadAvatar();



},[])

console.log(avatarUrl);
  
  
  

  
  return (
    <>
      <div className="flex">
        <div className="avatar-container bg-yellow-400">
          <div className="relative h-full w-full">
            {!loading && <img src={avatarUrl} alt="Avatar" />}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button className="button-6" onClick={handleAvatar}>
          Edit My avatar
        </button>
      </div>
    </>
  );
};

export default AvatarSelection;