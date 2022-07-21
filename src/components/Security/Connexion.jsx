import TabCon  from "./TabCon";
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from "react";

function Connexion(z) {
  const hasAuth = useIsAuthenticated()()
  const auth = useAuthUser()()
  const navigate = useNavigate()

  useEffect(() => {
    if(hasAuth) {
      const targetDashboard = auth?.type_user === 'PATIENT' ? '/dashboard-patient' : '/dashboard';
      navigate(targetDashboard, { replace: true });
    }
    return () => {
      return null;
    }
  }, [hasAuth,navigate,auth])
    return (
        <>
<section className="flex flex-col md:flex-row h-screen items-center">

  <div className="hidden md:block w-full md:w-1/2 xl:w-2/3">
   <Link to="/" ><img src="/logo.png" className="mx-5 w-20 h-20" alt="logo"/></Link>
    <img src="/docteur.png" className="w-2/3 h-full py-2 mx-auto" alt="doctorimage" />
  </div>

  <div className="bg-primary w-full md:max-w-full lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/2 min-h-screen p-16
        flex justify-center">
        <TabCon />
  </div>
</section>
        </>
    )
}

export default Connexion
