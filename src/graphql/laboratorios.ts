import { gql } from '@apollo/client';

export const CREAR_LABORATORIO = gql`
  mutation CrearLaboratorio($nombre: String!, $codigo: String!) {
    crearLaboratorio(nombre: $nombre, codigo: $codigo) {
      id
      nombre
      codigo
    }
  }
`;

export const LISTAR_LABORATORIOS = gql`
  query ListarLaboratorios {
    listarLaboratorios {
      id
      nombre
      codigo
    }
  }
`;
