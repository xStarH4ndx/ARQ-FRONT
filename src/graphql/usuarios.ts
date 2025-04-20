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
