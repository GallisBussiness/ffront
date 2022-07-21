import { Accordion, AccordionTab } from 'primereact/accordion'
import { useState } from 'react';
import Footer from './Footer'
import Navbar from './Navbar'

function InfoMedecin() {

   const [activeOption,setActiveOption] = useState(0);

    return (
        <>
           <div className="pb-10 flex flex-col justify-start  bg-wave bg-bottom bg-no-repeat">
        <div className="w-full">
            <Navbar />
        </div>
        <div className="flex items-center justify-between mx-5">
         <div className="lg:flex-grow md:w-full flex flex-col md:items-start md:text-left md:mb-0 items-center text-center">
           <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 font-lora">Médecins, optimisez votre gestion du temps</h1>
           <h4 className="hidden lg:inline-block text-2xl font-medium font-roboto">Développez votre patientèle </h4>
         </div>
         <div className="w-full">
            <img src="praticiens.gif" className="rounded-3xl" alt="doctors" />
         </div>
        </div>
     </div>
     <div className="container mx-auto my-20 ">
         <div className="flex flex-col md:flex-row justify-around items-center h-96 mx-20">
             <img src="doctors.gif" alt="doctors" className="md:w-1/3 w-2/3 h-1/2 md:h-full rounded-3xl" />
             <div className="w-full md:w-1/2 text-justify flex flex-col justify-between items-center text-lg font-semi-bold px-2 py-3">
                 <h1 className="font-lora font-bold text-3xl my-5">
                 Professionnels de santé
                 </h1>
                 <div className="text-lg font-roboto text-justify">
                 Simplifiez votre quotidien administratif grâce à la prise de 
                 rendez-vous médicaux en ligne associée à des fonctionnalités innovantes
                  telles que l'édition d'ordonnances et la facturation en ligne
                 </div>
             </div>
         </div>
     </div>
     <div className="container mx-auto my-20">
         <div className="flex flex-col-reverse md:flex-row justify-around items-center h-96 mx-20">
             <div className="w-full md:w-1/2 text-justify flex flex-col justify-between items-center text-lg font-semi-bold px-2 py-3">
                 <h1 className="font-lora font-bold text-3xl my-5">
                 Téléconsultation médicale
                 </h1>
                 <div className="text-lg text-justify font-roboto">
                 Réduisez la distance et améliorez l'accès aux soins pour vos patients grâce à la téléconsultation (visioconférence)
                 </div>
             </div>
             <img src="praticiens.gif" alt="doctors" className="w-2/3 md:w-1/3 h-1/2 md:h-full rounded-3xl" />
         </div>
     </div>

     <section class="text-gray-600 my-4">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center items-center w-full mb-20 space-y-10">
      <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900 font-lora">Tarifs</h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-2xl font-semibold font-roboto text-gray-500">Bénéficiez de nos offres très avantageuses à des prix battant toute concurrence</p>
      <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900 font-lora">Offre de base à partir de 6.500 FCFA par mois</h1>
    </div>
    <div class="flex flex-wrap -m-4">
      <div class="p-4 xl:w-1/3 md:w-1/2 w-full">
        <div class="h-full p-6 rounded-lg border-2 border-primary flex flex-col relative overflow-hidden">
          <h2 class="text-lg tracking-widest  mb-1 font-semibold font-lora">Pack Individuel</h2>
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Référencement web
          </p>
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Organiser son agenda
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Confirmer des demandes de rendez-vous
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Consulter le carnet de santé
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Email de rappel
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Donner des notes de consulatation
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Module de gestion des patients
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Application mobile
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>SMS Offerts(50)
          </p>
         
        </div>
      <div className="my-4">
         <Accordion activeIndex={activeOption} onTabChange={(e) => setActiveOption(e.index)}>
      <AccordionTab header="En Option">
      <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Module Facturation
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Module Edition d'ordonnances
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Module Comptabilité
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Module Gestion des Assurances
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Module Téléconsultation médicale
          </p>
      </AccordionTab>
    </Accordion>
      </div>
   
      </div>
      <div class="p-4 xl:w-1/3 md:w-1/2 w-full">
        <div class="h-full p-6 rounded-lg border-2 border-primary flex flex-col relative overflow-hidden">
          <h2 class="text-lg tracking-widest font-lora mb-1 font-semibold">Pack Structure</h2>
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Référencement web
          </p>
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Organiser son agenda
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Confirmer des demandes de rendez-vous
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Consulter le carnet de santé
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Email de rappel
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Donner des notes de consulatation
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Module de gestion des patients
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Application mobile
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>SMS Offerts(50)
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-blue-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Tableau de board Gérant
          </p>
        </div>
      </div>
      <div class="p-4 xl:w-1/3 md:w-1/2 w-full">
        <div class="h-full p-6 rounded-lg border-2 border-primary flex flex-col relative overflow-hidden">
          <h2 class="text-lg font-lora tracking-widest mb-1 font-medium">Pack Secrétariat décentralisé</h2>
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Référencement web
          </p>
          <p class="flex items-center text-gray-600 mb-2">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Organiser son agenda
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Confirmer des demandes de rendez-vous
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Consulter le carnet de santé
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Email de rappel
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Donner des notes de consulatation
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Module de gestion des patients
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Application mobile
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-green-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>SMS Offerts(50)
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-blue-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Tableau de board Gérant
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-blue-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Assurer un accueil téléphonique personalisé des patients
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="bg-blue-500 w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Donner des rendez-vous
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
<Footer />
        </>
    )
}

export default InfoMedecin
