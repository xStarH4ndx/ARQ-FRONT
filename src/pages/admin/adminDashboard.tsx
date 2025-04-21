import { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import AsignaturaOptions from '../../components/asignaturaOptions';
import LaboratorioOptions from '../../components/laboratorioOptions';
import AdminSidebar from '../../components/adminSidebar';
import UsuarioOptions from '../../components/usuarioOptions';
import UsuariosTabla from '../../components/usuarioTabla';
import CrearInsumoForm from '../../components/insumoOptions';
import TablaInsumos from '../../components/insumoTabla';
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
