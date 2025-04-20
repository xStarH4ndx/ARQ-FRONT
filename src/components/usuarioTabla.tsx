import { useQuery, useMutation } from '@apollo/client';
import { LISTAR_USUARIOS, ELIMINAR_USUARIO } from '../graphql/usuarios';
import {
  Button, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Stack,
  Tab
} from '@mui/material';

const UsuariosTabla = () => {
  const { data, loading, error, refetch } = useQuery(LISTAR_USUARIOS);
  const [eliminarUsuario, { loading: eliminando }] = useMutation(ELIMINAR_USUARIO);

  const handleEliminar = async (usuarioId: string) => {
    try {
      await eliminarUsuario({ variables: { usuarioId } });
      alert("¡Usuario eliminado con éxito!");
      await refetch(); // Volver a cargar los usuarios
    } catch (e) {
      console.error("Error eliminando usuario:", e);
      alert("Hubo un error al eliminar al usuario.");
    }
  };

  if (loading) return <Typography variant="h6">Cargando usuarios...</Typography>;
  if (error) return <Typography color="error">Error al cargar usuarios: {error.message}</Typography>;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 3, padding: 2 }}>
    <Typography variant="h6" justifyContent={"center"} marginBottom={2} position={"absolute"}>
        Total de Usuarios: {data.listarUsuarios.length}
    </Typography>
      <Stack direction="row" justifyContent="flex-end" marginBottom={2}>
        <Button variant="contained" color='success' onClick={() => refetch()}>
          Actualizar Tabla
        </Button>
      </Stack>
      <TableContainer>
        <Table aria-label="usuarios tabla">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Cuenta Activa</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.listarUsuarios.map((usuario: any) => (
              <TableRow key={usuario.id}>
                <TableCell>{usuario.nombre}</TableCell>
                <TableCell>{usuario.apellido}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.enabled ? 'Sí' : 'No'}</TableCell>
                <TableCell>
                  {/* Mostrar los roles */}
                  {usuario.roles.map((role: any, index: number) => (
                    <span key={role.id}>
                      {role.name}
                      {index < usuario.roles.length - 1 && ', '}
                    </span>
                  ))}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleEliminar(usuario.id)}
                    disabled={eliminando}
                  >
                    {eliminando ? 'Eliminando...' : 'Eliminar'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UsuariosTabla;
