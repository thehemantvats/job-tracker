import MainLayout from "./layouts/MainLayout";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Resumes from "./pages/Resumes";
import Tailor from "./pages/Tailor";
import Kanban from "./pages/Kanban";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/resumes" element={<Resumes />} />
        <Route path="/tailor" element={<Tailor />} />
        <Route path="/kanban" element={<Kanban />} />
      </Routes>
    </MainLayout>
  );
}

export default App;