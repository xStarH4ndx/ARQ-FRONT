import { gql } from '@apollo/client'

export const GET_USUARIOS = gql`
  query ObtenerUsuarios {
    obtenerUsuarios {
      id
      nombre
      email
      rol
    }
  }
`
