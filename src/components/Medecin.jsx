import { LocationOn } from '@mui/icons-material';
import { Avatar, Backdrop, CircularProgress, Divider, Paper } from '@mui/material';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getMedecin } from '../services/UserService';
import Navbar from './Navbar'
import Footer from './Footer'
import dataJson from '../data/data.json'
import { useMemo } from 'react';
import { getConsultationByMedecin } from '../services/ConsultationService';
import { getScheduleByMedecin } from '../services/ScheduleService';
import GoogleMapReact from 'google-map-react';
import Step1 from './Appointment/Step1';




function Medecin() {

  const Marker = () => {
    return (<div className="w-14 h-14" style={{
      position: 'absolute',
      zIndex: 10000,
      transform: 'translate(-50%, -50%)'
    }}>
       <Avatar alt="Remy Sharp" src={`//localhost:3100/uploads/${data?.profile_image}`}   sx={{ width: 56, height: 56 }}/>
    </div>);
}

const json = useMemo(() => dataJson,[])

const definitions = json.map(j => ({...j,KEY:j.KEY.toLocaleLowerCase()}));

const getDefinition = (arr,key) => {
    const obj = arr.filter(o => o.KEY === key);
    return obj[0].DEFINITIONS;
}

 const {id} = useParams();
 const key = ['loadMedecin',id];
  const {data,isLoading} = useQuery(key,() => getMedecin(id), {
      staleTime: 50_000,
  })
  const key2 = ['loadConsulationInfo',id];
    const {data: tarifs, isLoading: loadTarifs} = useQuery(key2,() =>  getConsultationByMedecin(id), {
      staleTime: 50_000
    });
    const key3 = ['loadScheduleInfo',id];
    const {data: schedule, isLoading: loadSchedule} = useQuery(key3,() =>  getScheduleByMedecin(id), {
      staleTime: 50_000
    });
    return (
       <>
               <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={isLoading || loadTarifs || loadSchedule}
>
  <CircularProgress color="inherit" />
</Backdrop>
       <Navbar />
       {data &&
        <div className="flex justify-between flex-wrap mx-10 my-10">
         
         <div className="w-2/3">
           <Paper className="w-full flex flex-col md:flex-row">
         <div className="space-x-4 w-3/4 flex p-4">
       <img
        src={`//localhost:3100/uploads/${data.profile_image}`}
        className="rounded-full w-36 h-36 shadow-lg"
        alt="Avatar"
        />
        <div className="space-y-1 my-2">
          <h3 className="text-xl font-bold leading-tight mt-0 mb-2 text-black">{data?.name}</h3>
        <h6 className="text-base font-semibold leading-tight mt-0 mb-2 text-black">{data?.speciality}</h6>
        <h6 className="text-base font-semibold leading-tight mt-0 mb-2 text-black">{data?.phoneNumber}</h6>
        {data.adresse && <h6 className="text-base font-medium leading-tight mt-1 mb-2 text-gray-800"><LocationOn fontSize='small'/> {data.adresse}</h6>}
        <h6 className="text-base font-medium leading-tight mt-1 mb-2 text-gray-800">Définition de la spécialité : </h6>
        <p className="text-base font-normal leading-tight mt-1 mb-2 text-gray-700">
            {getDefinition(definitions,data.speciality)}
        </p>
        </div>
    </div>
    <div className="w-96 ml-3">
      <Step1 medecin={data?._id} />
    </div>
    
           </Paper>
           <div className="my-2">
               <Paper className="w-full">
        <div className="p-4">
        <h3 className="text-xl font-bold leading-tight mt-0 mb-2 text-black">Informations Personnelles : </h3>
        <Divider />
        <h6 className="text-base font-semibold leading-tight mt-0 mb-2 text-black">Prenom: {data.firstName}</h6>
        <h6 className="text-base font-medium leading-tight mt-1 mb-2 text-black">Nom: {data.lastName}</h6>
        </div>
         </Paper>
           </div>
           <Paper className="w-full">
          <div className="p-4 space-y-3">
        <h3 className="text-xl font-bold leading-tight mt-0 mb-2 text-black">Tarifs : </h3>
        {tarifs?.map(tarif => (
          <div key={tarif._id}>
          <Divider />
         <div className="flex items-center justify-between mt-1">
         <h3 className="text-xl font-bold leading-tight mt-0 mb-2 text-black">{tarif?.title} : </h3>
         <h3 className="text-xl font-bold leading-tight mt-0 mb-2 text-black">{tarif?.price} <span className="text-sm font-normal">FCFA</span>  </h3>
         </div>
         </div>
        ))}
        </div>
        </Paper>
        <Paper className="w-full my-2">
          <div className="p-4 space-y-3">
        <h3 className="text-xl font-bold leading-tight mt-0 mb-2 text-black">Horaires : </h3>
        {schedule?.slots?.filter(slot => slot.isActive).map((s,i) => (
          <div key={i}>
          <Divider />
         <div className="flex items-center justify-between mt-1">
         <h3 className="text-xl font-bold leading-tight mt-0 mb-2 text-black">{s?.dayName} : </h3>
         <div className="flex-col items-center space-y-2">
            {s?.hours?.map((h,i) => (
            <div key={i} className="flex space-x-2 items-center">
              <h3 className="text-lg font-semibold leading-tight mt-0 mb-2 text-black">{h?.startTime} - </h3>
              <h3 className="text-lg font-semibold leading-tight mt-0 mb-2 text-black">{h?.endTime} </h3>
            </div> 
          ))}
         </div>
         
         </div>
         </div>
        ))}
        </div>
        </Paper>
        </div>
        <Paper className="w-96 h-500 sticky top-0">
               <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCrOiDgBcW4FKE7FSn-tb1x3Bq5j2MqSVw"}}
          defaultCenter={data?.location}
          center={data?.location}
          defaultZoom={14}
          draggable={false}
          margin={[50,50,50,50]}
          >
          <Marker lat={data?.location?.lat} lng={data?.location?.lng} />
        </GoogleMapReact>
               </Paper>
       </div>
       
        }
        <Footer />
       </>
    )
}

export default Medecin
