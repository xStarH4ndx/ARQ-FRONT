import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREAR_USUARIO } from '../graphql/usuarios';
import {
  TextField,
  Button,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
} from '@mui/material';

const CrearUsuarioForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    accountLocked: true, // La cuenta siempre bloqueada
    roles: [1], // Roles seleccionados (1: Profesor por defecto)
  });

  const [crearUsuario, { data, loading, error }] = useMutation(CREAR_USUARIO);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (name === 'roles') {
      setFormData((prev) => {
        // Si el rol ya está seleccionado, eliminarlo. Si no está, agregarlo.
        const newRoles = checked
          ? [...prev.roles, parseInt(value)]  // Se asegura que el valor sea numérico
          : prev.roles.filter((role) => role !== parseInt(value)); // Elimina el rol si no está marcado
        return { ...prev, roles: newRoles };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Validación simple: asegurarse de que todos los campos estén completos
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.password) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      await crearUsuario({
        variables: {
          usuarioDto: {
            ...formData,
            enabled: true, // Cuenta siempre activa
            id: 0,
          },
        },
      });
      alert("¡Usuario creado con éxito!");
    } catch (e) {
      console.error("Error creando usuario:", e);
    }
  };

  return (
    <Paper elevation={4} sx={{ maxWidth: 500, mx: 'auto', mt: 5, p: 4, borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom align="center">
        Crear Usuario
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
          Rellena el formulario para crear un nuevo usuario.
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          name="nombre"
          label="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          name="apellido"
          label="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          fullWidth
          margin="normal"
          required
        />

        <TextField
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          fullWidth
          margin="normal"
          required
        />

        {/* Checkbox para seleccionar los roles */}
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.roles.includes(1)}
              onChange={handleChange}
              name="roles"
              value="1" // Se asegura que el valor es un string
            />
          }
          label="Profesor"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.roles.includes(2)}
              onChange={handleChange}
              name="roles"
              value="2" // Se asegura que el valor es un string
            />
          }
          label="Admin"
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          color='info'
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear Usuario"}
        </Button>

        {error && (
          <Typography color="error" mt={2}>
            {error.message}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default CrearUsuarioForm;
