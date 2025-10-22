import { Routes, Route } from "react-router-dom";
import PatientForm from "../components/pages/PatientForm";
import PatientList from "../components/pages/PatientList";
import PatientDetail from "../components/pages/PatientDetail";
import EditPatient from "../components/pages/EditPatient";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PatientForm />} />
      <Route path="/patients" element={<PatientList />} />
      <Route path="/patients/:id" element={<PatientDetail />} />
      <Route path="/patients/:id/edit" element={<EditPatient />} />
    </Routes>
  );
}
