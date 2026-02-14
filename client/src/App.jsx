import { Routes, Route } from "react-router-dom";

import Seniors from "./pages/Seniors";
import Login from "./pages/Login";
//import Register from "./pages/Register";
//import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Seniors />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/register" element={<Register />} /> */}

      {/* After Login */}
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
    </Routes>
  );
}

export default App;
