import React, { useState, useEffect,useContext} from 'react';
import { useNavigate, useSubmit } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import useIsMobile from '../hooks/IsMobile';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const AvatarPage = (props) => {
  const {id,username,avatar}=useParams();
  const isMobile = useIsMobile();
  const [avatarUrl, setAvatarUrl] = useState(avatar);
  const [modal, setModal] = useState(false);
  const [hairColor,setHairColor]=useState('0e0e0e');
  const[skinColor,setSkinColor]=useState('ecad80')
  const[hairstyle,setHairstyle]=useState('short03')
  const [isInitialized, setIsInitialized] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const [mouth,setMouth]=useState('variant01')
  const [eye,setEye]=useState('variant01')
  const hairColors = ['0e0e0e', '3eac2c', '6a4e35', '85c2c6',  'ab2a18', 'dba3be','e5d7a3','cb6820'];
  const skinColors=['9e5622','763900','ecad80','f2d3b1'];
  const hairStyles=['short03','short19','short06','short16','long23','long08','long11','long20'];
  const mouths=['variant16','variant12','variant27','variant23','variant09','variant25','variant06','variant01'];
  const eyes=['variant01' , 'variant02','variant03' ,'variant04' ,'variant05', 'variant06', 'variant07' ,'variant08' , 'variant09' , 'variant10' ,'variant11' ,'variant12'];
  
  
  const navigate=useNavigate();


  
  const handleHairClick=(hair)=>{
    setHairColor(hair)
    console.log(avatarUrl)
    

    
  }

  const handleSkinClick=(skin)=>{

    setSkinColor(skin)
  }
  const handleHairstyle=(style)=>{
    setHairstyle(style);
    console.log(hairstyle)


  
  }

  const handleMouth=(m)=>{
    setMouth(m)



  }

  const handleEyes=(e)=>{

    setEye(e);
  }

  

  const handleSaveAvatar=async()=>{
   
    if(props.state=='create'){

      try{

        const response = await fetch(`http://localhost:3000/create-avatar/${id}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ avatarUrl }),
          credentials: 'include'
      });
  
      const data = await response.json();
  
      if(response.ok){
        navigate('/');
      }
  
  
  
      }catch(e){
        console.log(e.message);
      }finally{
        
  
      }
  



    }else if(props.state=='edit'){

      try{

        const response = await fetch(`http://localhost:3000/edit-avatar/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ avatarUrl }),
          credentials: 'include'
      });
  
      const data = await response.json();
  
      if(response.ok){
        navigate('/MyProfile');
      }
  
  
  
      }catch(e){
        console.log(e.message);
      }finally{
        
  
      }
  

      
    }


  
    

  }




  const getAvatarUrl = (username, hairColor,skinColor,hairstyle,mouth,eye) => {
    return `https://api.dicebear.com/9.x/adventurer/svg?seed=${username}&hairColor=${hairColor}&skinColor=${skinColor}&hair=${hairstyle}&mouth=${mouth}&eyes=${eye}`;
  };

  useEffect(() => {
    if (props.state === 'edit' && avatar && !isInitialized) {
      const urlObj = new URL(avatar);
      const params = new URLSearchParams(urlObj.search);
  
      // Inicializa los estados solo una vez
      setHairColor(params.get('hairColor') || '0e0e0e');
      setSkinColor(params.get('skinColor') || 'ecad80');
      setHairstyle(params.get('hair') || 'short03');
      setMouth(params.get('mouth') || 'variant01');
      setEye(params.get('eyes') || 'variant01'); // Establece un valor predeterminado para los ojos si no está presente
  
      setAvatarUrl(avatar);
      setIsInitialized(true);
    }
  }, [avatar, props.state, isInitialized]); // Ejecuta este efecto solo cuando `avatar` o `props.state` cambian
  
  useEffect(() => {
    // Solo se actualizará el avatar cuando cambien los parámetros relevantes
    if (props.state === 'edit' && isInitialized) {
      setAvatarUrl(getAvatarUrl(username, hairColor, skinColor, hairstyle, mouth, eye));
    }
  }, [username, hairColor, skinColor, hairstyle, mouth, eye, isInitialized])

  useEffect(() => {
    if (props.state === 'create') {
      setAvatarUrl(getAvatarUrl(username, hairColor, skinColor, hairstyle,mouth,eye));
    }
  }, [username, hairColor, skinColor, hairstyle,mouth,eye]);

  useEffect(() => {
  
    const timer = setTimeout(() => {
      setFadeOut(true); 
    }, 3000); // 3 segundos
  
  
    const hideMessageTimer = setTimeout(() => {
      setShowMessage(false);
    }, 5000); 
  
    
    return () => {
      clearTimeout(timer);
      clearTimeout(hideMessageTimer);
    };
  }, []);




return (
  <>
    <div className="avatar-page">
      <div className="w-4/6 m-auto mt-5 bg-slate-50 items-center text-center">
        <div className="avatar-container bg-yellow-400 mx-auto mb-3">
          <div className="relative h-full w-full">
            {avatarUrl && <img src={avatarUrl} alt="Avatar" />}
          </div>
        </div>

        {showMessage && (
        <div className={`message ${fadeOut ? 'fade-out' : ''}`}>
          Drag your mouse to Select a Style!
        </div>
      )}

        <div className='mb-3'>
          <h1>{props.title}</h1>
        </div>

       
        <h1>Select HairColor</h1>
        <Swiper
          spaceBetween={10}
          slidesPerView={'auto'}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 4 },
            768: { slidesPerView: 6 },
          }}
        >
          {hairColors.map((h, index) => (
            <SwiperSlide key={index}>
              <div onClick={() => handleHairClick(h)} className="avatar cursor-pointer">
                <img
                  src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${username}&hairColor=${h}&skinColor=${skinColor}&hair=${hairstyle}&mouth=${mouth}&eyes=${eye}`}
                  alt="avatar"
                  width={80}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Carousel para seleccionar SkinColor */}
        <h1>Select Skin Color</h1>
        <Swiper
          spaceBetween={10}
          slidesPerView={'auto'}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 4 },
            768: { slidesPerView: 6 },
          }}
        >
          {skinColors.map((h, index) => (
            <SwiperSlide key={index}>
              <div onClick={() => handleSkinClick(h)} className="avatar cursor-pointer">
                <img
                  src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${username}&hairColor=${hairColor}&skinColor=${h}&hair=${hairstyle}&mouth=${mouth}&eyes=${eye}`}
                  alt="avatar"
                  width={80}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Carousel para seleccionar HairStyle */}
        <h1>Select HairStyle</h1>
        <Swiper
          spaceBetween={10}
          slidesPerView={'auto'}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 4 },
            768: { slidesPerView: 6 },
          }}
        >
          {hairStyles.map((h, index) => (
            <SwiperSlide key={index}>
              <div onClick={() => handleHairstyle(h)} className="avatar cursor-pointer">
                <img
                  src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${username}&hairColor=${hairColor}&skinColor=${skinColor}&hair=${h}&mouth=${mouth}&eyes=${eye}`}
                  alt="avatar"
                  width={80}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

         {/* Carousel para seleccionar Mouth */}
         <h1>Select a Mouth</h1>
        <Swiper
          spaceBetween={10}
          slidesPerView={'auto'}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 4 },
            768: { slidesPerView: 6 },
          }}
        >
          {mouths.map((m, index) => (
            <SwiperSlide key={index}>
              <div onClick={() => handleMouth(m)} className="avatar cursor-pointer">
                <img
                  src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${username}&hairColor=${hairColor}&skinColor=${skinColor}&hair=${hairstyle}&mouth=${m}&eyes=${eye}`}
                  alt="avatar"
                  width={80}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Carousel para seleccionar Eyes */}
        <h1>Select Eyes</h1>
        <Swiper
          spaceBetween={10}
          slidesPerView={'auto'}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 4 },
            768: { slidesPerView: 6 },
          }}
        >
          {eyes.map((e, index) => (
            <SwiperSlide key={index}>
              <div onClick={() => handleEyes(e)} className="avatar cursor-pointer">
                <img
                  src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${username}&hairColor=${hairColor}&skinColor=${skinColor}&hair=${hairstyle}&mouth=${mouth}&eyes=${e}`}
                  alt="avatar"
                  width={80}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          onClick={handleSaveAvatar}
          className="cursor-pointer mb-12 transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
        >
          Save Avatar
        </button>
      </div>
    </div>
  </>
);
};

export default AvatarPage;