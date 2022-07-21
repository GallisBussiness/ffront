import ReactCodeInput from 'react-verification-code-input'
import {useAuthUser} from 'react-auth-kit'
import { validateUser } from '../../services/UserService'
import { useMutation, useQueryClient } from 'react-query'
import { toast, ToastContainer } from 'react-toastify'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};


function Validation({close}) {
    const auth = useAuthUser()()
    const qc = useQueryClient();
    const key = ["loadPatientInfo"];
    const {mutate} = useMutation(({id,val}) => validateUser({id , verification_code: val}), {
        onSuccess(_) { 
          toast.success('Profile vérifié avec success');
          qc.invalidateQueries(key);
          close()
        },
      })
    const handleComplete = (val) => {
     if(val.length === 6) {
       mutate({id:auth?.userId,val: val})
     }
    }

    return (
        <>
         <div className="flex items-center justify-center w-2/4 h-1/2 bg-gray-200" style={style}>
            <div className="shadow-lg rounded-2xl w-2/3 mx-auto px-6 py-6 bg-white">
    <div className="flex flex-col items-center justify-center">
        <div className="text-gray-800 text-xl font-medium mb-4 mt-4">
            Veuillez entrer le code de verification reçu sur {auth?.username }
        </div>
        <div className="text-gray-400 text-center text-xs px-2 my-4">
        <ReactCodeInput onComplete={handleComplete} />
        </div>
        <div className="flex item-center justify-between">
        <button type="button"
     onClick={close}
     className="inline-block my-4 mx-2 px-6 py-2.5 bg-red-600
      text-white font-medium text-xs leading-tight
       uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg
        focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0
         active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out">annuler</button>
          <button type="button" className="inline-block my-4 mx-2 px-6 py-2.5 bg-green-600
      text-white font-medium text-xs leading-tight
       uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg
        focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0
         active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out">
         valider mon comte
</button>
        </div>
       
    </div>
</div>
    
         </div>
        <ToastContainer />
        </>
    )
}

export default Validation
