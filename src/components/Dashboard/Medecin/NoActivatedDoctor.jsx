import React from 'react';
import { Link } from 'react-router-dom';

function NoActivatedDoctor() {
  return <div>
<section className="px-2 pt-32 bg-white md:px-0">
    <div className="container items-center max-w-6xl px-5 mx-auto space-y-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-left text-gray-900 sm:text-5xl md:text-6xl md:text-center">
            <span className="block">Bonjour! <span className="block mt-1 text-primary lg:inline lg:mt-0"> Cher Medecin</span></span>
        </h1>
        <p className="w-full mx-auto text-base text-left text-gray-500 sm:text-lg lg:text-2xl md:max-w-3xl md:text-center">
            Votre demande est en cours de traitement,
        </p>
        <p className="w-full mx-auto text-base text-left text-gray-500 sm:text-lg lg:text-2xl md:max-w-3xl md:text-center">
            Attendez la validation par l'administrateur
        </p>
        <div className="relative flex flex-col justify-center md:flex-row md:space-x-4">
            <Link to="/" className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-primary rounded-md md:mb-0 hover:bg-blue-700 md:w-auto">
                Acceuil
            </Link>
        </div>
    </div>
    <div className="container items-center max-w-4xl px-5 mx-auto mt-16 text-center">
        <img src="https://cdn.devdojo.com/images/november2020/hero-image.png" alt="imag" />
    </div>
</section>

  </div>;
}

export default NoActivatedDoctor;
