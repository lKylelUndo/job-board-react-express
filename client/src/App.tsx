import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/jobs" element={<Jobs />} />

        {/* Admin route */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* User Route */}
        <Route path="/homepage" element={<h1>Test</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
