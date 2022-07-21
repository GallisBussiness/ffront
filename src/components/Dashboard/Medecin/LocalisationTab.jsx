import GoogleMapReact from 'google-map-react'
import React, { useCallback, useEffect, useState } from 'react'
import { Avatar, Backdrop, Modal, Typography } from '@mui/material';
import { FlapperSpinner } from 'react-spinners-kit';
import { Box } from '@mui/system';
import { useMutation } from 'react-query';
import { updateMedecin } from '../../../services/UserService';
import { toast, ToastContainer } from 'react-toastify';

function LocalisationTab({auth}) {
    const Marker = () => {
        return (<div className="w-14 h-14" style={{
          position: 'absolute',
          zIndex: 10000,
          transform: 'translate(-50%, -50%)'
        }}>
           <Avatar alt="profile" src={`//localhost:3100/uploads/${auth?.profile_image}`}   sx={{ width: 56, height: 56 }}/>
        </div>);
    }
    const [position,setPosition] = useState(auth?.location)
    const [loading,setLoading] = useState(true);
    const [modalOpen,setModalOpen] = useState(false);
    
     const {mutate, isLoading} = useMutation((data) => updateMedecin(auth?._id,data),{
       onSuccess: (_) => toast.success('position modifiée !!!'),
       onError: (_) => toast.error('position non modifiée !!!'),
     })
      useEffect(() => {
           if(navigator?.geolocation)
           navigator.geolocation.getCurrentPosition(
                (pos) => {
                const crd = pos.coords; 
                const center = {lat: crd.latitude, lng: crd.longitude};
                setPosition(auth?.location ?? center);
             }
               , 
               (err) => {
                console.warn(`ERREUR (${err.code}): ${err.message}`);
              }
               );
          return () => {
            return null;
          }
      }, [auth?.location]);

      const updatePosition = () => {
        const o = {location:position};
        mutate(o);
        setModalOpen(false)
      }
      const handleMouseMouve = (key,props,mouse) => setPosition(() => ({lat:mouse.lat, lng:mouse.lng}))
      const handleTilesLoaded = useCallback(() => setLoading(false),[])
      const handleModalClose = useCallback(() => setModalOpen(false),[])
      const handleMouseUp = useCallback(() => {
        setModalOpen(true)
      },[])
    
    return (
        <>
        <Modal
  open={modalOpen}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box className="bg-white rounded-md w-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 p-4" >
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Voulez-vous sauvegarder cette positions ?
    </Typography>
    <div className="flex items-center justify-end space-x-2 w-full">
    <button type="button"
     onClick={updatePosition}
     className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">OUI</button>
    <button type="button"
     onClick={handleModalClose}
     className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out">NON</button>
    </div>
  </Box>
</Modal>
         <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={loading || isLoading}
>
<FlapperSpinner  loading={loading || isLoading} color='blue'/>
</Backdrop>
        <div className="w-full h-1/2 mx-3 my-4">
        <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCrOiDgBcW4FKE7FSn-tb1x3Bq5j2MqSVw"}}
          defaultCenter={{lat:14.733422000000003, lng: -17.461159000000002}}
          center={position}
          defaultZoom={14}
          draggable={false}
          onTilesLoaded={handleTilesLoaded}
          onChildMouseDown={handleMouseMouve}
          onChildMouseUp={() => handleMouseUp()}
          onChildMouseMove={handleMouseMouve}
          margin={[50,50,50,50]}
          >
          {!loading && <Marker lat={position?.lat} lng={position?.lng} />}
        </GoogleMapReact>
      </div>
          </div> 
          <ToastContainer />
        </>
    )
}

export default LocalisationTab
