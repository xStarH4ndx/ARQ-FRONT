import { gql } from '@apollo/client';


export const CREAR_INSUMO = gql`
  mutation crearInsumo($input: InsumoInput!) {
    crearInsumo(input: $input) {
      id
      nombre
      tipo
      unidadMedida
      stockDisponible
    }
  }
`;

export const LISTAR_INSUMOS = gql`
  query {
    listarInsumos {
      id
      nombre
      tipo
      unidadMedida
      stockDisponible
    }
  }
`;

export const ELIMINAR_INSUMO = gql`
  mutation eliminarInsumo($id: ID!) {
    eliminarInsumo(id: $id)
  }
`;