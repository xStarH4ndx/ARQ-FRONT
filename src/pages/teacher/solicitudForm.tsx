import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { TextField, Checkbox, FormControlLabel, Button, Paper, Typography, Box, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import '../../index.css';
import { CREAR_SOLICITUD } from "../../graphql/mutations/solicitudes";
import { LISTAR_INSUMOS } from "../../graphql/queries/getSolicitudes";

interface Insumo {
  id: number;
  nombre: string;
  unidadMedida: string;
}

const SolicitudForm: React.FC = () => {
  const userId = 21; // El ID del usuario se obtiene del usuario que ha iniciado sesión
  const [formData, setFormData] = useState({
    idUsuario: userId,
    idAsignatura: '',
    idLaboratorio: '',
    fechaSolicitud: '',
    fechaUso: '',
    horario: '',
    cantGrupos: '',
    estadoTarea: false,
    estadoAlerta: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInsumos, setSelectedInsumos] = useState<{ insumo: Insumo, cantidad: string }[]>([]);
  const [matchingInsumos, setMatchingInsumos] = useState<Insumo[]>([]);

  const { data, loading, error } = useQuery(LISTAR_INSUMOS);

  useEffect(() => {
    if (searchTerm && data) {
      setMatchingInsumos(data.listarInsumos.filter((insumo: Insumo) => insumo.nombre.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      setMatchingInsumos([]);
    }
  }, [searchTerm, data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> | React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    const { name, value } = e.target;

    if (name) {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleInsumoSelect = (insumo: Insumo) => {
    setSelectedInsumos([...selectedInsumos, { insumo, cantidad: '' }]);
    setSearchTerm('');
  };

  const handleInsumoChange = (index: number, field: string, value: string) => {
    const newSelectedInsumos = [...selectedInsumos];
    newSelectedInsumos[index] = { ...newSelectedInsumos[index], [field]: value };
    setSelectedInsumos(newSelectedInsumos);
  };

  const handleRemoveInsumo = (index: number) => {
    const newSelectedInsumos = [...selectedInsumos];
    newSelectedInsumos.splice(index, 1);
    setSelectedInsumos(newSelectedInsumos);
  };

  const [crearSolicitud] = useMutation(CREAR_SOLICITUD);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = {
      ...formData,
      insumos: selectedInsumos.map(item => ({ idInsumo: item.insumo.id, cantidad: parseFloat(item.cantidad) }))
    };
    crearSolicitud({ variables: { input } })
      .then(response => {
        console.log('Solicitud creada:', response.data.crearSolicitud);
      })
      .catch(err => {
        console.error('Error creando solicitud:', err);
      });
  };

  if (loading) return <p>Cargando insumos...</p>;
  if (error) return <p>Error cargando insumos: {error.message}</p>;

  return (
    <Box className="form-container">
      <Paper elevation={3} className="form-paper">
        <Typography variant="h4" gutterBottom align="center">
          CREAR SOLICITUD
        </Typography>
        <form className="solicitud-form" onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: '400px', overflowY: 'auto' }}>
            <TextField
              fullWidth
              label="Usuario"
              name="idUsuario"
              value={formData.idUsuario}
              variant="filled"
              InputProps={{
                readOnly: true,
              }}
            />
            <FormControl fullWidth variant="filled" sx={{ textAlign: 'left' }}>
              <InputLabel>Asignatura</InputLabel>
              <Select
                name="idAsignatura"
                value={formData.idAsignatura}
                onChange={handleChange}
              >
                <MenuItem value=""><em>Ninguno</em></MenuItem>
                <MenuItem value="1">Asignatura 1</MenuItem>
                <MenuItem value="2">Asignatura 2</MenuItem>
                <MenuItem value="3">Asignatura 3</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth variant="filled" sx={{ textAlign: 'left' }}>
              <InputLabel>Laboratorio</InputLabel>
              <Select
                name="idLaboratorio"
                value={formData.idLaboratorio}
                onChange={handleChange}
              >
                <MenuItem value=""><em>Ninguno</em></MenuItem>
                <MenuItem value="1">Laboratorio 1</MenuItem>
                <MenuItem value="2">Laboratorio 2</MenuItem>
                <MenuItem value="3">Laboratorio 3</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Fecha Solicitud"
              name="fechaSolicitud"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.fechaSolicitud}
              onChange={handleChange}
              variant="filled"
            />
            <TextField
              fullWidth
              label="Fecha Uso"
              name="fechaUso"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.fechaUso}
              onChange={handleChange}
              variant="filled"
            />
            <TextField
              fullWidth
              label="Horario"
              name="horario"
              type="text"
              value={formData.horario}
              onChange={handleChange}
              variant="filled"
            />
            <TextField
              fullWidth
              label="Cantidad de Grupos"
              name="cantGrupos"
              type="number"
              value={formData.cantGrupos}
              onChange={handleChange}
              variant="filled"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="estadoTarea"
                  checked={formData.estadoTarea}
                  onChange={handleCheckboxChange}
                />
              }
              label="Estado Tarea"
            />
            <TextField
              fullWidth
              label="Estado Alerta"
              name="estadoAlerta"
              type="text"
              value={formData.estadoAlerta}
              onChange={handleChange}
              variant="filled"
            />
            <TextField
              fullWidth
              label="Buscar Insumos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="filled"
            />
            {matchingInsumos.length > 0 && (
              <List>
                {matchingInsumos.map((insumo: Insumo) => (
                  <ListItem key={insumo.id} component="div" onClick={() => handleInsumoSelect(insumo)}>
                    <ListItemText primary={insumo.nombre} />
                    <IconButton edge="end" aria-label="add">
                      <Add />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            )}
            {selectedInsumos.map((item, index) => (
              <Box key={item.insumo.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography>{item.insumo.nombre}</Typography>
                <TextField
                  label="Cantidad"
                  type="number"
                  value={item.cantidad}
                  onChange={(e) => handleInsumoChange(index, 'cantidad', e.target.value)}
                  variant="filled"
                  sx={{ width: '100px' }}
                />
                <TextField
                  label="Unidad"
                  value={item.insumo.unidadMedida}
                  InputProps={{
                    readOnly: true
                  }}
                  variant="filled"
                  sx={{ width: '100px' }}
                />
                <IconButton edge="end" aria-label="remove" onClick={() => handleRemoveInsumo(index)}>
                  <Remove />
                </IconButton>
              </Box>
            ))}
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Enviar Solicitud
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SolicitudForm;