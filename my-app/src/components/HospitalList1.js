import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';

const HospitalList = () => {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]); // Initialize as empty array
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!hospitals.length) return <div>No hospitals found</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Hospitals</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.map((hospital) => (
          <Card key={hospital.id} className="hover:shadow-lg transition-all flex flex-col justify-between h-full">
            <CardContent className="p-6 flex flex-col flex-grow">
              <h2 className="text-xl font-bold mb-2">{hospital.hospital_name}</h2>
              <p className="text-gray-600 mb-2">
                <strong>Address:</strong> {hospital.address}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Speciality:</strong> {hospital.speciality}
              </p>
              <p className="text-gray-600 flex-grow">{hospital.description}</p>
              <button
                onClick={() => navigate('/doctors')}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4"
              >
                View Details
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HospitalList;
