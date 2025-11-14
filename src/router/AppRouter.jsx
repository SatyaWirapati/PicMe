import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ExplorePage from "../pages/ExplorePage";
import AddPage from "../pages/AddPage";
import MainLayout from "../layouts/MainLayout";
import SettingsPage from "../pages/SettingsPage";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/settings" element={<SettingsPage/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
