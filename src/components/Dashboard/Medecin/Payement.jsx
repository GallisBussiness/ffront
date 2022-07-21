import { InputNumber } from 'primereact/inputnumber'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { useState } from 'react'
import { FiPackage } from 'react-icons/fi'
import { usePaymentStore } from './PaymentStore'
import shallow from 'zustand/shallow';

const Payement = ({auth}) => {
  const [nbMonth,setNbMonth] = useState(1)
  const [isPrescription,setIsPrescription] = useState(false)
  const [isFacturation,setIsFacturation] = useState(false)
  const [isAssurance,setIsAssurance] = useState(false)
  const [isComptabilite,setIsComptabilite] = useState(false)
  const [isTeleconsultation,setIsTeleconsultation] = useState(false)
  const [pack,setPack] = useState('INDIVIDUEL')
  const [isLoading,setIsLoading] = useState(false);



  const handleTeleconsultation = (e) => {
    setIsTeleconsultation(e.checked)
    toggleTeleconsultation(e.checked)
  }

  const handleFacturation = (e) => {
    setIsFacturation(e.checked)
    toggleFacturation(e.checked)
  }

  const handleOrdonnance = (e) => {
    setIsPrescription(e.checked)
    toggleOrdonnance(e.checked)
  }

  const handleComptabilite = (e) => {
    setIsComptabilite(e.checked)
    toggleComptabilite(e.checked)
  }

  const handleAssurance = (e) => {
    setIsAssurance(e.checked)
    toggleAssurance(e.checked)
  }

  const packs = [
    {label: 'INDIVIDUEL', value: 'INDIVIDUEL',price:6500},
];


const {
  total,
  teleconsultation,
  facturation,
  comptabilite,
  assurance,
  toggleAssurance,
  toggleTeleconsultation,
  toggleFacturation,
  toggleComptabilite,
  toggleOrdonnance
} = usePaymentStore(state => (
  {total:state.total,
    teleconsultation: state.teleconsultation,
    facturation: state.facturation,
    comptabilite: state.comptabilite,
    assurance: state.assurance,
    toggleAssurance:state.toggleAssurance,
    toggleTeleconsultation:state.toggleTeleconsultation,
    toggleFacturation:state.toggleFacturation,
    toggleOrdonnance:state.toggleOrdonnance,
    toggleComptabilite:state.toggleComptabilite
  }),shallow)


  const getChecked = () => {
    const tab = [];
    if(isTeleconsultation) tab.push({name: 'prescription',price: teleconsultation });
    if(isAssurance) tab.push({name: 'assurance', price: assurance });
    if(isComptabilite) tab.push({name: 'comptabilite', price: comptabilite });
    if(isFacturation) tab.push({name: 'facturation', price: facturation});
    return tab;
  }

  const handlePayment = () => {
    setIsLoading(true);
    const ob = {duree:nbMonth,price: nbMonth * total,doctorId: auth?._id,pack:{ name: "INDIVIDUEL", price: 6500, options: getChecked()}};
    (new window.PayTech(
      {
        data: JSON.stringify(ob)
      }
    ))
    .withOption({
      requestTokenUrl         :`http://localhost:3100/medecin/paiement/${auth?._id}`,
      method              :   'POST',
      headers             :   {
          "Accept":    "text/html"
      },
      prensentationMode   :   window.PayTech.OPEN_IN_POPUP,
      willGetToken        :   function () {
         
      },
      didGetToken         : function (token, redirectUrl) {
        setIsLoading(false);
      },
      didReceiveError: function (error) {
         setIsLoading(false);
      },
      didReceiveNonSuccessResponse: function (jsonResponse) {
         setIsLoading(false);
      }
  }).send();
  }

  return (
    <>
      <div className="bg-white w-1/2 py-6 mx-auto my-20">
          <h1 className="text-lg font-bold uppercase py-6 text-center"> Payez votre abonnement Freedocteur</h1>
          <div className="flex items-center justify-center">
             <img src="/paiement.png" alt="paiement" className="h-48 w-full object-cover" />
          </div>
           <div className="flex flex-col items-center justify-center mx-6 space-y-2">
           <h1 className="text-lg font-semibold text-center"> Entrer le nombre de mois</h1>
           <InputNumber value={nbMonth} onValueChange={(e) => setNbMonth(e.value)} suffix=" mois" min={1} max={12} className="w-full" />
           <h1 className="text-lg font-semibold text-center"> Votre pack d'abonnement </h1>
           <Dropdown value={pack} options={packs} onChange={(e) => setPack(e.value)} valueTemplate={packTemplate} placeholder="Selectionner votre pack" className="w-full"/>
           <h1 className="text-lg font-semibold text-center"> Les options : </h1>
           <div className="flex items-center space-x-2 w-full self-start space-y-2">
           <Checkbox id="prescription" onChange={handleOrdonnance} checked={isPrescription}></Checkbox>
           <label htmlFor="prescription" className="text-lg font-semibold">Module Edition d'ordonnance</label>
           </div>
           <div className="flex items-center space-x-2 w-full self-start space-y-2">
           <Checkbox id="facturation" onChange={handleFacturation} checked={isFacturation}></Checkbox>
           <label htmlFor="facturation" className="text-lg font-semibold">Module Facturation</label>
           </div>
           <div className="flex items-center space-x-2 w-full self-start space-y-2">
           <Checkbox id="assurance" onChange={handleAssurance} checked={isAssurance}></Checkbox>
           <label htmlFor="assurance" className="text-lg font-semibold">Module Gestion Assurance</label>
           </div>
           <div className="flex items-center space-x-2 w-full self-start space-y-2">
           <Checkbox id="comptabilite" onChange={handleComptabilite} checked={isComptabilite}></Checkbox>
           <label htmlFor="comptabilite" className="text-lg font-semibold">Module Comptabilité</label>
           </div>
           <div className="flex items-center space-x-2 w-full self-start space-y-2">
           <Checkbox id="teleconsultation" onChange={handleTeleconsultation} checked={isTeleconsultation}></Checkbox>
           <label htmlFor="teleconsultation" className="text-lg font-semibold">Module Téléconsultation</label>
           </div>
           <Button label={`Proceder au paiement`} loading={isLoading} onClick={handlePayment} />
           </div>
      </div>
    </>
  )
}

export default Payement


const packTemplate = (option, props) => {
  if (option) {
      return (
          <div className="flex item-center justify-center">
             <FiPackage className="h-6 w-6"/>
              <div>{option.value}</div>
          </div>
      );
  }

  return (
      <>
          {props.placeholder}
      </>
  );
}