import React, { useState, useEffect, useRef } from 'react';

const AudioRecorder = ({onChangeBlop}) => {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const[isSpeaking,setIsSpeaking]=useState(false);
  const[bgColor,setBgColor]=useState('bg-white')
  const audioChunks = useRef([]);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const audioContextRef = useRef(null);
  const[micAnimation,setMicAnimation]=useState('mc-still')
  
  

  useEffect(() => {
    let animationFrameId;

    const detectSpeech = () => {
      if (analyserRef.current && dataArrayRef.current) {
        analyserRef.current.getFloatTimeDomainData(dataArrayRef.current);

        let sum = 0;
        for (let i = 0; i < dataArrayRef.current.length; i++) {
          const value = dataArrayRef.current[i];
          sum += value * value;
        }
        const rms = Math.sqrt(sum / dataArrayRef.current.length);

        
        const speaking = rms > 0.01; // 

        
        if (speaking !== isSpeaking) {
          setIsSpeaking(speaking);
          if (speaking) {
            
            setMicAnimation('bg-cyan-100 rounded-sm')
          } else {
           
            setMicAnimation('bg-white duration-300')
          }
        }
      }

    
      if (recording) {
        animationFrameId = requestAnimationFrame(detectSpeech);
      }
    };

   
    if (recording) {
      detectSpeech();
    }

    return () => {
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [recording, isSpeaking,onChangeBlop]); 
  const startRecording = async () => {
    audioChunks.current = []; //

    
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

   
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    analyser.fftSize = 2048; 
    const bufferLength = analyser.fftSize;
    const dataArray = new Float32Array(bufferLength);

    analyserRef.current = analyser;
    dataArrayRef.current = dataArray;
    audioContextRef.current = audioContext;

    
    recorder.start();
    recorder.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

   
    recorder.onstop = async () => {
      
      const audioBlob =  new Blob(audioChunks.current, { type: 'audio/wav' });
      const url =  URL.createObjectURL(audioBlob);
       setAudioUrl(url);
       onChangeBlop(audioBlob);
      
      
      audioContext.close(); 
    };

    setRecording(true);
  };

  const stopRecording = () => {
    setRecording(false);
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  return (

    <>

      <div className='mb-3'>
      <button onClick={recording ? stopRecording : startRecording} className={micAnimation }>
        {recording ? <img src='../logos/microphone.png' width={70}></img> : "Start Recording"}
      </button>
      </div>

      <div>
      
      {audioUrl && <audio className='m-auto' src={audioUrl} controls />}

      </div>


     
   
    
    </>
    
  );
};

export default AudioRecorder;