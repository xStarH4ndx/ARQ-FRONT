import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RouterLayout } from "./components/common/RouterLayout";
import { LoginPage } from "./pages/auth/loginPage";
import TeacherPage from "./pages/teacher/teacherPage";
import SolicitudForm from "./pages/teacher/solicitudForm"; // Importar el componente del formulario

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      {/* Rutas sin el navbar */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<RouterLayout />}>
        {/* Rutas PROFESOR */}
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/crear-solicitud" element={<SolicitudForm />} /> {/* Añadir la ruta para el formulario */}
        {/* <Route path="/teacher/registrarEvaluaciones/:subjectId" element={<EvaluationPage />} /> */}
        {/* <Route path="/teacher/registrarNotas/:courseId/:subjectId" element={<NotasPage />} /> */}
        
        {/* Rutas ADMIN */}
        {/* <Route path="/parent/myProfile" element={<AsistenciaPage />} /> */}
        {/* <Route path="/parent/contact" element={<TeacherPage />} /> */}
        {/* <Route path="/parent/viewEvents" element={<TeacherPage />} /> */}
        {/* <Route path="/parent/viewGrades" element={<TeacherPage />} /> */}
      </Route>
    </Routes>
  );
};