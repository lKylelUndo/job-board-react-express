import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import UserPage from "./pages/UserPage";
import ProtectedRoutes from "./routes/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/jobs" element={<Jobs />} />

        <Route element={<ProtectedRoutes />}>
          {/* Admin route */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* User Route */}
          <Route path="/user-page" element={<UserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
