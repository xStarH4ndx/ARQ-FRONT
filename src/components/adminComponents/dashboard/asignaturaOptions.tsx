import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { CREAR_ASIGNATURA, LISTAR_ASIGNATURAS } from '../../../graphql/asignaturas';

const AsignaturaOptions: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');
  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');
  const [mostrarAsignaturas, setMostrarAsignaturas] = useState(false);

  const [crearAsignatura, { loading: creando, error: errorCreacion }] = useMutation(CREAR_ASIGNATURA, {
    refetchQueries: [{ query: LISTAR_ASIGNATURAS }],
  });

  const { data, loading: cargandoAsignaturas, error: errorListado } = useQuery(LISTAR_ASIGNATURAS, {
    skip: !mostrarAsignaturas,
  });

  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await crearAsignatura({ variables: { nombre, codigo } });
      setNombre('');
      setCodigo('');
    } catch (err) {
      console.error('Error al crear asignatura:', err);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: 'auto'}}>
      <Typography variant="h5" gutterBottom>
        Crear Nueva Asignatura
      </Typography>
      <form onSubmit={handleCrear}>
        <Grid container spacing={2} direction='row' alignItems='center'>
          <Grid sx={{ width: '100%' }}>
            <TextField
              fullWidth
              label="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </Grid>
          <Grid sx={{ width: '100%' }}>
            <TextField
              fullWidth
              label="Código"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
          </Grid>
          <Grid sx={{ width: '100%' }}>
            <Button type="submit" variant="contained" color="info" fullWidth disabled={creando}>
              {creando ? 'Creando...' : 'Crear Asignatura'}
            </Button>
          </Grid>
        </Grid>
      </form>

      {errorCreacion && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          Error al crear asignatura: {errorCreacion.message}
        </Typography>
      )}
      <Divider sx={{ marginY: 3 }} />
      <Button variant="outlined" fullWidth onClick={() => setMostrarAsignaturas(!mostrarAsignaturas)}>
        {mostrarAsignaturas ? 'Ocultar Asignaturas' : 'Listar Asignaturas'}
      </Button>

      {mostrarAsignaturas && (
        <>
          <TextField
            label= "Buscar Asignatura"
            variant="standard"
            fullWidth
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            sx={{marginBotton: 2}}
          />
          {cargandoAsignaturas ? (
            <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />
          ) : errorListado ? (
            <Typography color="error" sx={{ marginTop: 2 }}>
              Error al cargar asignaturas: {errorListado.message}
            </Typography>
          ) : (
            <List>
              {data?.listarAsignaturas?.filter((asignatura: any) =>
                `${asignatura.nombre} ${asignatura.codigo}`.toLowerCase().includes(busqueda.toLowerCase())
              ).map((asignatura: any) => (
                <ListItem key={asignatura.id}>
                  <ListItemText
                    primary={asignatura.nombre}
                    secondary={`Código: ${asignatura.codigo}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </>
      )}
    </Paper>
  );
};

export default AsignaturaOptions;
