import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppRouter } from './route';
import { BrowserRouter } from 'react-router-dom';
import './App.css'

function App() {
  // Crear un tema oscuro
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
