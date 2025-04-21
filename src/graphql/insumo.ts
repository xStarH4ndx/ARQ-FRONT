import { gql } from '@apollo/client';


export const CREAR_INSUMO = gql`
    mutation CrearInsumo(input: InsumoInput!) {
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
    query listarInsumos {
        id
        nombre
        tipo
        unidadMedida
        stockDisponible
    }
`;