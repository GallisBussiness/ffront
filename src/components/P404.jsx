import React from 'react'
import {Link} from 'react-router-dom';

function P404() {
    return (
        <>

<div className="h-screen w-screen bg-blue-600 flex justify-center items-center flex-wrap">
  <p className="text-white font-extrabold" style={{fontSize:"180px"}}>404</p>
</div>

<div className="absolute w-screen bottom-0 mb-12 text-white text-center text-xl">
	<span className="opacity-50">Retourner à la page d'acceuil</span>
 	<Link className="border-b" to="/">Freedocteur</Link>
</div>  
        </>
    )
}

export default P404
