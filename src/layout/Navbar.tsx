import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/UserStorage';

const Navbar = () => {
  const navigate = useNavigate();
  const email= useUserStore((state) => state.getEmail());
  const role = useUserStore((state) => state.getRole());
  
  // Opciones según el rol
  const menuOptions = role === 'teacher' ? [
    { label: 'Mis Solicitudes', path: '/teacher-solicitudes' },
    { label: 'Crear Solicitud', path: '/teacher-crearSolicitud' },
    { label: 'Mi Cuenta', path: '/teacher' }
  ] : role === 'admin' ? [
    { label: 'Solicitudes', path: '/admin-solicitudes' },
    { label: 'Historial', path: '/admin-historial' },
    { label: 'Dashboard', path: '/admin-dashboard'}
  ] : [];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component={"div"} sx={{ flexGrow: 1, textAlign: 'left' }}>
            Bienvenido, {email || 'Usuario'}
          </Typography>
          {menuOptions.map((option) => (
            <Button key={option.label} color="inherit" variant='text'sx={{marginRight:1.2}} onClick={() => navigate(option.path)}>
              {option.label}
            </Button>
          ))}
          <Button color="error" variant="outlined" onClick={handleLogout} sx={{ ml: 0 }}>
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
