import React from 'react'
import Header from './Header'
import Footer from './Footer'
function Home() {
    return (
        <>
            <Header />
            <div className="flex  items-center justify-evenly">

            <div className="w-full py-8 px-8 shadow-lg rounded-lg my-10 mx-8 bg-white">
                <div className="flex justify-center md:justify-start -mt-16 -ml-16">
                 <img className="w-20 h-20 object-cover rounded-full border-4 border-blue-50" src="pro_med.png" alt="img" />
                </div>
        <div>
              <h2 className="text-gray-800 text-3xl font-semibold text-center font-lora">Professionnel de la santé</h2>
        <p className="mt-2 text-lg font-semibold text-gray-600 font-roboto  text-justify">Simplifiez votre quotidien administratif grâce à la prise de rendez-vous médicaux en ligne associée à des fonctionnalités innovantes telles que l'édition d'ordonnances et la facturation en ligne</p>
            </div>
            </div>

            <div className="w-full py-10 px-6 shadow-lg rounded-lg my-10 mx-10 bg-white">
                <div className="flex justify-center md:justify-end -mt-24 -mr-16">
                 <img className="w-20 h-20 object-cover rounded-full border-4 border-blue-50" src="booking.png" alt="img" />
                </div>
        <div>
              <h2 className="text-gray-800 text-3xl font-semibold text-center font-lora">Téléconsultation médicale</h2>
        <p className="mt-2 text-lg font-semibold text-gray-600 font-roboto text-justify">Faire ses rendez-vous à distance (Téléconsultation) devient possible</p>
            </div>
            </div>
            </div>
            <div className="w-2/3 mx-auto mb-6">
            <div className="flex items-center justify-around p-4 bg-white border-2 border-blue-200 rounded-lg shadow-sm dark:bg-gray-800">
      <div className="p-3 mr-4 w-1/2">
      <img className="w-full h-full object-cover object-center" src="fiche.gif" alt="img" />
      </div>
      <div>
        <p className="mb-2 text-3xl font-bold text-gray-900 font-lora">Patient</p>
    <p className="text-lg font-semibold text-gray-800 font-roboto">Une fiche santé est mise à votre disposition une fois que votre compte est créé afin de vous permettre d'avoir une vision élargie et un suivi de l'évolution de votre santé</p>
      </div>
    </div>
            </div>
            <Footer />
        </>
    )
}

export default Home
