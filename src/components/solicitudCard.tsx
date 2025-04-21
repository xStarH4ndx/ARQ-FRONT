import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@mui/material';
import { Solicitud } from '../types/';
import { parseISO, isSameDay } from 'date-fns';

interface Props {
  solicitud: Solicitud;
  onVerDetalles: (solicitud: Solicitud) => void;
}

const SolicitudCard: React.FC<Props> = ({ solicitud, onVerDetalles }) => {
  const { asignatura, usuario, fechaUso, laboratorio, estado} = solicitud;
  const fechaSolicitud = parseISO(fechaUso);
  const hoy = new Date();
  const esHoy = isSameDay(fechaSolicitud, hoy);

  return (
    <Card sx={{ 
      maxWidth: 345, 
      borderLeft: esHoy ? '5px solid orange' : fechaSolicitud < hoy ? 
      '5px solid red' : '5px solid teal',
    }}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {asignatura.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Profesor: {usuario.nombre} {usuario.apellido}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Laboratorio: {laboratorio.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fecha: {fechaUso}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Estado: {estado ? 'Aprobada' : 'Pendiente'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onVerDetalles(solicitud)}>
          Más detalles
        </Button>
      </CardActions>
    </Card>
  );
};

export default SolicitudCard;
