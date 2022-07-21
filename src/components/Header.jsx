import React from 'react'
import Navbar  from './Navbar';
import Search from './Search/Search';

function Header() {
    return (
        <div className="min-h-screen flex flex-col justify-start  bg-wave bg-bottom bg-no-repeat">
        <div className="w-full">
            <Navbar />
        </div>
        <div className="flex flex-col md:flex-row justify-between mx-5">
            <div className="container mx-auto flex px-5 py-24 flex-col">
         <div className="lg:flex-grow md:w-full flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
           <h1 className="sm:text-4xl text-6xl mb-4 font-medium text-gray-900">Trouvez un medecin et obtenez un rendez-vous. </h1>
           <h4 className="hidden lg:inline-block text-3xl font-medium font-roboto">C'est simple, immédiat et gratuit </h4>
             <Search />  
         </div>
         </div>
         <div className="w-2/3 md:w-full h-2/5 mb-32 md:mb-0 ml-16">
            <img src="/docteur.png" alt="doctor" />
         </div>
        </div>
       
     </div>
    )
}

export default Header
