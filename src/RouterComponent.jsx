import { DashboardMedecin, Connexion, ForgotPassword, Home,P404,InfoMedecin,
    Validation, Medecin, DashboardPatient, NoActvatedDocteur, Condition} from './components';
    import ResetPassword from './components/Security/ResetPassword';
import { AuthProvider, useIsAuthenticated } from 'react-auth-kit'
import SearchResult from './components/Search/SearchResult';

import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import {env} from './env'
import Mentions from './components/Mentions';
import Policonf from './components/Policonf';
import Faq from './components/Faq';

function RouterComponent() {
    const location = useLocation()
  return <>
    <AuthProvider authType = {'localstorage'}
                  authName={env.tokenStorageName}
                  cookieDomain={window.location.hostname}
    cookieSecure={window.location.protocol === "https:"}>
     <Routes location={location} key={location.key}>
       <Route path="/" element={<Home />} />
       <Route element={<PrivateRoute><DashboardMedecin/></PrivateRoute>} path={'dashboard/*'}/>
       <Route element={<PrivateRoute><DashboardPatient/></PrivateRoute>} path={'dashboard-patient/*'}/>
       <Route element={<PrivateRoute><NoActvatedDocteur/></PrivateRoute>} path={'/NoActvatedDocteur'}/>
       <Route element={<Validation/>} path="validation"/>
       <Route path="search" element={<SearchResult/>} />
       <Route path="praticiens" element={<InfoMedecin/>} />
       <Route path="medecin/:id" element={<Medecin/>} /> 
       <Route path="connexion" element={<Connexion/>}/>
       <Route path="conditions" element={<Condition/>} />
       <Route path="mentions" element={<Mentions/>} />
       <Route path="policonf" element={<Policonf/>} />
       <Route path="faq" element={<Faq/>} />
       <Route element={<ForgotPassword/>} path="forgot-password"/>
       <Route element={<ResetPassword/>} path="reset-password/:id/:token"/>
       <Route path="*" element={<P404/>} />
     </Routes>
   </AuthProvider> 
  </>;
}


const PrivateRoute = ({children}) => {
    const hasAuth = useIsAuthenticated()()
    return (
      <>
       {hasAuth ? children: <Navigate to="/connexion" />}
      </>
    )
  }

export default RouterComponent;
