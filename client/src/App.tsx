import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import UserPage from "./pages/UserPage";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import UserProfile from "./pages/UserProfile";
import ViewAppliedJobs from "./pages/ViewAppliedJobs";
import ApplyEmployer from "./pages/ApplyEmployer";
import PostJob from "./pages/PostJob";
import EmployeerPage from "./pages/EmployeerPage";
import CandidatePage from "./pages/CandidatePage";
import EmployeerApplicationPage from "./pages/EmployeerApplicationPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PublicRoutes />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/jobs" element={<Jobs />} />

        <Route element={<ProtectedRoutes />}>
          {/* Admin route */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employeers-page" element={<EmployeerPage />} />
          <Route path="/candidates-page" element={<CandidatePage />} />
          <Route
            path="/employeers-application-page"
            element={<EmployeerApplicationPage />}
          />

          {/* Candidate Route */}
          <Route path="/user-page" element={<UserPage />} />
          <Route path="/profile/me" element={<UserProfile />} />
          <Route path="/view-applied-jobs" element={<ViewAppliedJobs />} />
          {/* Employeer Route */}
          <Route path="/apply-employer" element={<ApplyEmployer />} />
          <Route path="/post-job" element={<PostJob />} />
        </Route>

        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
