import React, { ChangeEvent, FormEvent, useState } from 'react';
import {
  Typography, Paper, TextField, Button, IconButton, Link, Snackbar,
  Alert, ToggleButton, ToggleButtonGroup,
  Box
} from '@mui/material';
import { AccountCircle, LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/UserStorage';
import { useUsuarios } from '../../hooks/useUsuarios';

export const LoginPage: React.FC = () => {
  const { setUserData } = useUserStore();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<'profesor' | 'personal'>('profesor');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleRoleChange = (event: React.MouseEvent<HTMLElement>, newRole: 'profesor' | 'personal' | null) => {
    if (newRole) setRole(newRole);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const loginFunction =
        role === 'profesor'
          ? useUsuarios.loginTeacher
          : useUsuarios.loginPersonal;

      const { access_token } = await loginFunction({ email, password });

      setUserData({
        access_token,
        email,
        role: role === 'profesor' ? 'teacher' : 'personal',
      });

      navigate(role === 'personal' ? '/personal' : '/teacher');

    } catch (error) {
      console.error('Error en el login:', error);
      setErrorMessage('Error en el inicio de sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => setErrorMessage(null);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
      }}
    >
      <Paper 
        elevation={2} 
        sx={{ 
          p: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          width: '320px',
          textAlign: 'center' 
        }}
      >
        <Typography variant="h4">Iniciar Sesión</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Bienvenido, por favor selecciona tu rol e inicia sesión
        </Typography>
  
        <ToggleButtonGroup
          value={role}
          exclusive
          onChange={handleRoleChange}
          aria-label="Seleccionar rol"
          sx={{ mt: 2 }}
        >
          <ToggleButton value="profesor">Acceder como Profesor</ToggleButton>
          <ToggleButton value="personal">Acceder como Personal</ToggleButton>
        </ToggleButtonGroup>
  
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            size="small"
            required
            fullWidth
            value={email}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle fontSize="inherit" />
                </InputAdornment>
              ),
            }}
            variant="filled"
            sx={{ mt: 2 }}
          />
  
          <TextField
            type={showPassword ? "text" : "password"}
            name="password"
            size="small"
            label="Contraseña"
            variant="filled"
            required
            fullWidth
            value={password}
            onChange={handleChange}
            sx={{ mt: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined fontSize="inherit" />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
  
          <Button
            type="submit"
            variant="contained"
            color="info"
            size="small"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Acceder"}
          </Button>
        </form>
  
        <Link href="/" variant="body2" sx={{ mt: 2 }}>
          Olvidé mi contraseña
        </Link>
  
        <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
  
};
