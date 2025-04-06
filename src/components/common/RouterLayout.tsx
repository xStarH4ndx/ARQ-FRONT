import React from "react";
import { Outlet } from "react-router-dom";
import MainLayout from "../../layout/mainLayout";

export const RouterLayout: React.FC = () => {
  return (
    <>
      <MainLayout>
        <Outlet /> {/*esto me muestra la ruta (pagina) actual*/}
      </MainLayout>
    </>
  );
};
