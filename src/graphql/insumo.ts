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

export const STOCK_INSUMOS = gql`
  query stockInsumosDisponibles {
    stockInsumosDisponibles {
      id
      nombre
      tipo
      unidadMedida
      stockDisponible
    }
  }
`;

export const MODIFICAR_INSUMO = gql`
  mutation modificarInsumo($id: ID!, $input: InsumoInput!) {
    modificarInsumo(id: $id, input: $input) {
      id
      nombre
      tipo
      unidadMedida
      stockDisponible
    }
  }
`;