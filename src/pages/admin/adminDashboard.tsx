import { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import AsignaturaOptions from '../../components/dashboard/asignaturaOptions';
import LaboratorioOptions from '../../components/dashboard/laboratorioOptions';
import AdminSidebar from '../../components/dashboard/adminSidebar';
import UsuarioOptions from '../../components/dashboard/usuarioOptions';
import UsuariosTabla from '../../components/dashboard/usuarioTabla';
import CrearInsumoForm from '../../components/dashboard/insumoOptions';
import TablaInsumos from '../../components/dashboard/insumoTabla';
import UsuarioPerfil from '../../components/userPerfil';

export const AdminDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>('Insumos');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'asignaturas':
        return <AsignaturaOptions />;
      case 'laboratorios':
        return <LaboratorioOptions />;
      case 'insumos':
        return <Grid><CrearInsumoForm/><TablaInsumos/></Grid>;
      case 'usuarios':
        return <Grid><UsuarioOptions /><UsuariosTabla /></Grid>;
      case 'perfil':
        return <UsuarioPerfil/>;
      default:
        return <UsuarioPerfil />;
    }
  };

  return (
    <Grid container spacing={2} sx={{ height: 'auto'}}>
      {/* Sidebar */}
      <Grid>
        <AdminSidebar onSelect={setSelectedComponent} />
      </Grid>

      {/* Contenido */}
      <Grid>
        <Box sx={{ padding: 2, marginLeft: 30}}>
          {renderComponent()}
        </Box>
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;
