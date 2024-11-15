import React, { useState, useEffect, useRef } from 'react';

const AudioRecorder = ({onChangeBlop,onRecordingStatusChange}) => {
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
  const [recordLabel,setRecordLabel]=useState('Record')
  
  

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
            
            setMicAnimation('mic-active')
          } else {
           
            setMicAnimation('mic-on')
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
       setRecordLabel('Record Again')
      
      
      audioContext.close(); 
    };

    setRecording(true);
    if (onRecordingStatusChange) onRecordingStatusChange(true);
  };

  const stopRecording = () => {
    setRecording(false);
    if (mediaRecorder) {
      mediaRecorder.stop();
      
    }
    if (onRecordingStatusChange) onRecordingStatusChange(false);
  };

  return (

    <>

      <div className='mb-5'>
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? 
        <div className='flex flex-col'>
          <div class={`mic-on ${micAnimation}  m-auto`}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-mic-fill" viewBox="0 0 16 16"> <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"></path> <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"></path> </svg>

  </div>
  <div>
    <h1 className='font-bold'>press the mic to stop Recording</h1>
  </div>
  

        </div>
          : <button className="button-recording">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none" class="svg-icon"><g stroke-width="2" stroke-linecap="round" stroke="#ff342b"><rect y="3" x="9" width="6" rx="3" height="11"></rect><path d="m12 18v3"></path><path d="m8 21h8"></path><path d="m19 11c0 3.866-3.134 7-7 7-3.86599 0-7-3.134-7-7"></path></g></svg>
  <span class="lable">Record</span>
</button>}
      </button>
      </div>

      <div>
      
      {audioUrl && !recording && (
  <audio className='m-auto mb-5' src={audioUrl} controls />
)}

      </div>


     
   
    
    </>
    
  );
};

export default AudioRecorder;