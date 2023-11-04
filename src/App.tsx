import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Education from "./pages/admin/EducationPage";
import Experience from "./pages/admin/ExperiensesPage";
import AdminLayout from "./components/layout/admin";
import Dashboard from "./pages/admin/Dashboard";
import Portfolios from "./pages/admin/Portfolios";
import UserPage from "./pages/admin/UserPage";
import Messeges from "./pages/admin/Messeges";

// import { useContext } from "react";
// import { AuthContext } from "./context/AuthContext";
import HomePage from "./pages/public/HomePage";
import LoginPage from "./pages/public/LoginPage";
import Register from "./pages/public/Register";
import SkillsPage from "./pages/admin/SkillsPage";

function App() {
  // const { isAuthenticated, user } = useContext(AuthContext);
  // const role: string | undefined = user?.role;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        {/* <Route
          path="user"
          element={
            isAuthenticated && role === "user" ? (
              <Education />
            ) : (
              <Navigate to="/login" />
            )
          }
        /> */}
        <Route path="/" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="education" element={<Education />} />
          <Route path="experiences" element={<Experience />} />
          <Route path="portfolios" element={<Portfolios />} />
          <Route path="messeges" element={<Messeges />} />
          <Route path="users" element={<UserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
