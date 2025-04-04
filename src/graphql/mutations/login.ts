import { gql } from '@apollo/client'

export const LOGIN_ADMIN = gql`
  mutation LoginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      access_token
    }
  }
`

export const LOGIN_PARENT = gql`
  mutation LoginParent($email: String!, $password: String!) {
    loginParent(email: $email, password: $password) {
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
