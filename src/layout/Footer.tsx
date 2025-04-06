import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', py: 2, mt: 'auto' }}>
      <Typography variant="body2" color="white">
        © {new Date().getFullYear()} Equipo EPSON | Todos los derechos reservados
      </Typography>
    </Box>
  );
};

export default Footer;
