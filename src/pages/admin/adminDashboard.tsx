import { useState } from 'react';
import { Grid, Box } from '@mui/material';
import AsignaturaOptions from '../../components/adminComponents/dashboard/asignaturaOptions';
import LaboratorioOptions from '../../components/adminComponents/dashboard/laboratorioOptions';
import AdminSidebar from '../../components/adminComponents/dashboard/adminSidebar';
import UsuarioOptions from '../../components/adminComponents/dashboard/usuarioOptions';
import UsuariosTabla from '../../components/adminComponents/dashboard/usuarioTabla';
import CrearInsumoForm from '../../components/adminComponents/dashboard/insumoOptions';
import TablaInsumos from '../../components/adminComponents/dashboard/insumoTabla';
import UsuarioPerfil from '../../components/common/userPerfil';

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
