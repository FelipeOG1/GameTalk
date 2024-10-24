import React, { useState, useEffect } from 'react';

const AvatarSelection = () => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const[username,setUsername]=useState(null);

  const handleClick=(name)=>{
    setUsername(name);
  }

  const getAvatarUrl = (style,username,hairColor) => {
    
    return `https://api.dicebear.com/9.x/${style}/svg?seed=${username}&hairColor=0e0e0e`
  };
  useEffect(() => {
    const hairColor='ab2a18'
    setAvatarUrl(getAvatarUrl(username,hairColor));
  }, [username]);
  console.log(username)

  return (
    <>
      <div className="flex">
        <div className="avatar-container">
          <div className="relative h-full w-full">
            {avatarUrl && <img src={avatarUrl} alt="Avatar" />}
            <div>
            

          </div>
          </div>
          
        </div>

     
       
      </div>
      <div className='flex gap-7'>
        <button onClick={()=>handleClick('adventurer')}>Felipe</button>
        <button onClick={()=>handleClick('pixel-art')}>Monica</button>
        <button onClick={()=>handleClick('bottts')}>Saul</button>
      </div>
    </>
  );
};

export default AvatarSelection;







