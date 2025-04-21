import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress
} from '@mui/material';
import { SOLICITUDES_PROFESOR_QUERY } from '../../graphql/solicitudes';
import { Solicitud } from '../../types/index';
import TeacherSolicitudCard from '../../components/teacherComponents/TeachersolicitudCard';
import TeacherDetalleSolicitud from '../../components/teacherComponents/TeacherdetalleSolicitud';
import { useUserStore } from '../../store/UserStorage';

interface SolicitudesDelProfesorData {
  solicitudesDelProfesor: Solicitud[];
}

const TeacherPage: React.FC = () => {
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<Solicitud | null>(null);
  const [filtroUrgencia, setFiltroUrgencia] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState<string>('');

  const idUsuario = useUserStore((state) => state.getId());
  const { loading, error, data } = useQuery<SolicitudesDelProfesorData>(SOLICITUDES_PROFESOR_QUERY, {
    variables: { idUsuario },
    skip: !idUsuario,
  });

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error al cargar las solicitudes del profesor</Typography>;
  const solicitudes = data?.solicitudesDelProfesor || [];

  const filteredSolicitudes = solicitudes
    .filter((solicitud) => {
      const fechaHoy = new Date().toISOString().split('T')[0];
      const isUrgente = solicitud.fechaUso === fechaHoy;

      if (filtroUrgencia === 'urgente') return isUrgente;
      if (filtroUrgencia === 'menosUrgente') return !isUrgente;
      return true;
    })
    .filter((solicitud) => {
      return (
        solicitud.asignatura?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        solicitud.laboratorio?.nombre?.toLowerCase().includes(busqueda.toLowerCase())
      );
    });

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Mis Solicitudes de Laboratorio
      </Typography>

      {/* Filtros y buscador */}
      <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <TextField
          label="Buscar"
          variant="standard"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          fullWidth
        />
        <FormControl variant="outlined" sx={{ minWidth: 160, marginLeft: 2 }}>
          <InputLabel>Urgencia</InputLabel>
          <Select
            value={filtroUrgencia}
            onChange={(e) => setFiltroUrgencia(e.target.value)}
            label="Urgencia"
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="urgente">Urgentes</MenuItem>
            <MenuItem value="menosUrgente">Menos Urgentes</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Lista de solicitudes */}
      <Grid container spacing={3}>
        {filteredSolicitudes.map((solicitud) => (
          <Grid key={solicitud.id}>
            <TeacherSolicitudCard
              solicitud={solicitud}
              onVerDetalles={() => setSolicitudSeleccionada(solicitud)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Modal de detalles */}
      {solicitudSeleccionada && (
        <TeacherDetalleSolicitud
          solicitud={solicitudSeleccionada}
          onClose={() => setSolicitudSeleccionada(null)}
        />
      )}
    </Box>
  );
};

export default TeacherPage;
