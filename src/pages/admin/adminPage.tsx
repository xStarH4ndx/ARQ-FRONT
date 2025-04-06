import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Box,
    Grid,
    Chip,
  } from '@mui/material';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  import WarningIcon from '@mui/icons-material/Warning';
  import { format, isSameDay } from 'date-fns';
  
  const solicitudesMock = [
    {
      id: 1,
      asignatura: 'Laboratorio de Física',
      laboratorio: 'Lab 1',
      fechaUso: '2025-04-05',
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
  ];
  
  const AdminPage = () => {
    // Obtener la fecha actual en zona horaria de Santiago
    const timezone = 'America/Santiago';
    const now = new Date(); // Utilizando la fecha actual como ejemplo
  
    return (
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          Solicitudes de Laboratorio
        </Typography>
  
        <Grid container spacing={3}>
          {solicitudesMock.map((solicitud) => {
            const fechaSolicitud = new Date(solicitud.fechaUso);
            const isToday = isSameDay(fechaSolicitud, now);
  
            return (
              <Grid item xs={12} sm={6} md={4} key={solicitud.id}>
                <Card
                  sx={{
                    height: '100%',
                    borderLeft: isToday ? '6px solid #ff9800' : 'none',
                    backgroundColor: isToday ? '#fff3e0' : 'white',
                  }}
                >
                  <CardHeader
                    title={solicitud.asignatura}
                    subheader={`Laboratorio: ${solicitud.laboratorio} — Fecha: ${format(
                      fechaSolicitud,
                      'yyyy-MM-dd'
                    )}`}
                    action={
                      isToday && (
                        <WarningIcon sx={{ color: '#ff5722' }} titleAccess="Solicitud para hoy" />
                      )
                    }
                  />
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                      Profesor: {solicitud.profesor}
                    </Typography>
  
                    <Typography variant="subtitle2" sx={{ mt: 2 }}>
                      Insumos solicitados:
                    </Typography>
                    <Box mt={1}>
                      {solicitud.insumos.map((insumo, index) => (
                        <Chip
                          key={index}
                          label={`${insumo.nombre} - ${insumo.cantidad} ${insumo.medida}`}
                          sx={{ marginRight: 1, marginBottom: 1 }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  };
  
  export default AdminPage;
  