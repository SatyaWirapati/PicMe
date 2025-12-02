import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ExplorePage from "../pages/ExplorePage";
import AddPage from "../pages/AddPage";
import MainLayout from "../layouts/MainLayout";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import StoriesPage from "../pages/StoriesPage";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/explore" element={<ExplorePage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/stories" element={<StoriesPage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
