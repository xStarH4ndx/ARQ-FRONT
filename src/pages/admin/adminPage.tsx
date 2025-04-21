import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Typography, Grid, TextField, MenuItem, Select, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { LISTAR_SOLICITUDES } from '../../graphql/solicitudes';
import { Solicitud } from '../../types/index';
import SolicitudCard from '../../components/solicitudCard';
import DetalleSolicitud from '../../components/detalleSolicitud';

interface ListarSolicitudesData {
  listarSolicitudes: Solicitud[];
}

const AdminPage: React.FC = () => {
  const { loading, error, data } = useQuery<ListarSolicitudesData>(LISTAR_SOLICITUDES);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<Solicitud | null>(null);
  const [filtroUrgencia, setFiltroUrgencia] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState<string>('');

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error al cargar las solicitudes</Typography>;

  const solicitudes = data?.listarSolicitudes || [];
  // Filtros
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
    })
    .filter((solicitud) => solicitud.estado === false);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Solicitudes de Laboratorio
      </Typography>

      {/*  Buscador y Filtro */}
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

      {/* Cartas de Solicitudes */}
      <Grid container spacing={3}>
        {filteredSolicitudes.map((solicitud) => (
          <Grid key={solicitud.id}>
            <SolicitudCard
              solicitud={solicitud}
              onVerDetalles={() => setSolicitudSeleccionada(solicitud)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Detalles */}
      {solicitudSeleccionada && (
        <DetalleSolicitud
          solicitud={solicitudSeleccionada}
          onClose={() => setSolicitudSeleccionada(null)}
        />
      )}
    </Box>
  );
};

export default AdminPage;
