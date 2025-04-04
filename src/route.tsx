import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {RouterLayout} from "./components/common/RouterLayout";
import { LoginPage } from "./pages/auth/loginPage";

//ADMINISTRADOR------------------------
//TEACHER------------------------
import TeacherPage from "./pages/teacher/teacherPage";


export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>}/>
      {/* Rutas sin el navbar */}
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/" element={<RouterLayout/>}>
        {/* Rutas PROFESOR */}
        <Route path="/teacher" element={<TeacherPage/>} />
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
