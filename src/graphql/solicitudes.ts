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

export const SOLICITUDES_PROFESOR_QUERY = gql`
  query SolicitudesDelProfesor($idUsuario: ID!) {
    solicitudesDelProfesor(idUsuario: $idUsuario) {
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