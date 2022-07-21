import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Navbar from '../Navbar'
import Search from './Search'
import {useLocation} from 'react-router-dom';
import Footer from '../Footer'
import { getMedecinBySpeciality } from '../../services/UserService';
import GoogleMapReact from 'google-map-react';
import { Avatar, Paper } from '@mui/material';
import MedecinResult from './MedecinResult';


const Marker = ({image,css}) => {
  return (<div className="w-14 h-14" style={{
    position: 'absolute',
    zIndex: 10000,
    transform: 'translate(-50%, -50%)'
  }}>
     <Avatar alt="Remy Sharp" src={`//localhost:3100/uploads/${image}`}   sx={css}/>
  </div>);
}

function SearchResult({searchData}) {
  const [viewMedecin,setViewMedecin] = useState(null)
  const [markerCss,setMarkerCss] = useState({ width: 30, height: 30 });
  const search = useLocation().search;
    const query = useMemo(() => new URLSearchParams(search),[search]) 

   const [medecins, setMedecins] = useState();

   const getData = useCallback(async (q) => {
    const data = await getMedecinBySpeciality(q)
    setMedecins(data);
   },[]);
   const qu = query.get('q');
   useEffect(() => {
     getData(qu)
     return () => {
       return;
     }
   }, [getData,qu])




    return (
       
        <>
        <Navbar />
        <div className="w-2/4 mx-auto">
           <Search />
        </div>
        <div className="flex flex-row-reverse mx-10 my-4 ">
       {medecins && <Paper className="w-1/3 h-screen my-4 ml-2 sticky top-0">
               <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCrOiDgBcW4FKE7FSn-tb1x3Bq5j2MqSVw"}}
          defaultCenter={medecins[0]?.location}
          center={viewMedecin?.location || medecins[0]?.location}
          defaultZoom={14}
          draggable={false}
          margin={[50,50,50,50]}
          >
          {medecins?.map(m => (
            <Marker key={m._id} lat={m?.location?.lat}
             lng={m?.location?.lng} image={m?.profile_image}
              css={markerCss} />
          ))}
          
        </GoogleMapReact>
               </Paper>}
          <div className="w-2/3">
        { medecins?.map(medecin => (
<MedecinResult key={medecin._id} medecin={medecin} setViewMedecin={setViewMedecin} setMarkerCss={setMarkerCss} />
        ))}
  
        </div>
        </div>
        <Footer />
        </>
    )
}

export default SearchResult
