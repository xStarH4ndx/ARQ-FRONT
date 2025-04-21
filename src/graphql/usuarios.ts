import { gql } from '@apollo/client';

export const CREAR_USUARIO = gql`
  mutation crearUsuario($usuarioDto: UsuarioDto) {
    crearUsuario(usuarioDto: $usuarioDto) {
      id
      nombre
      apellido
      email
      accountLocked
      enabled
      roles {
        id
        name
      }
    }
  }
`;

export const ELIMINAR_USUARIO = gql`
  mutation eliminarUsuario($usuarioId: ID!) {
    eliminarUsuario(usuarioId: $usuarioId)
  }
`;

export const LISTAR_USUARIOS = gql`
  query ListarUsuarios {
    listarUsuarios {
      id
      nombre
      apellido
      email
      accountLocked
      enabled
      roles {
        id
        name
      }
    }
  }
`;

export const OBTENER_USUARIO_POR_EMAIL = gql`
  query ObtenerUsuarioPorEmail($email: String!) {
    obtenerUsuarioPorEmail(email: $email) {
      id
      nombre
      apellido
      email
      telephone
      accountLocked
      enabled
      roles {
        id
        name
      }
    }
  }
`;