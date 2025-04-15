import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';

interface SidebarProps {
  onSelect: (component: string) => void;
}

const AdminSidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  const opciones = [
    { id: 'asignaturas', label: 'Gestión de Asignaturas' },
    { id: 'laboratorios', label: 'Gestión de Laboratorio' },
    { id: 'insumos', label: 'Gestión de Insumos' },
  ];

  return (
    <Paper elevation={3} sx={{ width: 250, height: '100%', paddingY: 4, position: 'fixed', top: 50, left: 0 }}>
    <h2 style={{ textAlign: 'center', marginBottom: 2 }}>Panel de Control</h2>
      <List>
        {opciones.map((opcion) => (
          <ListItem key={opcion.id} disablePadding>
            <ListItemButton onClick={() => onSelect(opcion.id)}>
              <ListItemText primary={opcion.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default AdminSidebar;
