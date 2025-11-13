import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ExplorePage from "../pages/ExplorePage";
import AddPage from "../pages/AddPage";
import MainLayout from "../layouts/MainLayout";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/add" element={<AddPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
