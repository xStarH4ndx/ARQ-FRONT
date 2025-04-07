import React from 'react';
import { Box, Typography, Chip, Button, Paper } from '@mui/material';
import { Solicitud } from '../types/types';

interface Props {
  solicitud: Solicitud;
  onClose: () => void;
}

const DetalleSolicitud: React.FC<Props> = ({ solicitud, onClose }) => {
  const handleConfirmar = () => {
    //CONECTAR CON API PARA CONFIRMAR SOLICITUD
    solicitud.estado = true;
    console.log('Solicitud confirmada:', solicitud);
    alert('Solicitud confirmada');
  }
  return (
    <Paper elevation={3} sx={{ p: 3, mt: 2, maxWidth: 400}}>
      <Typography variant="h6" gutterBottom>
        Detalles de la solicitud
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Asignatura:</strong> {solicitud.asignatura}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Profesor:</strong> {solicitud.profesor}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Laboratorio:</strong> {solicitud.laboratorio}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Fecha:</strong> {solicitud.fechaUso}
      </Typography>

      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Insumos:
      </Typography>
      <Box mt={1}>
        {solicitud.insumos.map((insumo, index) => (
          <Chip
            key={index}
            label={`${insumo.nombre} - ${insumo.cantidad} ${insumo.medida}`}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Box>

      <Box mt={3} display="flex" gap={2}>
        <Button onClick={handleConfirmar} variant="contained" color="success">
          Confirmar
        </Button>
        <Button variant="outlined" color="error">
          Eliminar solicitud
        </Button>
        <Button onClick={onClose}>Cerrar</Button>
      </Box>
    </Paper>
  );
};

export default DetalleSolicitud;
