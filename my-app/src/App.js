//import MedicalTourismPlatform from './components/MedicalTourismPlatform';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MedicalTourismPlatform from './components/MedicalTourismPlatform';
import DoctorsList from './components/DoctorsList';
import BookAppointment from './components/BookAppointment';
import MyAppointments from './components/MyAppointments';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<MedicalTourismPlatform />} />
      <Route path="/doctors" element={<DoctorsList />} />
      <Route path="/book/:doctorId" element={<BookAppointment />} />
      <Route path="/my-appointments" element={<MyAppointments />} />
    </Routes>
  </Router>
  );
}

export default App;