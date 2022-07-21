import React from 'react'
import CabinetTab from './CabinetTab'
import Navbar from './Navbar'
import Search from './Search/Search'

function Cabinet() {
    return (
        <>
           <Navbar /> 
           <Search />
           <h1 className="font-medium text-lg my-3 ml-12">
               Cabinet
           </h1>
           <div className="flex items-center justify-between mx-8 my-4 rounded-3xl bg-primary px-8 py-3">
               <div className="flex items-center">
                  <div className="mr-8">
                  <img className="h-24 w-24" src="hospital.png" alt="hospital" />
               </div>
               <div className="text-white px-4 py-4">
                    <div className="text-lg font-bold uppercase">Cabinet Medical Jaam</div>
                    <div className="text-lg font-semibold">Dakar, Sacré Coeur</div>
                    <div className="text-lg font-semibold">(221) 77 000 00 00</div>
                    <div className="text-lg font-semibold">jaam@hotmail.fr</div>
               </div> 
               </div>
               
               <button className=" bg-blue-100 active:bg-lightBlue-600 font-bold uppercase text-xs mb-3 px-4 py-3 rounded-3xl shadow hover:shadow-md outline-none focus:outline-none  ease-linear transition-all duration-150" type="button">
                Programmer un rendez-vous
                </button>  
           </div>
           <div className="rounded-3xl bg-gray-100 px-8 py-5 mx-8 my-4">
               <CabinetTab />
           </div>
        </>
    )
}

export default Cabinet
