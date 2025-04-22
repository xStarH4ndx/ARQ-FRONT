import React, { useState } from 'react';
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  Button, Paper, Typography, Box, Stack, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField
} from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import { LISTAR_INSUMOS, ELIMINAR_INSUMO, MODIFICAR_INSUMO } from '../../../graphql/insumo';
import RestoreIcon from '@mui/icons-material/Restore';

const TablaInsumos = () => {
  const { data, loading, error, refetch } = useQuery(LISTAR_INSUMOS);
  const [eliminarInsumo] = useMutation(ELIMINAR_INSUMO);
  const [modificarInsumo] = useMutation(MODIFICAR_INSUMO);

  // Estado del insumo seleccionado y modal
  const [open, setOpen] = useState(false);
  const [insumoSeleccionado, setInsumoSeleccionado] = useState<any>(null);

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

  const handleAbrirModificar = (insumo: any) => {
    setInsumoSeleccionado(insumo);
    setOpen(true);
  };

  const handleCerrarModal = () => {
    setOpen(false);
    setInsumoSeleccionado(null);
  };

  const handleGuardarCambios = async () => {
    try {
      await modificarInsumo({
        variables: {
          id: insumoSeleccionado.id,
          input: {
            nombre: insumoSeleccionado.nombre,
            tipo: insumoSeleccionado.tipo,
            unidadMedida: insumoSeleccionado.unidadMedida,
            stockDisponible: parseInt(insumoSeleccionado.stockDisponible),
          },
        },
      });
      await refetch();
      handleCerrarModal();
      alert('Insumo modificado exitosamente');
    } catch (err) {
      console.error('Error al modificar insumo:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInsumoSeleccionado({
      ...insumoSeleccionado,
      [e.target.name]: e.target.value,
    });
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
        <Button startIcon={<RestoreIcon />} variant="outlined" color="inherit" onClick={handleActualizar}>
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
                    onClick={() => handleAbrirModificar(insumo)}
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

      {/* Dialog de modificación */}
      <Dialog open={open} onClose={handleCerrarModal}>
        <DialogTitle>Modificar Insumo</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nombre"
            name="nombre"
            fullWidth
            value={insumoSeleccionado?.nombre || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Tipo"
            name="tipo"
            fullWidth
            value={insumoSeleccionado?.tipo || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Unidad de Medida"
            name="unidadMedida"
            fullWidth
            value={insumoSeleccionado?.unidadMedida || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Stock Disponible"
            name="stockDisponible"
            type="number"
            fullWidth
            value={insumoSeleccionado?.stockDisponible || ''}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCerrarModal}>Cancelar</Button>
          <Button variant="contained" color="primary" onClick={handleGuardarCambios}>
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TablaInsumos;
