import React, { useState } from 'react';
import { Box, Typography, Grid, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import SolicitudCard from '../../components/solicitudCard';
import DetalleSolicitud from '../../components/detalleSolicitud';
import { Solicitud } from '../../types/types';

const solicitudesMock: Solicitud[] = [ //SETEANDO DATOS DE PRUEBA
  {
    id: 1,
    asignatura: 'Laboratorio de Física',
    laboratorio: 'Lab 1',
    fechaUso: '2025-04-06',
    insumos: [
      { nombre: 'Multímetro', cantidad: 2, medida: 'unidades' },
      { nombre: 'Osciloscopio', cantidad: 1, medida: 'unidad' },
      { nombre: 'Protoboard', cantidad: 5, medida: 'unidades' },
    ],
    profesor: 'Prof. Juan Pérez',
    estado: false
  },
  {
    id: 2,
    asignatura: 'Química Orgánica',
    laboratorio: 'Lab 2',
    fechaUso: '2025-04-07',
    insumos: [
      { nombre: 'Tubos de ensayo', cantidad: 10, medida: 'unidades' },
      { nombre: 'Reactivos', cantidad: 3, medida: 'botellas' },
      { nombre: 'Mechero Bunsen', cantidad: 2, medida: 'unidades' },
    ],
    profesor: 'Prof. María González',
    estado: false
  },
  {
    id: 3,
    asignatura: 'Mecánica de Fluidos',
    laboratorio: 'Lab 3',
    fechaUso: '2025-04-05',
    insumos: [
      { nombre: 'Tubos de ensayo', cantidad: 10, medida: 'unidades' },
      { nombre: 'Reactivos', cantidad: 3, medida: 'botellas' },
      { nombre: 'Mechero Bunsen', cantidad: 2, medida: 'unidades' },
    ],
    profesor: 'Prof. María González',
    estado: false
  },
];

const AdminPage: React.FC = () => {
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<Solicitud | null>(null);
  const [filtroUrgencia, setFiltroUrgencia] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState<string>('');

  // Filtrar las solicitudes por urgencia y búsqueda
  const filteredSolicitudes = solicitudesMock
    .filter((solicitud) => solicitud.estado === false)
    .filter((solicitud) => {
      const fechaHoy = new Date().toISOString().split('T')[0];
      const isUrgente = solicitud.fechaUso === fechaHoy;

      if (filtroUrgencia === 'urgente') {
        return isUrgente;
      }
      if (filtroUrgencia === 'menosUrgente') {
        return !isUrgente;
      }
      return true; // Si es 'todos', no filtra por urgencia
    })
    .filter((solicitud) => {
      return (
        solicitud.asignatura.toLowerCase().includes(busqueda.toLowerCase()) ||
        solicitud.laboratorio.toLowerCase().includes(busqueda.toLowerCase())
      );
    });

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Solicitudes de Laboratorio
      </Typography>

      {/* Controles de búsqueda y filtro */}
      <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <TextField
          label="Buscar"
          variant="standard"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          fullWidth
        />

        <FormControl variant="outlined" sx={{ minWidth: 120, marginLeft: 2 }}>
          <InputLabel>Urgencia</InputLabel>
          <Select
            value={filtroUrgencia}
            onChange={(e) => setFiltroUrgencia(e.target.value)}
            label="Urgencia"
            variant='outlined'
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="urgente">Urgentes</MenuItem>
            <MenuItem value="menosUrgente">Menos Urgentes</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredSolicitudes.map((solicitud) => (
          <Grid item xs={12} sm={6} md={4} key={solicitud.id}>
            <SolicitudCard
              solicitud={solicitud}
              onVerDetalles={setSolicitudSeleccionada}
            />
          </Grid>
        ))}
      </Grid>

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
