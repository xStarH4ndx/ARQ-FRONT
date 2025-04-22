import { useState } from 'react';
import {
  Paper, Box, Typography, Button, TextField, MenuItem, Grid,
  Divider
} from '@mui/material';
import InsumoTransferList from '../../components/teacherComponents/insumoSelector';
import { useUserStore } from '../../store/UserStorage';
import { useQuery, useMutation } from '@apollo/client';
import { LISTAR_ASIGNATURAS } from '../../graphql/asignaturas'; // Consulta para listar laboratorios y asignaturas
import { LISTAR_LABORATORIOS } from '../../graphql/laboratorios'; // Consulta para listar laboratorios y asignaturas
import { CREAR_SOLICITUD } from '../../graphql/solicitudes'; // Mutación para crear solicitud
import { useNavigate } from 'react-router-dom';

const SolicitudForm = () => {
  const [laboratorio, setLaboratorio] = useState('');
  const [asignatura, setAsignatura] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [grupo, setGrupo] = useState('');
  const [insumosSeleccionados, setInsumosSeleccionados] = useState<{ idInsumo: string; cantidad: number }[]>([]);
  const navigate = useNavigate();
  const usuarioId = useUserStore.getState().getId();

  // Consulta para listar los laboratorios
  const { data: laboratoriosData, loading: laboratoriosLoading } = useQuery(LISTAR_LABORATORIOS);

  // Consulta para listar las asignaturas
  const { data: asignaturasData, loading: asignaturasLoading } = useQuery(LISTAR_ASIGNATURAS);

  // Hook para la mutación de crear solicitud
  const [crearSolicitud] = useMutation(CREAR_SOLICITUD);

  // Función para manejar los insumos seleccionados
  const handleInsumosConfirmados = (insumos: { id: string; cantidad: number }[]) => {
    const mapped = insumos.map(i => ({
      idInsumo: i.id,
      cantidad: i.cantidad
    }));
    setInsumosSeleccionados(mapped);
  };

  // Función para manejar el envío de la solicitud
  const handleSubmit = async () => {
    const solicitudData = {
      idUsuario: usuarioId,
      idAsignatura: Number(asignatura),
      idLaboratorio: Number(laboratorio),
      fechaUso: fecha,
      horario: hora,
      cantGrupos: Number(grupo),
      insumos: insumosSeleccionados.map(i => ({
        idInsumo: Number(i.idInsumo),
        cantidad: Number(i.cantidad)
      }))
    };
    if (!window.confirm('Estas seguro de enviar la solicitud?')) return;
    try {
      // Llamada a la mutación de crear solicitud
      const { data } = await crearSolicitud({
        variables: {
          input: solicitudData
        }
      });
      alert('Solicitud creada con éxito!');
      navigate('/teacher-solicitudes');
    } catch (error) {
      alert('Error al crear la solicitud. Por favor, intente nuevamente.');
      console.error('Error al crear la solicitud:', error);
    }
  };

  return (
    <Paper sx={{ p: 4, mt: 8 }}>
      <Typography variant="h5" gutterBottom>Formulario de Solicitud</Typography>
      <Typography variant="body1" gutterBottom>Por favor, complete el siguiente formulario para solicitar el uso de un laboratorio.</Typography>
      
      <Divider sx={{mt: 1}}/>

      {/* Instrucciones */}
      <Typography sx={{mt:2, fontWeight: 'bold'}} variant="body2" gutterBottom>
        Instrucciones:
      </Typography>
      <Typography sx={{ mb: 1 }} variant="body2" paragraph>
        1. Seleccione el laboratorio y la asignatura.
      </Typography>
      <Typography sx={{ mb: 1 }} variant="body2" paragraph>
        2. Complete la fecha y la hora en que necesita el laboratorio.
      </Typography>
      <Typography sx={{ mb: 1 }} variant="body2" paragraph>
        3. Indique cuántos grupos de trabajo utilizarán el laboratorio.
      </Typography>
      <Typography sx={{ mb: 1 }} variant="body2" paragraph>
        4. Elija los insumos necesarios para los grupos de trabajo.
      </Typography>
      <Typography sx={{ mb: 1 }} variant="body2" paragraph>
        Finalmente, haga clic en "Enviar Solicitud".
      </Typography>

      <Divider sx={{mt: 2}}/>

      {/* Nota importante */}
      <Typography sx={{mt:2, fontWeight: 'bold'}} variant="body2" gutterBottom>
        Nota:
      </Typography>
      <Typography variant="body2" paragraph>
        - Cada insumo corresponde a un único grupo de trabajo. Recuerde que esta información será visible en "Mis Solicitudes".
      </Typography>
      
      <Divider sx={{mt: 2}}/>

      <Grid container spacing={2} sx={{ mt: 4 }}>
        {/* Selector de Laboratorio */}
        <Grid sx={{ minWidth: 200 }}>
          <TextField
            select
            label="Laboratorio"
            fullWidth
            value={laboratorio}
            onChange={(e) => setLaboratorio(e.target.value)}
            disabled={laboratoriosLoading}
            required
          >
            {laboratoriosData?.listarLaboratorios.map((lab: { id: number; nombre: string }) => (
              <MenuItem key={lab.id} value={lab.id}>{lab.nombre}</MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Selector de Asignatura */}
        <Grid sx={{ minWidth: 200 }}>
          <TextField
            select
            label="Asignatura"
            fullWidth
            value={asignatura}
            onChange={(e) => setAsignatura(e.target.value)}
            disabled={asignaturasLoading}
            required
          >
            {asignaturasData?.listarAsignaturas.map((asig: { id: number; nombre: string }) => (
              <MenuItem key={asig.id} value={asig.id}>{asig.nombre}</MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Input para Fecha */}
        <Grid>
          <TextField
            label="Fecha"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </Grid>

        {/* Input para Hora */}
        <Grid>
          <TextField
            label="Hora"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          />
        </Grid>

        {/* Input para grupos */}
        <Grid sx={{ minWidth: 200 }}>
          <TextField
            select
            label="Grupos de trabajo"
            fullWidth
            value={grupo}
            onChange={(e) => setGrupo(e.target.value)}
            required
          >
            {/* Opciones del selector */}
            {[1, 2, 3, 4].map((grupoValue) => (
              <MenuItem key={grupoValue} value={grupoValue}>
                {grupoValue}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Componente de Selección de Insumos */}
        <Grid>
          <InsumoTransferList onConfirmInsumos={handleInsumosConfirmados} />
        </Grid>

        {/* Botón para enviar la solicitud */}
        <Grid>
          <Box textAlign="right" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={insumosSeleccionados.length === 0 || !usuarioId || !laboratorio || !asignatura || !fecha || !hora}
            >
              Enviar Solicitud
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SolicitudForm;
