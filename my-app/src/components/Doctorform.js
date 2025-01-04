import React, { useState } from 'react';
import { Upload, User, Mail, Lock, Phone, Award, Calendar, Heart, FileText } from 'lucide-react';

const DoctorForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    speciality: '',
    department: '',
    experience: '',
    successStory: '',
    certificates: []
  });

  const [certificateFields, setCertificateFields] = useState([
    { name: '', authority: '', startDate: '', endDate: '' }
  ]);

  const departments = [
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Gynecology',
    'Dermatology',
    'General Medicine',
    'Oncology',
    'Ophthalmology',
    'ENT'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCertificateChange = (index, field, value) => {
    const newCertificates = [...certificateFields];
    newCertificates[index][field] = value;
    setCertificateFields(newCertificates);
  };

  const handleFileUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newCertificates = [...formData.certificates];
      newCertificates[index] = file;
      setFormData(prev => ({
        ...prev,
        certificates: newCertificates
      }));
    }
  };

  const addCertificateField = () => {
    setCertificateFields([
      ...certificateFields,
      { name: '', authority: '', startDate: '', endDate: '' }
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const completeFormData = {
      ...formData,
      certificates: certificateFields
    };
    onSubmit(completeFormData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Doctor Registration Form</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
         {/* Name Field */}
         <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

       {/* Email Field */}
       <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

    
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="pl-10 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Gender Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleInputChange}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleInputChange}
                className="mr-2"
              />
              Female
            </label>
          </div>
        </div>

        {/* Professional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Speciality
            </label>
            <select
              name="speciality"
              value={formData.speciality}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Speciality</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Years of Experience
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Years</option>
              {[...Array(40)].map((_, i) => (
                <option key={i+1} value={i+1}>{i+1} years</option>
              ))}
            </select>
          </div>
        </div>

        {/* Certificates */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Certificates</h3>
            <button
              type="button"
              onClick={addCertificateField}
              className="text-blue-600 hover:text-blue-700"
            >
              + Add Certificate
            </button>
          </div>

          {certificateFields.map((cert, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Certificate Name"
                  value={cert.name}
                  onChange={(e) => handleCertificateChange(index, 'name', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Issuing Authority"
                  value={cert.authority}
                  onChange={(e) => handleCertificateChange(index, 'authority', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
                <input
                  type="date"
                  placeholder="Start Date"
                  value={cert.startDate}
                  onChange={(e) => handleCertificateChange(index, 'startDate', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
                <input
                  type="date"
                  placeholder="End Date"
                  value={cert.endDate}
                  onChange={(e) => handleCertificateChange(index, 'endDate', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-gray-400" />
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(e, index)}
                  className="w-full"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Success Story */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Success Story
          </label>
          <textarea
            name="successStory"
            value={formData.successStory}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
            placeholder="Share your notable achievements and success stories..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Register as Doctor
        </button>
      </form>
    </div>
  );
};

export default DoctorForm;