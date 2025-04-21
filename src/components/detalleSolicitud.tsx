import React from 'react';
import { Box, Typography, Chip, Button, Paper } from '@mui/material';
import { Solicitud } from '../types';

interface Props {
  solicitud: Solicitud;
  onClose: () => void;
}

const DetalleSolicitud: React.FC<Props> = ({ solicitud, onClose }) => {
  const handleConfirmar = () => {
    // Aquí deberías llamar a una mutación GraphQL para confirmar la solicitud
    console.log('Solicitud confirmada:', solicitud);
    alert('Solicitud confirmada');
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 2, maxWidth: 500 }}>
      <Typography variant="h6" gutterBottom>
        Detalles de la solicitud
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>Asignatura:</strong> {solicitud.asignatura?.nombre}
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>Profesor:</strong> {solicitud.usuario?.nombre} {solicitud.usuario?.apellido}
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>Laboratorio:</strong> {solicitud.laboratorio?.nombre}
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>Fecha de uso:</strong> {solicitud.fechaUso}
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>Horario:</strong> {solicitud.horario}
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>Cantidad de grupos:</strong> {solicitud.cantGrupos}
      </Typography>

      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Insumos solicitados:
      </Typography>

      <Box mt={1}>
        {solicitud.insumos?.length > 0 ? (
          solicitud.insumos.map((item, index) => (
            <Chip
              key={index}
              label={`${item.insumo?.nombre} - ${item.cantidad} ${item.insumo?.unidadMedida}`}
              sx={{ mr: 1, mb: 1 }}
            />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">No se solicitaron insumos</Typography>
        )}
      </Box>

      <Box mt={3} display="flex" gap={2} flexWrap="wrap">
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
