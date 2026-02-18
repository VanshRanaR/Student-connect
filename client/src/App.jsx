import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Seniors from "./pages/Seniors";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import AdminApproval from "./pages/AdminApproval";
import Meeting from "./pages/Meeting";
import Meetings from "./pages/Meetings";  
import Footer from "./components/Footer";
 

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Seniors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat/:mentorId"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        {/* Book Meeting Page */}
        <Route
          path="/meeting/:mentorId"
          element={
            <ProtectedRoute>
              <Meeting />
            </ProtectedRoute>
          }
        />

        {/* My Meetings Page */}
        <Route
          path="/meetings"
          element={
            <ProtectedRoute>
              <Meetings />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin-approval"
          element={
            <ProtectedRoute>
              <AdminApproval />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />

    </>
  );
}

export default App;
