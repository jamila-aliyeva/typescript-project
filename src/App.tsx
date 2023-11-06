import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Education from "./pages/admin/EducationPage";
import Experience from "./pages/admin/ExperiensesPage";
import Dashboard from "./pages/admin/Dashboard";
import Portfolios from "./pages/admin/Portfolios";
import UserPage from "./pages/admin/UserPage";
import Messeges from "./pages/admin/Messeges";

import HomePage from "./pages/public/HomePage";
import LoginPage from "./pages/public/LoginPage";
import Register from "./pages/public/Register";
import SkillsPage from "./pages/admin/SkillsPage";

import UserLayout from "./components/layout/user";
import ProfilePage from "./pages/user/ProfilePage";
import UserSkill from "./pages/user/UserSkill";
import UserEducation from "./pages/user/userEducation";
import UserPortfolio from "./pages/user/UserPortfolio";
import AccountPage from "./pages/public/AccountPage";
import AdminLayout from "./components/layout/admin";
import { authName } from "./redux/slice/auth";
import { useSelector } from "react-redux";
// import useLogin from "./zustand/login";

function App() {
  // const { isAuthenticated, role } = useLogin();
  const { isAuthenticated, user } = useSelector((state) => state[authName]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/" element={<UserLayout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/userSkill" element={<UserSkill />} />
          <Route path="/userEducation" element={<UserEducation />} />
          <Route path="/userPortfolios" element={<UserPortfolio />} />
        </Route>
        <Route
          element={
            isAuthenticated && user?.role === "admin" ? (
              <AdminLayout />
            ) : (
              <Navigate to="/login" />
            )
          }>
          {/* <Route path="/" element={<AdminLayout />}> */}
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
