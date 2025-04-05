import { gql } from '@apollo/client';

// Definir la mutación para crear solicitud
export const CREAR_SOLICITUD = gql`
  mutation CrearSolicitud($input: CrearSolicitudInput!) {
    crearSolicitud(input: $input) {
      id
      fechaUso
    }
  }
`;