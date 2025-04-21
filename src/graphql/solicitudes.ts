import { gql } from '@apollo/client';

export const LISTAR_SOLICITUDES = gql`
  query ListarSolicitudes {
    listarSolicitudes {
      id
      fechaUso
      horario
      cantGrupos
      estado
      usuario {
        nombre
        apellido
      }
      asignatura {
        nombre
      }
      laboratorio {
        nombre
      }
      insumos {
        cantidad
        insumo {
          nombre
          unidadMedida
        }
      }
    }
  }
`;
