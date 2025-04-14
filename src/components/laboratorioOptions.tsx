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
import { CREAR_LABORATORIO, LISTAR_LABORATORIOS } from '../graphql/laboratorios';

const LaboratorioOptions: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');
  const [mostrarLaboratorios, setMostrarLaboratorios] = useState(false);

  const [crearLaboratorio, { loading: creando, error: errorCreacion }] = useMutation(CREAR_LABORATORIO, {
    refetchQueries: [{ query: LISTAR_LABORATORIOS }],
  });

  const { data, loading: cargandoLaboratorios, error: errorListado } = useQuery(LISTAR_LABORATORIOS, {
    skip: !mostrarLaboratorios,
  });

  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await crearLaboratorio({ variables: { nombre, codigo } });
      setNombre('');
      setCodigo('');
    } catch (err) {
      console.error('Error al crear laboratorio:', err);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: 'auto', marginTop: 4 }}>
      <Typography variant="h5" gutterBottom>
        Crear Nuevo Laboratorio
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
              {creando ? 'Creando...' : 'Crear Laboratorio'}
            </Button>
          </Grid>
        </Grid>
      </form>

      {errorCreacion && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          Error al crear laboratorio: {errorCreacion.message}
        </Typography>
      )}

      <Divider sx={{ marginY: 3 }} />

      <Button variant="outlined" fullWidth onClick={() => setMostrarLaboratorios(!mostrarLaboratorios)}>
        {mostrarLaboratorios ? 'Ocultar Laboratorios' : 'Listar Laboratorios'}
      </Button>

      {mostrarLaboratorios && (
        <>
          {cargandoLaboratorios ? (
            <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />
          ) : errorListado ? (
            <Typography color="error" sx={{ marginTop: 2 }}>
              Error al cargar laboratorios: {errorListado.message}
            </Typography>
          ) : (
            <List>
              {data?.listarLaboratorios?.map((lab: any) => (
                <ListItem key={lab.id}>
                  <ListItemText
                    primary={lab.nombre}
                    secondary={`Código: ${lab.codigo}`}
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

export default LaboratorioOptions;
