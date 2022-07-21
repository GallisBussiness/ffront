import {gql} from '@apollo/client';
export const FIND_SPECIALITY = gql`
query FindBySpeciality($spc: String!)
 {
  findBySpeciality(spc:$spc)
  {
    code,
    data{
      _id,
      phoneNumber,
      firstname,
      lastname,
      email,
      specialite
    }
  }
}
`

export const GET_ONE_USER = gql`
query getUser($id: String!){
  getOneUser(id:$id) {
    code,
    data {
      _id,
      firstname,
      lastname,
      phoneNumber,
      email,
      specialite
    }
  }
}
`;

export const GET_SCHEDULE_BY_MEDECIN =gql`
query getScheduleByMedecin ($id: ID!){
  getScheduleByMedecin(params:{id:$id}) {
   code,
   data {
     medecin,
     days {
       code
       interval {
         slot {
           hour_start,
           hour_end
         }
       }
     }
   }
 }
 }
`;


export const LOAD_SCHEDULE_BY_MEDECIN = gql`
query getScheduleByMedecin($id:ID!){
  getScheduleByMedecin(params:{id:$id}) {
   code,
   data {
     medecin,
     days {
       interval {
         slot {
           hour_start,
           hour_end
         }
       }
     }
   }
 }
 }
`;