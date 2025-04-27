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
  CircularProgress,
  Button
} from '@mui/material';
import { LISTAR_SOLICITUDES_APROBADAS } from '../../graphql/solicitudes';
import { Solicitud } from '../../types/index';
import SolicitudCard from '../../components/adminComponents/solicitudCard';
import DetalleSolicitud from '../../components/adminComponents/detalleSolicitud';
import RestoreIcon from '@mui/icons-material/Restore';

interface ListarSolicitudesAprobadasData {
  listarSolicitudesAprobadas: Solicitud[];
}

const AdminHistorial: React.FC = () => {
  const { loading, error, data, refetch } = useQuery<ListarSolicitudesAprobadasData>(LISTAR_SOLICITUDES_APROBADAS);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<Solicitud | null>(null);
  const [busqueda, setBusqueda] = useState<string>('');
  const [filtroMes, setFiltroMes] = useState<string>('todos');
  const [filtroAnio, setFiltroAnio] = useState<string>('todos');

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error al cargar las solicitudes</Typography>;

  const solicitudes = (data?.listarSolicitudesAprobadas || []).filter((s) => {
    const coincideBusqueda =
      s.usuario?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      s.usuario?.apellido?.toLowerCase().includes(busqueda.toLowerCase()) ||
      s.laboratorio?.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      s.asignatura?.nombre?.toLowerCase().includes(busqueda.toLowerCase());

    const fecha = new Date(s.fechaUso);
    const mes = fecha.toISOString().slice(5, 7); // "01" to "12"
    const anio = fecha.getFullYear().toString();

    const coincideMes = filtroMes === 'todos' || filtroMes === mes;
    const coincideAnio = filtroAnio === 'todos' || filtroAnio === anio;

    return coincideBusqueda && coincideMes && coincideAnio;
  });

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Historial de Aprobaciones
      </Typography>

      {/*  Buscador y Filtros */}
      <Box mb={2} display="flex" flexWrap="wrap" alignItems="center" gap={2}>
        <TextField
          label="Buscar"
          variant="standard"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          fullWidth
        />

        <FormControl variant="standard" sx={{ minWidth: 140 }}>
          <InputLabel>Mes</InputLabel>
          <Select
            value={filtroMes}
            onChange={(e) => setFiltroMes(e.target.value)}
            label="Mes"
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="01">Enero</MenuItem>
            <MenuItem value="02">Febrero</MenuItem>
            <MenuItem value="03">Marzo</MenuItem>
            <MenuItem value="04">Abril</MenuItem>
            <MenuItem value="05">Mayo</MenuItem>
            <MenuItem value="06">Junio</MenuItem>
            <MenuItem value="07">Julio</MenuItem>
            <MenuItem value="08">Agosto</MenuItem>
            <MenuItem value="09">Septiembre</MenuItem>
            <MenuItem value="10">Octubre</MenuItem>
            <MenuItem value="11">Noviembre</MenuItem>
            <MenuItem value="12">Diciembre</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <InputLabel>Año</InputLabel>
          <Select
            value={filtroAnio}
            onChange={(e) => setFiltroAnio(e.target.value)}
            label="Año"
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="2027">2027</MenuItem>
            <MenuItem value="2026">2026</MenuItem>
            <MenuItem value="2025">2025</MenuItem>
            {/* Puedes agregar más años si lo deseas */}
          </Select>
        </FormControl>

        {/* Botón de Actualizar */}
        <Button
          startIcon={<RestoreIcon />}
          variant="contained"
          color="info"
          onClick={() => refetch()}
          sx={{ minWidth: 140 }}
        >
          Actualizar
        </Button>
      </Box>

      {/* Cartas de Solicitudes */}
      <Grid container spacing={3}>
        {solicitudes.map((solicitud) => (
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
          refetch={refetch}
        />
      )}
    </Box>
  );
};

export default AdminHistorial;
