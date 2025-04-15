import { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import AsignaturaOptions from '../../components/asignaturaOptions';
import LaboratorioOptions from '../../components/laboratorioOptions';
import AdminSidebar from '../../components/adminSidebar';

export const AdminDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>('Insumos');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'asignaturas':
        return <AsignaturaOptions />;
      case 'laboratorios':
        return <LaboratorioOptions />;
      case 'insumos':
        return <Typography variant="h6">Gestión de Insumos</Typography>;
      case 'profesores':
        return <Typography variant="h6">Gestión de Profesores</Typography>;
      default:
        return <Typography variant="h6">Selecciona una opción desde el menú</Typography>;
    }
  };

  return (
    <Grid container spacing={2} sx={{ height: 'auto', padding: 2 }}>
      {/* Sidebar */}
      <Grid>
        <AdminSidebar onSelect={setSelectedComponent} />
      </Grid>

      {/* Contenido */}
      <Grid>
        <Box sx={{ padding: 2, marginLeft: 30, marginTop: 10 }}>
          {renderComponent()}
        </Box>
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;
