import { useQuery, useMutation } from '@apollo/client';
import { LISTAR_INSUMOS, ELIMINAR_INSUMO } from '../graphql/insumo';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Paper,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';

const TablaInsumos = () => {
  const { data, loading, error, refetch } = useQuery(LISTAR_INSUMOS);
  const [eliminarInsumo] = useMutation(ELIMINAR_INSUMO);

  const handleEliminar = async (id: string) => {
    if (confirm('¿Estás seguro que deseas eliminar este insumo?')) {
      try {
        await eliminarInsumo({ variables: { id } });
        await refetch();
        alert('Insumo eliminado exitosamente');
      } catch (err) {
        console.error('Error al eliminar insumo:', err);
      }
    }
  };

  const handleModificar = (id: string) => {
    alert(`Modificar insumo con ID: ${id}`);
  };

  const handleActualizar = async () => {
    try {
      await refetch();
    } catch (err) {
      console.error('Error al actualizar la tabla:', err);
    }
  };

  if (loading) return <Typography>Cargando insumos...</Typography>;
  if (error) return <Typography>Error al cargar insumos: {error.message}</Typography>;

  return (
    <Box sx={{ mt: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Total de Insumos: {data.listarInsumos.length}</Typography>
        <Button startIcon={<RestoreIcon/>} variant="outlined" color="inherit" onClick={handleActualizar}>
          Actualizar Tabla
        </Button>
      </Stack>
      <Paper sx={{ overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Unidad de Medida</TableCell>
              <TableCell>Stock Disponible</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.listarInsumos?.map((insumo: any) => (
              <TableRow key={insumo.id}>
                <TableCell>{insumo.id}</TableCell>
                <TableCell>{insumo.nombre}</TableCell>
                <TableCell>{insumo.tipo}</TableCell>
                <TableCell>{insumo.unidadMedida}</TableCell>
                <TableCell>{insumo.stockDisponible}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    color="warning"
                    onClick={() => handleModificar(insumo.id)}
                    sx={{ mr: 1 }}
                  >
                    Modificar
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handleEliminar(insumo.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default TablaInsumos;
