import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import {  Clock,
  Heart, // Cardiologist
  Brain, // Neurologist
  User, // General physician
  Baby, // Pediatrician
  Stethoscope,
  Smile, // Dermatologist
  GraduationCap, // Education
 } from 'lucide-react';

import doc1 from '../assets/doc1.png';
import doc2 from '../assets/doc2.png';
import doc3 from '../assets/doc3.png';
import doc4 from '../assets/doc4.png';
import doc5 from '../assets/doc5.png';
import doc6 from '../assets/doc6.png';
import doc7 from '../assets/doc7.png';
import doc8 from '../assets/doc8.png';
import doc9 from '../assets/doc9.png';
import doc10 from '../assets/doc10.png';


const DoctorsList = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  const specialties = [
    { name: 'General Physician', icon: Stethoscope },
    { name: 'Gynecologist', icon: User },
    { name: 'Pediatrician', icon: Baby },
    { name: 'Neurologist', icon: Brain },
    { name: 'Cardiologist', icon: Heart },
    { name: 'Dermatologist', icon: Smile }
  ];

// Create an image map
const doctorImages = {
  'doc1': doc1,
  'doc2': doc2,
  'doc3': doc3,
  'doc4': doc4,
  'doc5': doc5,
  'doc6': doc6,
  'doc7': doc7,
  'doc8': doc8,
  'doc9': doc9,
  'doc10': doc10
  
  
};

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/doctors');
        const data = await response.json();
        console.log('Fetched data:', data); // Debug log
        if (Array.isArray(data)) {
          setDoctors(data);
        } else {
          setDoctors([]); // Ensure doctors is always an array
          setError('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = selectedSpecialty
    ? doctors.filter(doctor => doctor.speciality === selectedSpecialty)
    : doctors;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!doctors.length) return <div>No doctors found</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Doctors</h1>

      {/* Specialty Filter Section */}
      <div className="flex gap-4 mb-8 overflow-x-auto py-4">
        <div
          onClick={() => setSelectedSpecialty(null)}
          className={`flex flex-col items-center cursor-pointer ${
            !selectedSpecialty ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center mb-2 hover:border-blue-600">
            <User className="w-8 h-8" />
          </div>
          <span className="text-sm">All</span>
        </div>
        
        {specialties.map((specialty) => {
          const Icon = specialty.icon;
          return (
            <div
              key={specialty.name}
              onClick={() => setSelectedSpecialty(specialty.name)}
              className={`flex flex-col items-center cursor-pointer ${
                selectedSpecialty === specialty.name ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center mb-2 hover:border-blue-600">
                <Icon className="w-8 h-8" />
              </div>
              <span className="text-sm whitespace-nowrap">{specialty.name}</span>
            </div>
          );
        })}
      </div>



      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredDoctors.map((doctor) => (
    <Card key={doctor.id} className="hover:shadow-lg transition-all">
      <CardContent className="p-6">
        <img 
          src={doctorImages[doctor.id] || doctorImages.doc1}
          alt={doctor.Name1 || 'Doctor'}
          className="w-full h-50 object-cover rounded-lg mb-4"
        />
        <h2 className="text-xl font-bold mb-2">{doctor.Name1}</h2>
        <p className="text-gray-600 mb-2">{doctor.speciality}</p>
        
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <GraduationCap className="h-4 w-4" />
          <span>Experience: {doctor.experience}</span>
        </div>
        
        <button 
      onClick={() => navigate(`/book/doc${doctor.id.substring(3)}`)}
      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4"
    >
      Book Appointment
         </button>
        
        
    
        
        
        
      </CardContent>
    </Card>
  ))}
</div>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    </div>
  );
};

export default DoctorsList;