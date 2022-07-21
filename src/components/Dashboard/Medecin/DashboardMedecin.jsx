import { useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getMedecin } from "../../../services/UserService";
import Layout from "./Layout"

function DashboardMedecin() {
  const auth = useAuthUser()();
  const navigate = useNavigate()

  const key = ["loadMedecinInfo"];
  const {data:medecin} = useQuery(key,() => getMedecin(auth?._id), {
    staleTime:1_000_000,
    refetchOnWindowFocus: false,
  })
  
  useEffect(() => {
    if(auth?.status !== 'ACTIVATE') navigate('/NoActvatedDocteur',{replace:true});
    return null;
  }, [navigate,auth])
  
  
  
    return (
      <>
      {medecin && <Layout auth={medecin} />}
      </>
    )
}

export default DashboardMedecin
