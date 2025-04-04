import React from "react";
import { Outlet } from "react-router-dom";
import BarraNavegacion from "./Navbar";

export const RouterLayout: React.FC = () => {
  return (
    <>
      <BarraNavegacion />
      <Outlet /> {/*esto me muestra la ruta (pagina) actual*/}
    </>
  );
};
