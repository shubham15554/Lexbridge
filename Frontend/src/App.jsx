import  { useEffect, useState } from 'react'
import HomePage from './components/HomePage/HomePage'
import NavBar from './components/NavBar/NavBar'
import { Routes, Route } from 'react-router-dom'
import { MentorCard } from './components/Mentors/MentorCard';
import SignIn from './components/SIgnIn/SignIn'
import About from './components/About/About'
import Signup from './components/Signup/Signup'
import { AuthProvider } from './components/context/authContext'
import { ToastContainer, toast } from 'react-toastify';
import Loby from './components/videoCall/Loby'
import MyBookings from './components/MyBookings/MyBookings';
import 'react-toastify/dist/ReactToastify.css';

import ProtectedRoute from './components/utils/protectedRoute';
import axios from 'axios';
import ManageBookings from './components/manageBookins/ManageBookings';
import Chat from './components/Chat/Chat';
import { SocketProvider } from './components/context/socketContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';

  

const Mentors = () => {
  let [mentorsList, setMentorsList] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    let fetchData = async () => {
      try {
        let res = await axios.get("https://lexbridge-m1oz.onrender.com/mentor/allMentors", { withCredentials: true });
        setMentorsList(res.data.mentors || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-gilroy selection:bg-blue-600 selection:text-white">
      <NavBar />
      
      <main className="max-w-7xl mx-auto px-4 py-10">
       
        <div className="text-center mb-12 flex flex-col items-center gap-2">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-100">
            Our Legal <span className="bg-gradient-to-r from-blue-500 to-[#AE8623] bg-clip-text text-transparent">Mentors</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl">
            Connect with experienced legal professionals for 1-on-1 guidance, mentorship, and career advice.
          </p>
        </div>

       
        {loading ? (
          <div className="flex justify-center items-center py-20 text-slate-400 text-sm">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
            Loading mentors...
          </div>
        ) : mentorsList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {mentorsList.map((mentor) => (
              <MentorCard key={mentor._id} mentor={mentor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-800/40 rounded-2xl border border-slate-700/60 max-w-md mx-auto">
            <p className="text-slate-400 text-sm">No mentors available at the moment.</p>
          </div>
        )}
      </main>
    </div>
  );
};


const App = () => {
  return (

    <div>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
      <SocketProvider>
      <ToastContainer/>
      
      <Routes>
        
        <Route path='/' element={<HomePage />} />
        <Route path='/mentors' element={<Mentors />} />
        <Route path='/about' element={<About />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/myBookings' element={<ProtectedRoute><MyBookings/></ProtectedRoute>  }/>
        <Route path='/manageBookings' element={<ProtectedRoute><ManageBookings/></ProtectedRoute>  }/>
        <Route path='/chat/:roomId' element={<ProtectedRoute><Chat/></ProtectedRoute>} />
        <Route path='/video/:loby' element={<ProtectedRoute><Loby/></ProtectedRoute>} />
        </Routes>
        </SocketProvider>
      </AuthProvider>
      </GoogleOAuthProvider>
    </div>
  )
}


export default App