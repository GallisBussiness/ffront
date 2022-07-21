import { useAuthUser } from 'react-auth-kit';
import { useQuery } from 'react-query';
import { getPatient } from '../../../services/UserService';
import Layout from './Layout';

function DashboardPatient() {
  const auth = useAuthUser()();
  const key = ["loadPatientInfo"];
  const {data:patient} = useQuery(key,() => getPatient(auth?._id), {
    staleTime:1_000_000,
    refetchOnWindowFocus: false,
  })
    return (
        <>
         {patient && <Layout auth={patient} isVerified={patient?.status !== 'DISABLED'} />}
        </>
    )
}

export default DashboardPatient
