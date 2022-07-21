import {gql} from '@apollo/client';

export const CREATE_PATIENT = gql`
mutation regsiterPatient($firstname: String!,$lastname: String!,$phoneNumber: String!,$email: String!,$password: String!) {
    registerPatient(input: 
      {,firstname:$firstname,lastname:$lastname,phoneNumber:$phoneNumber,email:$email,password:$password}){
      code,
      data{
          phoneNumber,firstname,lastname
        }
    }
  }
`;

export const CREATE_MEDECIN = gql`
mutation regsiterMedecin($firstname: String,$lastname: String,$phoneNumber: String!,$email: String!,$specialite: String!,$password: String!) {
    registerMedecin(input: 
      {firstname:$firstname,lastname:$lastname,phoneNumber:$phoneNumber,email:$email,specialite:$specialite,password:$password}){
      code,data
      {phoneNumber,firstname,lastname}}
  }
`;

export const LOGIN_USER = gql`
mutation loginUser($phoneNumber: String!,$password: String!){
  loginUser(input:{phoneNumber:$phoneNumber,password:$password}){
  code
  data {
    token,
    tokenExpiration
    user {
      _id,
      firstname,
      lastname,
      email,
      phoneNumber
      specialite
    }
  }
  }
}
`;


export const CREATE_SCHEDULE = gql`
mutation CreateSchedule($id:ID!,$code:TypeDay!,$hour_start:String!,$hour_end:String!){
  createSchedule(input:{
    medecin:$id,
    days:{
      code:$code,
      interval:{
        slot:{
          hour_start:$hour_start,
          hour_end:$hour_end
        }
      }
    }
  }) {
    code
    error
    data{
      days {
        code
        interval{
          slot {
            hour_start
            hour_end
          }
        }
      }
    }
  }
}
`;