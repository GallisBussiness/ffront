import React from 'react'
import AppoinmentTab from '../../Appointment/AppoinmentTab'

function Rendezvous({auth}) {
    return (
        <>
            <div className="mx-6 my-4">
                    <div className="flex items-center h-40  bg-primary rounded-3xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-28 w-28 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <p className="text-bold text-5xl text-white">Rendez-vous</p>
                    </div>
                    <div className="my-3 rounded-3xl bg-gray-100 min-h-96 px-4">
                    <AppoinmentTab auth={auth} />  
                    </div>
        </div>    
        </>
    )
}

export default Rendezvous
