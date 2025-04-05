import React, { useEffect, useState } from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';

interface Solicitud {
  id: number;
  id_usuario: string;
  id_asignatura: string;
  id_laboratorio: string;
  fecha_solicitud: string;
  fecha_uso: string;
  horario: string;
  cant_grupos: number;
  estado_tarea: boolean;
  estado_alerta: string;
}

const SolicitudesList: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);

  useEffect(() => {
    // Lógica backend para obtener todas las solicitudes del profesor
  }, []);

  return (
    <Box className="solicitudes-container" sx={{ mt: 2 }}>
      <Paper elevation={3} className="solicitudes-paper">
        <Typography variant="h4" gutterBottom align="center" sx={{ mt: 2 }}>
          LISTA DE SOLICITUDES
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>ID Usuario</TableCell>
                <TableCell>ID Asignatura</TableCell>
                <TableCell>ID Laboratorio</TableCell>
                <TableCell>Fecha Solicitud</TableCell>
                <TableCell>Fecha Uso</TableCell>
                <TableCell>Horario</TableCell>
                <TableCell>Cantidad de Grupos</TableCell>
                <TableCell>Estado Tarea</TableCell>
                <TableCell>Estado Alerta</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {solicitudes.map((solicitud) => (
                <TableRow key={solicitud.id}>
                  <TableCell>{solicitud.id}</TableCell>
                  <TableCell>{solicitud.id_usuario}</TableCell>
                  <TableCell>{solicitud.id_asignatura}</TableCell>
                  <TableCell>{solicitud.id_laboratorio}</TableCell>
                  <TableCell>{solicitud.fecha_solicitud}</TableCell>
                  <TableCell>{solicitud.fecha_uso}</TableCell>
                  <TableCell>{solicitud.horario}</TableCell>
                  <TableCell>{solicitud.cant_grupos}</TableCell>
                  <TableCell>{solicitud.estado_tarea ? "Completada" : "Pendiente"}</TableCell>
                  <TableCell>{solicitud.estado_alerta}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default SolicitudesList;