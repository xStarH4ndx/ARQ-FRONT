import { gql } from '@apollo/client';

export const LISTAR_INSUMOS = gql`
  query listarInsumos {
    listarInsumos {
      id
      nombre
      tipo
      unidadMedida
      stockDisponible
    }
  }
`;