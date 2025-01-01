//import MedicalTourismPlatform from './components/MedicalTourismPlatform';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MedicalTourismPlatform from './components/MedicalTourismPlatform';
import DoctorsList from './components/DoctorsList';
import BookAppointment from './components/BookAppointment';
import MyAppointments from './components/MyAppointments';
import HospitalsList from './components/HospitalsList';
import Success from './components/Success';
import Cancel from './components/Cancel';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
    <Router>
    <Routes>
      <Route path="/" element={<MedicalTourismPlatform />} />
      <Route path="/doctors" element={<DoctorsList />} />
      <Route path="/book/:doctorId" element={<BookAppointment />} />
      <Route path="/my-appointments" element={<MyAppointments />} />
      <Route path="/hospitals" element={<HospitalsList />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
    </Routes>
  </Router>
  </AuthProvider>
  );
}

export default App;