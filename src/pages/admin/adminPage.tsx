import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import SolicitudCard from '../../components/solicitudCard';
import DetalleSolicitud from '../../components/detalleSolicitud';
import { Solicitud } from '../../types/types';

const solicitudesMock: Solicitud[] = [
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
  },
];

const AdminPage: React.FC = () => {
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<Solicitud | null>(null);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Solicitudes de Laboratorio
      </Typography>

      <Grid container spacing={3}>
        {solicitudesMock.map((solicitud) => (
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
