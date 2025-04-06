import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}'); // Obtener usuario de localStorage
//   const role = user?.role || ''; // Obtener rol
  const role = 'Admin'; // Obtener rol

  // Opciones según el rol
  const menuOptions = role === 'Teacher' ? [
    { label: 'Mis Solicitudes', path: '/mis-solicitudes' },
    { label: 'Crear Solicitud', path: '/crear-solicitud' }
  ] : role === 'Admin' ? [
    { label: 'Solicitudes', path: '/admin-solicitudes' },
    { label: 'Registro', path: '/admin-inventario' }
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
            Bienvenido, {user?.name || 'Usuario'}
          </Typography>
          {menuOptions.map((option) => (
            <Button key={option.label} color="inherit" variant='outlined'sx={{marginRight:1.2}} onClick={() => navigate(option.path)}>
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
