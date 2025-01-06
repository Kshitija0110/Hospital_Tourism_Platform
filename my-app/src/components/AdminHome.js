
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { useNavigate } from 'react-router-dom';
import {Hospital} from 'lucide-react';


const AdminHome = () => {
const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/hospitals1');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setHospitals(data);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const handleDelete = async (id) => {
    // Add delete functionality
    console.log('Delete hospital:', id);
  };
  const handleAddNew = () => {
    navigate('/add-hospital');
  };

  const arrayBufferToBase64 = (buffer) => {
    if (!buffer) return '';
    try {
      const binary = Array.from(new Uint8Array(buffer))
        .map(b => String.fromCharCode(b))
        .join('');
      return btoa(binary);
    } catch (error) {
      console.error('Error converting image:', error);
      return '';
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
          {loading ? (
          <div className="text-center">Loading hospitals...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitals.map((hospital) => (
              <Card key={hospital.id} className="hover:shadow-lg transition-all flex flex-col justify-between h-full relative overflow-hidden">
                {/* Image at top of card */}
    {hospital.image ? (
      <div className="w-full h-48 relative">
        <img
          src={`data:image/png;base64,${arrayBufferToBase64(hospital.image)}`}
          alt={hospital.hospital_name}
          className="w-full h-full object-cover"
        />
      </div>
    ) : (
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
        <Hospital className="h-16 w-16 text-gray-400" />
      </div>
    )}
                <CardContent className="p-6 flex flex-col flex-grow relative z-10 bg-white/60 backdrop-blur-sm">
                  <h2 className="text-xl font-bold mb-2 text-gray-900">{hospital.hospital_name}</h2>
                  <p className="text-gray-600 mb-2 font-medium">
                    <strong>Address:</strong> {hospital.address}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Speciality:</strong> {hospital.speciality}
                  </p>
                  <p className="text-gray-600 flex-grow">{hospital.description}</p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => navigate(`/hospital-details/${hospital.id}`)}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      View Details
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Add New Hospital Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate('/add-hospital')} 
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Add New Hospital
          </button>


        </div>
      </div>
    </div>
    </div>
  );
};


export default AdminHome;