import { useQuery } from '@apollo/client';
import { useUserStore } from '../store/UserStorage';
import { OBTENER_USUARIO_POR_EMAIL } from '../graphql/usuarios';
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Grid,
  Avatar,
  Box,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const UsuarioPerfil = () => {
  const email = useUserStore((state) => state.getEmail());

  const { data, loading, error } = useQuery(OBTENER_USUARIO_POR_EMAIL, {
    variables: { email },
    skip: !email,
  });

  if (loading) return <Box display="flex" justifyContent="center" mt={6}><CircularProgress /></Box>;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  const usuario = data?.obtenerUsuarioPorEmail;
  useUserStore.getState().setId(usuario?.id);

  if (!usuario) {
    return <Typography>No se encontró información del usuario.</Typography>;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
      <Paper elevation={3} sx={{ p: 3, maxWidth: 500, width: '100%', borderRadius: 6}}>
        <Typography variant="h5" gutterBottom>
          Perfil de Usuario
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          {/* Columna izquierda: avatar */}
          <Grid display="flex" justifyContent="center" alignItems="center">
            <Avatar sx={{ bgcolor: '#1976d2', width: 120, height: 120 }}>
              <PersonIcon sx={{ fontSize: 60 }} />
            </Avatar>
          </Grid>

          {/* Columna derecha: datos */}
          <Grid textAlign={'left'}>
            <Typography><strong>ID:</strong> {usuario.id}</Typography>
            <Typography><strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}</Typography>
            <Typography><strong>Email:</strong> {usuario.email}</Typography>
            <Typography><strong>Cuenta bloqueada:</strong> {usuario.accountLocked ? 'Sí' : 'No'}</Typography>
            <Typography><strong>Cuenta activa:</strong> {usuario.enabled ? 'Sí' : 'No'}</Typography>
            <Typography><strong>Roles:</strong> {usuario.roles?.map((r: any) => r.name).join(', ')}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default UsuarioPerfil;
