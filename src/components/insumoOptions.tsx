import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREAR_INSUMO } from '../graphql/insumo'; // Asegúrate de definir esta mutación en tu archivo GraphQL
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const CrearInsumoForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    unidadMedida: '',
    stockDisponible: 0,
  });

  const [crearInsumo, { loading, error }] = useMutation(CREAR_INSUMO);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'cantidad' || name === 'stockDisponible' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { nombre, tipo, unidadMedida, stockDisponible } = formData;

    if (!nombre || !tipo || !unidadMedida || stockDisponible < 0) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    try {
      await crearInsumo({
        variables: {
          input: formData,
        },
      });
      alert("¡Insumo creado con éxito!");
    } catch (e) {
      console.error("Error creando insumo:", e);
    }
  };

  return (
    <Paper elevation={4} sx={{ maxWidth: 500, mx: 'auto', p: 4, borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom align="center">
        Crear Insumo
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Completa el formulario para registrar un nuevo insumo.
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
          name="tipo"
          label="Tipo"
          value={formData.tipo}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="unidadMedida"
          label="Unidad de Medida"
          value={formData.unidadMedida}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="stockDisponible"
          label="Stock Disponible"
          type="number"
          value={formData.stockDisponible}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          color="info"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear Insumo"}
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

export default CrearInsumoForm;
