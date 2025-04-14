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
import { CREAR_ASIGNATURA, LISTAR_ASIGNATURAS } from '../graphql/asignaturas';

const AsignaturaOptions: React.FC = () => {
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
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: 'auto', marginTop: 4 }}>
      <Typography variant="h5" gutterBottom>
        Crear Nueva Asignatura
      </Typography>
      <form onSubmit={handleCrear}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Código"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={creando}>
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
          {cargandoAsignaturas ? (
            <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />
          ) : errorListado ? (
            <Typography color="error" sx={{ marginTop: 2 }}>
              Error al cargar asignaturas: {errorListado.message}
            </Typography>
          ) : (
            <List>
              {data?.listarAsignaturas?.map((asignatura: any) => (
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
