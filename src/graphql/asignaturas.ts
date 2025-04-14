import { gql } from '@apollo/client';

export const CREAR_ASIGNATURA = gql`
  mutation CrearAsignatura($nombre: String!, $codigo: String!) {
    crearAsignatura(nombre: $nombre, codigo: $codigo) {
      id
      nombre
      codigo
    }
  }
`;

export const LISTAR_ASIGNATURAS = gql`
  query ListarAsignaturas {
    listarAsignaturas {
      id
      nombre
      codigo
    }
  }
`;
