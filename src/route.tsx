import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {RouterLayout} from "./components/common/RouterLayout";
import {LoginPage} from "./pages/auth/loginPage";

//ADMINISTRADOR------------------------
import AdminPage from "./pages/admin/adminPage";
import AdminDashboard from "./pages/admin/adminDashboard";
//TEACHER------------------------
import TeacherPage from "./pages/teacher/teacherPage";


export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>}/>
      {/* Rutas sin el navbar */}
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/" element={<RouterLayout/>}>
        {/* Rutas ADMIN */}
        <Route path="/admin-solicitudes" element={<AdminPage/>} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        {/* Rutas PROFESOR */}
        <Route path="/teacher" element={<TeacherPage/>} />
        
        {/* EJEMPLOS */}
        {/* <Route path="/teacher/registrarEvaluaciones/:subjectId" element={<EvaluationPage />} /> */}
        {/* <Route path="/teacher/registrarNotas/:courseId/:subjectId" element={<NotasPage />} /> */}
        
      </Route>
    </Routes>
  );
};
