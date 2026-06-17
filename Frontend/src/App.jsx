import React, { useEffect, useState } from 'react'
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
import BookingSummaryCard from './components/BookingSummaryCard/BookingSummaryCard';
import ProtectedRoute from './components/utils/protectedRoute';
import axios from 'axios';
import ManageBookings from './components/manageBookins/ManageBookings';
import Chat from './components/Chat/Chat';
import { SocketProvider } from './components/context/socketContext';
const Mentors = () => {

   let [mentorsList , setMentorsList] = useState([]);

  useEffect( ()=>{
      
    let fetchData = async ()=>{
          try{
        let res = await axios.get("https://lexbridge-m1oz.onrender.com/mentor/allMentors", { withCredentials: true });
        setMentorsList(res.data.mentors);
      }
      catch(err){
        console.log(err);
      }
    }

    fetchData();
      
  },[])

  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      <div>
        <h1 className="text-6xl font-bold underline p-4 mb-4 text-center bg-linear-to-r from-blue-600 to-[#e7bd3e] bg-clip-text text-transparent">Our Legal Mentors</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          { mentorsList.length > 0 &&   mentorsList.map((mentor) => (
            <MentorCard key={mentor._id}  mentor={mentor} />
          ))}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
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
        <Route path='/vedio/:loby' element={<ProtectedRoute><Loby/></ProtectedRoute>} />
        </Routes>
        </SocketProvider>
      </AuthProvider>
    </div>
  )
}


export default App