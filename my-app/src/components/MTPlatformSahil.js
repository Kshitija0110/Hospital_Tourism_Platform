import React, { useState } from 'react';
import axios from 'axios';

import {
  Search,
  MapPin,
  Calendar,
  Star,
  Heart,
  Activity,
  MessageCircle,
  X,
  Send,
  Plus,
  Stethoscope,
  FileText,
  Video,
  Clock,
  Camera,
  DollarSign,
  Globe,
  User,
  Settings,
  BedDouble,
  Clipboard
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/card';
import doctorPatientImage from '../assets/doctor_patient.jpg';

const MedicalTourismPlatform = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm MediBot, your AI healthcare assistant. How can I help you today?", isBot: true }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now(), text: newMessage, isBot: false }]);
      setNewMessage('');

      try {
        const response = await axios.post('https://sahilbaviskar-aimedicalchatbot.hf.space/chat', { message: newMessage }); // Updated API endpoint
        const aiResponse = response.data.response;
        setMessages((prev) => [...prev, { id: Date.now() + 1, text: aiResponse, isBot: true }]);
      } catch (error) {
        console.error('Error:', error);
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, text: 'Sorry, something went wrong. Please try again.', isBot: true }
        ]);
      }
    }
  };

  const procedures = [
    { id: 1, name: 'Heart Surgery', cost: '$15,000-$25,000', recovery: '4-6 weeks' },
    { id: 2, name: 'Knee Replacement', cost: '$12,000-$18,000', recovery: '2-3 months' },
    { id: 3, name: 'Dental Implants', cost: '$3,000-$6,000', recovery: '3-6 months' }
  ];

  const hospitals = [
    {
      id: 1,
      name: 'Global Health Center',
      location: 'Bangkok, Thailand',
      specialties: ['Cardiology', 'Orthopedics'],
      rating: 4.9,
      accreditations: ['JCI', 'ISO'],
      facilities: ['ICU', 'Rehabilitation']
    },
    {
      id: 2,
      name: 'Advanced Medical Institute',
      location: 'Mumbai, India',
      specialties: ['Oncology', 'Neurology'],
      rating: 4.8,
      accreditations: ['NABH', 'JCI'],
      facilities: ['Robot Surgery', 'PET Scan']
    }
  ];

  const Features = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {[
        { icon: <Stethoscope />, title: 'Virtual Consultation', desc: 'Connect with doctors globally' },
        { icon: <FileText />, title: 'Medical Records', desc: 'Secure document sharing' },
        { icon: <BedDouble />, title: 'Hospital Booking', desc: 'Reserve your treatment' },
        { icon: <Clipboard />, title: 'Treatment Plans', desc: 'Personalized care protocols' },
        { icon: <Video />, title: 'Remote Follow-up', desc: 'Post-procedure care' },
        { icon: <Globe />, title: 'Travel Assistance', desc: 'Visa and accommodation support' }
      ].map((feature, index) => (
        <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">{feature.icon}</div>
            <div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-3 rounded-xl">
            <Stethoscope className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            HealthJourney Global
          </h1>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-50">
            <User className="h-5 w-5" />
            Sign In
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            <Plus className="h-5 w-5" />
            Book Consultation
          </button>
        </div>
      </div>

      {/* Other components remain unchanged */}
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
          <Activity className="w-full h-full" />
        </div>
        <h2 className="text-4xl font-bold mb-4">Find Your Path to Better Health</h2>
        <p className="text-xl mb-6">Access Premium Healthcare Worldwide</p>

        <div className="bg-white rounded-xl p-4 flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search procedures, doctors, or hospitals..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Search
          </button>
        </div>
      </div>

      {/* AI Recommendation */}
      <Alert className="mb-8 bg-green-50 border-green-200">
        <Activity className="h-4 w-4" />
        <AlertTitle>AI-Powered Recommendation</AlertTitle>
        <AlertDescription>
          Based on your profile and current health needs, we recommend exploring cardiac treatments
          in Thailand during October-November for optimal weather and pricing.
        </AlertDescription>
      </Alert>

      {/* Features Grid */}
      <Features />

      {/* Procedures Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Popular Medical Procedures</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {procedures.map(proc => (
            <Card key={proc.id} className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-3">{proc.name}</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <DollarSign className="h-4 w-4" />
                  <span>{proc.cost}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Clock className="h-4 w-4" />
                  <span>Recovery: {proc.recovery}</span>
                </div>
                <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Learn More
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Hospitals Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Featured Hospitals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hospitals.map(hospital => (
            <Card key={hospital.id} className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg">{hospital.name}</h3>
                  <Heart className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer" />
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{hospital.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>{hospital.rating}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {hospital.specialties.map(spec => (
                    <span key={spec} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {spec}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {hospital.accreditations.map(acc => (
                    <span key={acc} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                      {acc}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      
      {/* Chatbot */}
      <div>
        {/* Chat Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:-translate-y-1"
        >
          {isChatOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
        {/* Chat Window */}
        {isChatOpen && (
          <div className="fixed bottom-24 right-6 w-96 bg-white rounded-xl shadow-2xl border">
            {/* Chat Header */}
            <div className="bg-blue-600 p-4 rounded-t-xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg">
                  <Stethoscope className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-white font-bold">MediBot Assistant</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-white hover:text-gray-200">
                <X className="h-5 w-5" />
              </button>
            </div>
            {/* Chat Body */}
            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`mb-4 flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${msg.isBot ? 'bg-white' : 'bg-blue-600 text-white'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            {/* Chat Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask about treatments, costs, or facilities..."
                  className="flex-1 p-2 border rounded-lg"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalTourismPlatform;
