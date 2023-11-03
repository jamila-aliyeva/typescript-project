import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/loginPage"
import UserLayout from "./components/Layout"
import Education from "./pages/EducationPage"
import SkillsPage from "./pages/SkillsPage"
// import { useContext } from "react";
// import { AuthContext } from "./context/AuthContext";



function App() {
  // const { isAuthenticated, user } = useContext(AuthContext);
  // const role: string | undefined = user?.role;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="login" element={<LoginPage />} />

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

       
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/education" element={<Education />} />
    
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
