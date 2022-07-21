import React from 'react'
import { Link } from 'react-router-dom'
import {useAuthUser, useIsAuthenticated} from 'react-auth-kit'

function Navbar() {
  const isAuthenticated = useIsAuthenticated()
  const auth = useAuthUser()()
    return (
        <div>
            <header className="text-gray-600">
  <div className="w-full flex flex-wrap p-5 flex-col md:flex-row justify-between items-center">
    <Link to="/" className="flex font-medium items-center text-gray-900 mb-4 md:mb-0">
      <img src="/logo.png" alt="logo" className="w-16 h-16" />
    </Link>
    <div className="w-full md:w-3/5 flex items-center justify-end">
    <Link to="/praticiens" className="bg-blue-400 text-white active:bg-lightBlue-600 font-bold text-sm px-2 py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
   Vous êtes un medecin ?
</Link>
<Link to="/patients" className="bg-green-400 text-white active:bg-lightBlue-600 font-bold text-sm px-2 py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
   Vous êtes un patient ?
</Link>
{isAuthenticated() ? <Link to={auth?.type_user === 'MEDECIN' ? '/dashboard' : '/dashboard-patient'} className="bg-white text-blue-500 active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
  <i className="fas fa-heart"></i> Tableau de bord
</Link>: <Link to="/connexion" className="bg-white text-blue-500 active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
  <i className="fas fa-heart"></i> Se connecter
</Link>}
    </div>
  </div>
</header>
        </div>
    )
}

export default Navbar
