import React from 'react';
import { Box, Typography, Chip, Button, Paper } from '@mui/material';
import { Solicitud } from '../../types';
import { CONFIRMAR_SOLICITUD, ELIMINAR_SOLICITUD } from '../../graphql/solicitudes';
import { useMutation } from '@apollo/client';

interface Props {
  solicitud: Solicitud;
  onClose: () => void;
  refetch: () => void; // Refetch function passed as a prop
}

const DetalleSolicitud: React.FC<Props> = ({ solicitud, onClose, refetch }) => {
  const [eliminarSolicitud] = useMutation(ELIMINAR_SOLICITUD);
  const [confirmarSolicitud] = useMutation(CONFIRMAR_SOLICITUD);

  const handleConfirmar = async () => {
    const confirm = window.confirm("¿Estás seguro que deseas confirmar esta solicitud?");
    if (!confirm) return;

    try{
      const { data } = await confirmarSolicitud({
        variables: { idSolicitud: solicitud.id },
      });
      if (data.confirmarSolicitud) {
        alert("Solicitud confirmada con éxito");
        refetch(); // Actualiza la lista
        onClose(); // Cierra el detalle después de confirmar
      } else {
        alert("No se pudo confirmar la solicitud");
      }
    } catch (error) {
      console.error("Error confirmando solicitud:", error);
      alert("Insumos insuficientes para confirmar la solicitud");
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("¿Estás seguro que deseas eliminar esta solicitud?");
    if (!confirm) return;

    try {
      const { data } = await eliminarSolicitud({
        variables: { idSolicitud: solicitud.id },
      });

      if (data.eliminarSolicitud) {
        alert("Solicitud eliminada con éxito");
        refetch(); // Actualiza la lista
        onClose(); // Cierra el detalle después de eliminar
      } else {
        alert("No se pudo eliminar la solicitud");
      }
    } catch (error) {
      console.error("Error eliminando solicitud:", error);
      alert("Ocurrió un error al eliminar la solicitud");
    }
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
        {solicitud.estado !== true && (
          <Button onClick={handleConfirmar} variant="contained" color="success">
            Confirmar
          </Button>
        )}
        <Box mt={3} display="flex" gap={2} flexWrap="wrap">
         {solicitud.estado !== true && (
          <Button onClick={handleDelete} variant="outlined" color="error">
            Eliminar solicitud
          </Button>
         )}
        </Box>
        <Button onClick={onClose}>Cerrar</Button>
      </Box>
    </Paper>
  );
};

export default DetalleSolicitud;
