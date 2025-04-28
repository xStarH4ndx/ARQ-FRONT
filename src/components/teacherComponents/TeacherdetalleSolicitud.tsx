import React, { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { Solicitud } from '../../types';
import { ELIMINAR_SOLICITUD } from '../../graphql/solicitudes';
import { useMutation } from '@apollo/client';

interface Props {
  solicitud: Solicitud;
  onClose: () => void;
  refetch: () => void;
}

const TeacherDetalleSolicitud: React.FC<Props> = ({ solicitud, onClose, refetch }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [mensajeCancelacion, setMensajeCancelacion] = useState('');
  const [eliminarSolicitud] = useMutation(ELIMINAR_SOLICITUD);

  const handleDelete = async () => {
    const confirm = window.confirm("¿Estás seguro que deseas eliminar esta solicitud?");
    if (!confirm) return;

    try {
      const { data } = await eliminarSolicitud({
        variables: { idSolicitud: solicitud.id },
      });

      if (data.eliminarSolicitud) {
        alert("Solicitud eliminada con éxito");
        refetch();
        onClose(); // Cierra el detalle después de eliminar
      } else {
        alert("No se pudo eliminar la solicitud");
      }
    } catch (error) {
      console.error("Error eliminando solicitud:", error);
      alert("Ocurrió un error al eliminar la solicitud");
    }
  }

  const handleEnviarCancelacion = () => {
    // Aquí podrías enviar el mensaje al administrador vía mutación
    console.log('Solicitud cancelada:', solicitud);
    console.log('Motivo:', mensajeCancelacion);
    alert('Tu solicitud de cancelación ha sido enviada al administrador.');
    setOpenDialog(false);
    setMensajeCancelacion('');
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
          <Typography variant="body2" color="text.secondary">
            No se solicitaron insumos
          </Typography>
        )}
      </Box>

      <Box mt={3} display="flex" gap={2} flexWrap="wrap">
      {solicitud.estado !== true && (
          // <Button
          //   onClick={() => setOpenDialog(true)}
          //   variant="outlined"
          //   color="error"
          // >
          //   Solicitar Cancelación
          // </Button>
          <Button onClick={handleDelete} variant="outlined" color="error">
            Cancelar Solicitud
          </Button>
        )}
        <Button onClick={onClose}>Cerrar</Button>
      </Box>

      {/* Diálogo emergente */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Solicitud de Cancelación</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Motivo de la cancelación"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={mensajeCancelacion}
            onChange={(e) => setMensajeCancelacion(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="inherit">
            Cancelar
          </Button>
          <Button
            onClick={handleEnviarCancelacion}
            variant="contained"
            color="warning"
            disabled={mensajeCancelacion.trim() === ''}
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default TeacherDetalleSolicitud;
