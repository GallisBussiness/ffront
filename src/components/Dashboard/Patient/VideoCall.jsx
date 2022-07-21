import { useState, useRef, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { MdCall, MdCallEnd, MdOutlineCopyAll,MdOutlineVideoCameraFront } from 'react-icons/md'
import { toast, ToastContainer } from 'react-toastify';
import Notification from '../nokia.mp3';

const socket = io('http://localhost:1020');
// const socket = io('my-server');

const VideoCall = ({auth}) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream,setStream] = useState();
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const myVideo = useRef()
  const userVideo = useRef();
  const connectionRef = useRef();
  const notificationRef = useRef()
  const getUserPermission = async () => {
   const currentStream =  await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    setStream(currentStream);
  return setTimeout(() => { myVideo.current.srcObject = currentStream },500);
  }
  useEffect(() => {
   
    const r = getUserPermission();

    socket.on('me', (id) => {
      setMe(id)
    } );

    if(me === '') socket.emit('getid');

    socket.on('getid',(id) => setMe(id))

    socket.on('calluser', ({ from, name: callerName, signal }) => {
      notificationRef?.current?.play();
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });

    return () => clearTimeout(r);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const answerCall = () => {
    notificationRef?.current?.pause();
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answercall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };


  const handleCopy = () => {
    toast.success('ID copié !!!', {
      hideProgressBar: true,
      closeOnClick: true,
      autoClose:1000,
      pauseOnHover: false,
      draggable: false,
    })
  }

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };
  return (
    <>
    <audio ref={notificationRef} src={Notification} />
     <div className="flex items-center h-40  bg-primary rounded-3xl mx-2">
                    <MdOutlineVideoCameraFront className="text-white h-28 w-28" />
                    <p className="text-bold text-5xl text-white">Téléconsultation</p>
     </div>
    <div className="bg-white p-6 rounded-md flex items-center justify-between">
    <CopyToClipboard text={me}  onCopy={handleCopy}>
        <button type="button" className="px-4 py-1.5 bg-primary text-white font-semibold text-md leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center justify-between">
                  Copier mon ID <MdOutlineCopyAll className="mx-1 h-6 w-6"/>
       </button>
        </CopyToClipboard>
      <div className="flex items-center space-x-2">
           <div className="flex justify-center">
            </div> 
            {callAccepted && !callEnded &&
              <div className="flex space-x-2 justify-center">
              <div>
                <button type="button" onClick={leaveCall} className="px-4 py-1.5 bg-red-600 text-white font-semibold text-md leading-normal uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out flex items-center justify-between">
                  Couper <MdCallEnd className="mx-1 h-6 w-6"/>
                </button>
              </div>
            </div>
              }
      </div>
            
              {call.isReceivingCall && !callAccepted && (
        <div className="flex items-center justify-between">
          <h1 className="text-primary font-semibold text-md leading-normal uppercase">Appel de {call?.name}:</h1>
          <button type="button" onClick={answerCall}  className="px-4 py-1.5 mx-1 bg-green-600 text-white font-semibold text-md leading-normal uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out flex items-center justify-between">
                  Repondre <MdCall className="mx-1 h-6 w-6" />
                </button>
        </div>
      )}
    </div>
       
    <div className="my-3 flex justify-between">
      {stream && (
         <div className="flex w-1/3">
         <div className="rounded-lg shadow-lg bg-white max-w-full">
         <div className="p-2">
             <h5 className="text-gray-900 text-3xl font-bold mb-2 uppercase flex items-center justify-center">{auth?.name}</h5>
           </div>
           <video playsInline muted ref={myVideo} autoPlay/>
         </div>
           </div>
      )}
      {callAccepted && !callEnded && (
         <div className="flex w-1/2">
         <div className="rounded-lg shadow-lg bg-white max-w-full">
         <div className="p-2">
             <h5 className="text-gray-900 text-3xl font-bold mb-2 uppercase flex items-center justify-center">{call?.name}</h5>
           </div>
           <video playsInline ref={userVideo} autoPlay />
         </div>
           </div>
      )} 
       </div>
       <ToastContainer />
    </>
  );
};

export default VideoCall;