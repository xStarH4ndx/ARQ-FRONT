import React, { useState } from 'react';
import { TextField, Checkbox, FormControlLabel, Button, Paper, Typography, Box, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import '../../index.css'; // Importar el archivo CSS

const SolicitudForm: React.FC = () => {
  const userId = "12345"; // El ID del usuario se obtiene del usuario que ha iniciado sesión
  const [formData, setFormData] = useState({
    id_usuario: userId,
    id_asignatura: '',
    id_laboratorio: '',
    fecha_solicitud: '',
    fecha_uso: '',
    horario: '',
    cant_grupos: '',
    estado_tarea: false,
    estado_alerta: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> | React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    const { name, value } = e.target;

    if (name) {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar los datos al backend
    console.log('Datos enviados:', formData);
  };

  return (
    <Box className="form-container">
      <Paper elevation={3} className="form-paper">
        <Typography variant="h4" gutterBottom>
          Crear Solicitud
        </Typography>
        <form className="solicitud-form" onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: '400px', overflowY: 'auto' }}>
            <TextField
              fullWidth
              label="Usuario"
              name="id_usuario"
              value={formData.id_usuario}
              variant="filled"
              InputProps={{
                readOnly: true,
              }}
            />
            <FormControl fullWidth variant="filled" sx={{ textAlign: 'left' }}>
              <InputLabel>Asignatura</InputLabel>
              <Select
                name="id_asignatura"
                value={formData.id_asignatura}
                onChange={handleChange}
              >
                <MenuItem value=""><em>Ninguno</em></MenuItem>
                <MenuItem value="asignatura1">Asignatura 1</MenuItem>
                <MenuItem value="asignatura2">Asignatura 2</MenuItem>
                <MenuItem value="asignatura3">Asignatura 3</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth variant="filled" sx={{ textAlign: 'left' }}>
              <InputLabel>Laboratorio</InputLabel>
              <Select
                name="id_laboratorio"
                value={formData.id_laboratorio}
                onChange={handleChange}
              >
                <MenuItem value=""><em>Ninguno</em></MenuItem>
                <MenuItem value="laboratorio1">Laboratorio 1</MenuItem>
                <MenuItem value="laboratorio2">Laboratorio 2</MenuItem>
                <MenuItem value="laboratorio3">Laboratorio 3</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Fecha Solicitud"
              name="fecha_solicitud"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.fecha_solicitud}
              onChange={handleChange}
              variant="filled"
            />
            <TextField
              fullWidth
              label="Fecha Uso"
              name="fecha_uso"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.fecha_uso}
              onChange={handleChange}
              variant="filled"
            />
            <TextField
              fullWidth
              label="Horario"
              name="horario"
              type="text"
              value={formData.horario}
              onChange={handleChange}
              variant="filled"
            />
            <TextField
              fullWidth
              label="Cantidad de Grupos"
              name="cant_grupos"
              type="number"
              value={formData.cant_grupos}
              onChange={handleChange}
              variant="filled"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="estado_tarea"
                  checked={formData.estado_tarea}
                  onChange={handleCheckboxChange}
                />
              }
              label="Estado Tarea"
            />
            <TextField
              fullWidth
              label="Estado Alerta"
              name="estado_alerta"
              type="text"
              value={formData.estado_alerta}
              onChange={handleChange}
              variant="filled"
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Enviar Solicitud
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SolicitudForm;