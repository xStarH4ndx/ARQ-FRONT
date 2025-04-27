import { gql } from '@apollo/client';

export const LISTAR_SOLICITUDES_APROBADAS = gql`
  query ListarSolicitudesAprobadas {
    listarSolicitudesAprobadas {
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

export const LISTAR_SOLICITUDES_RECHAZADAS = gql`
  query ListarSolicitudesRechazadas {
    listarSolicitudesRechazadas {
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

export const CREAR_SOLICITUD = gql`
  mutation CrearSolicitud($input: CrearSolicitudInput!) {
    crearSolicitud(input: $input) {
      id
      fechaUso
    }
  }
`;

export const ELIMINAR_SOLICITUD = gql`
  mutation EliminarSolicitud($idSolicitud: ID!) {
    eliminarSolicitud(idSolicitud: $idSolicitud)
  }
`;

export const CONFIRMAR_SOLICITUD = gql`
  mutation ConfirmarSolicitud($idSolicitud: ID!) {
    confirmarSolicitud(idSolicitud: $idSolicitud) {
      id
      fechaUso
      estado
    }
  }
`;