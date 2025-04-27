import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Typography, Grid, TextField, MenuItem, Select, FormControl, InputLabel, CircularProgress, Button } from '@mui/material';
import { LISTAR_SOLICITUDES_RECHAZADAS } from '../../graphql/solicitudes';
import { Solicitud } from '../../types/index';
import SolicitudCard from '../../components/adminComponents/solicitudCard';
import DetalleSolicitud from '../../components/adminComponents/detalleSolicitud';
import RestoreIcon from '@mui/icons-material/Restore';

interface ListarSolicitudesRechazadasData {
  listarSolicitudesRechazadas: Solicitud[];
}

const AdminPage: React.FC = () => {
  const { loading, error, data, refetch } = useQuery<ListarSolicitudesRechazadasData>(LISTAR_SOLICITUDES_RECHAZADAS);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<Solicitud | null>(null);
  const [filtroUrgencia, setFiltroUrgencia] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState<string>('');

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error al cargar las solicitudes</Typography>;

  const solicitudes = data?.listarSolicitudesRechazadas || [];
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
        solicitud.laboratorio?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        solicitud.usuario?.apellido?.toLowerCase().includes(busqueda.toLowerCase()) ||
        solicitud.usuario?.nombre?.toLowerCase().includes(busqueda.toLowerCase())
      );
    })

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

        <FormControl variant="standard" sx={{minWidth: 160, marginLeft: 2 }}>
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
        {/* Botón de Actualizar */}
        <Button
          startIcon={<RestoreIcon />}
          variant="contained"
          color="info"
          onClick={() => refetch()}  // Refresca las solicitudes
          sx={{marginLeft: 2, minWidth: 140}}
        >
          Actualizar
        </Button>
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
          refetch={refetch}  // Pasar refetch aquí
        />
      )}
    </Box>
  );
};

export default AdminPage;
