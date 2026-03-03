import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ScanDetail from "../pages/ScanDetail";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="route-screen-motion">
      <Routes location={location}>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scans" element={<ScanDetail />} />
        <Route path="/scan/:id" element={<ScanDetail />} />
      </Routes>
    </div>
  );
}
