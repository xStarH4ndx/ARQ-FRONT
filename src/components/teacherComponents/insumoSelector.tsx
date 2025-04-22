import { useEffect, useState } from 'react';
import {
  Grid, Card, CardHeader, List, ListItemButton, ListItemText,
  ListItemIcon, Checkbox, Divider, Button, TextField
} from '@mui/material';
import { useQuery } from '@apollo/client';
import { STOCK_INSUMOS } from '../../graphql/insumo';

interface Insumo {
  id: string;
  nombre: string;
  tipo: string;
  unidadMedida: string;
  stockDisponible: number;
}

interface InsumoSeleccionado extends Insumo {
  cantidad: number;
}

interface InsumoTransferListProps {
    onConfirmInsumos: (insumos: InsumoSeleccionado[]) => void;
}

export default function InsumoTransferList({ onConfirmInsumos  }: InsumoTransferListProps) {
  const { data, loading } = useQuery(STOCK_INSUMOS);
  const [checked, setChecked] = useState<string[]>([]);
  const [left, setLeft] = useState<Insumo[]>([]);
  const [right, setRight] = useState<InsumoSeleccionado[]>([]);

  useEffect(() => {
    if (!loading && data) {
      setLeft(data.stockInsumosDisponibles);
    }
  }, [data, loading]);

  const handleToggle = (id: string) => () => {
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleCheckedRight = () => {
    const selected = left.filter(i => checked.includes(i.id));
    const updatedRight = selected.map(i => ({ ...i, cantidad: 1 }));
    setRight(prev => [...prev, ...updatedRight]);
    setLeft(prev => prev.filter(i => !checked.includes(i.id)));
    setChecked(prev => prev.filter(id => !selected.find(s => s.id === id)));
  };

  const handleCheckedLeft = () => {
    const toReturn = right.filter(i => checked.includes(i.id));
    setLeft(prev => [...prev, ...toReturn]);
    setRight(prev => prev.filter(i => !checked.includes(i.id)));
    setChecked(prev => prev.filter(id => !toReturn.find(s => s.id === id)));
  };

  const handleCantidadChange = (id: string, cantidad: number) => {
    setRight(prev =>
      prev.map(i =>
        i.id === id ? { ...i, cantidad } : i
      )
    );
  };

  const renderList = (title: string, items: Insumo[] | InsumoSeleccionado[], isRight = false) => (
    <Card sx={{ width: 300, backgroundColor: '#1D1D1D' }}>
      <CardHeader title={title} />
      <Divider />
      <List dense sx={{ height: 300, overflow: 'auto' }}>
        {items.map(item => (
          <ListItemButton
            key={item.id}
            onClick={handleToggle(item.id)}
            selected={checked.includes(item.id)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.includes(item.id)}
                tabIndex={-1}
              />
            </ListItemIcon>
            <ListItemText
              primary={item.nombre}
              secondary={item.tipo}
            />
            {isRight && (
              <TextField
                type="number"
                size="small"
                inputProps={{
                  min: 1,
                  max: item.stockDisponible,
                }}
                sx={{ width: 70, ml: 1 }}
                value={(item as InsumoSeleccionado).cantidad}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) =>
                  handleCantidadChange(item.id, Number(e.target.value))
                }
              />
            )}
          </ListItemButton>
        ))}
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid>{renderList('Insumos disponibles', left)}</Grid>
      <Grid>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            onClick={handleCheckedRight}
            disabled={checked.filter(id => left.some(i => i.id === id)).length === 0}
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            onClick={handleCheckedLeft}
            disabled={checked.filter(id => right.some(i => i.id === id)).length === 0}
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid>{renderList('Insumos seleccionados', right, true)}</Grid>
      <Grid>
        <Button
            variant="contained"
            color="primary"
            onClick={() => onConfirmInsumos(right)}
            disabled={right.length === 0}
        >
            Confirmar Insumos
        </Button>
    </Grid>

    </Grid>
  );
}
