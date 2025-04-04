import { gql } from '@apollo/client'

// NO HAY ADMINISTRADORES EN LA BASE DE DATOS
// export const LOGIN_ADMIN = gql`
//   mutation LoginAdmin($email: String!, $password: String!) {
//     loginAdmin(email: $email, password: $password) {
//       access_token
//     }
//   }
// `

export const LOGIN_PERSONAL = gql`
  mutation LoginPersonal($email: String!, $password: String!) {
    loginPersonal(email: $email, password: $password) {
      access_token
    }
  }
`

export const LOGIN_TEACHER = gql`
  mutation LoginTeacher($email: String!, $password: String!) {
    loginTeacher(email: $email, password: $password) {
      access_token
    }
  }
`
