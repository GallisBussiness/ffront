import { LocationOn } from "@mui/icons-material"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Link } from "react-router-dom"
import Step1 from "../Appointment/Step1"



function MedecinResult({medecin,setViewMedecin,setMarkerCss}) {
    const [ref,inView] = useInView()
    useEffect(() => {
       if(inView) {
        setViewMedecin(medecin)
        setMarkerCss({ width: 60, height: 60 });
       }
       else {
        setMarkerCss({ width: 30, height: 30 });
       }
    }, [medecin,inView,setViewMedecin,setMarkerCss])
  return (
      <>
       <div key={medecin._id} className="flex flex-col justify-between px-2 md:flex-row w-full rounded-lg bg-white shadow-lg my-2">
    <div className="w-1/3 flex flex-col justify-between p-4">
      <div className="space-x-3 w-full flex">
         <img
          src={`//localhost:3100/uploads/${medecin?.profile_image}`}
          className="rounded-full w-20 h-20 shadow-lg"
          alt="Avatar"
          />
          <div ref={ref} className="space-y-1 my-2">
            <h3 className="text-xl font-bold leading-tight mt-0 mb-2 text-black">{medecin?.name}</h3>
          <h6 className="text-base font-semibold leading-tight mt-0 mb-2 text-black">{medecin?.speciality}</h6>
          <h6 className="text-base font-semibold leading-tight mt-0 mb-2 text-black">{medecin?.email}</h6>
          <h6 className="text-base font-semibold leading-tight mt-0 mb-2 text-black">{medecin?.phoneNumber}</h6>
          <h6 className="text-base font-medium leading-tight mt-1 mb-2 text-gray-800"><LocationOn fontSize='small'/> {medecin?.adresse}</h6>
          </div>
      </div>
      <Link to={`/medecin/${medecin?._id}`} className="inline-block px-7 py-3 bg-primary text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">VOIR LA FICHE</Link>
        </div>
      <div className="flex flex-col justify-center items-center">
         <Step1  medecin={medecin?._id} />
      </div>
    </div>
      </>
   
  )
}

export default MedecinResult