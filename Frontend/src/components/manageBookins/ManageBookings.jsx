import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import NavBar from '../NavBar/NavBar'
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Clock, Calendar, Video, AlertCircle, Sparkles, User, MessageSquare, CheckCircle, XCircle } from "lucide-react";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(new Date());
  let {user } = useContext(AuthContext);
  let Navigate= useNavigate();
  
  useEffect(() => {
    console.log(user);
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
    
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("https://lexbridge-m1oz.onrender.com/session/manageBookings",{
      withCredentials: true
    });
      console.log("bookings ...........");
      console.log(res);
      setBookings(res.data.bookings || []);
    } catch (e) {
      console.error("Fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);


  const parseDateTime = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return null;
    try {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":");
      
      let h = parseInt(hours, 10);
      if (modifier === "PM" && h < 12) h += 12;
      if (modifier === "AM" && h === 12) h = 0;

      const dateObj = new Date(dateStr); 
      dateObj.setHours(h, parseInt(minutes, 10), 0);
      return dateObj;
    } catch (e) {
      return null;
    }
  };

 
  const isJoinable = (dateStr, timeStr) => {
    const start = parseDateTime(dateStr, timeStr);
    if (!start) return false;

    const bufferStart = new Date(start.getTime() - 5 * 60000); 
    const end = new Date(start.getTime() + 60 * 60000); 
    
    return now >= bufferStart && now <= end;
    return true;
  };

  if (loading) {
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/80 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
  }

 return (
    <div className="bg-[#0f172a] min-h-screen text-slate-100 font-sans selection:bg-blue-600 selection:text-white"> 
      <NavBar />
      
      <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4" /> Mentorship Sessions
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              My Bookings
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 px-4 py-2 rounded-xl self-start sm:self-auto backdrop-blur-md">
            <Clock className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-xs text-slate-400 font-medium">Local Time:</span>
            <span className="text-xs text-slate-200 font-mono font-bold">
              {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 animate-pulse flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <div className="h-6 w-48 bg-slate-700/60 rounded-md"></div>
                  <div className="flex gap-4">
                    <div className="h-4 w-28 bg-slate-700/40 rounded-md"></div>
                    <div className="h-4 w-28 bg-slate-700/40 rounded-md"></div>
                  </div>
                </div>
                <div className="h-12 w-36 bg-slate-700/50 rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-slate-800/20 border border-dashed border-slate-800 rounded-3xl p-12 text-center max-w-lg mx-auto my-12">
            <div className="w-16 h-16 bg-slate-800/80 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-700/50">
              <AlertCircle className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-1">No Bookings Found</h3>
            <p className="text-slate-400 text-sm max-w-sm mx-auto mb-6">
              You haven't scheduled any mentorship sessions yet. Explore mentors and book your first slot!
            </p>
            <button
              onClick={() => navigate('/mentors')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-xl transition shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              Explore Mentors
            </button>
          </div>
        ) : (
          <div className="grid gap-5">
            {bookings.map((b) => {
              const joinActive = isJoinable(b.date, b.timeSlot, b.status);

              return (
                <div 
                  key={b._id} 
                  className={`relative overflow-hidden bg-slate-800/40 backdrop-blur-md border transition-all duration-300 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                    joinActive 
                      ? 'border-blue-500/60 shadow-[0_0_30px_rgba(59,130,246,0.15)] bg-gradient-to-r from-blue-950/20 via-slate-800/40 to-slate-800/40' 
                      : 'border-slate-800 hover:border-slate-700/80'
                  }`}
                >
                  {joinActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 to-amber-500"></div>
                  )}

                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-slate-800 rounded-lg border border-slate-700/60">
                          <User className="w-4 h-4 text-blue-400" />
                        </div>
                        <h2 className="text-slate-100 font-bold text-xl tracking-tight">
                          Session with {b.mentorName || b.userId?.name || "Mentor"}
                        </h2>
                      </div>

                      {/* Status Badges */}
                      {joinActive ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                          LIVE NOW
                        </span>
                      ) : b.status === "completed" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle className="w-3.5 h-3.5" /> Completed
                        </span>
                      ) : b.status === "missed" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          <XCircle className="w-3.5 h-3.5" /> Missed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700/50">
                          Upcoming
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1">
                      <div className="flex items-center gap-2 text-slate-300 text-sm bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span className="font-medium">
                          {b.date || "N/A"}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-slate-300 text-sm bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span className="font-medium">{b.timeSlot || "Time not set"}</span>
                      </div>
                    </div>

                    {b.message && (
                      <div className="flex items-start gap-2 pt-1 text-slate-400 text-xs italic bg-slate-900/30 p-2.5 rounded-xl border border-slate-800/50 max-w-2xl">
                        <MessageSquare className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
                        <p className="line-clamp-2">"{b.message}"</p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center w-full md:w-auto shrink-0 border-t md:border-t-0 border-slate-800 pt-4 md:pt-0">
                    {joinActive ? (
                      <button 
                        onClick={() => handleJoin(b)}
                        className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-200 active:scale-95 cursor-pointer"
                      >
                        <Video className="w-5 h-5 animate-bounce" />
                        Join Call Now
                      </button>
                    ) : (
                      <button 
                        disabled 
                        className="w-full md:w-auto bg-slate-800/80 text-slate-500 px-7 py-3 rounded-xl font-semibold cursor-not-allowed border border-slate-700/50 flex items-center justify-center gap-2 opacity-80"
                      >
                        <Video className="w-4 h-4 text-slate-600" />
                        {b.status === "completed" ? "Session Ended" : b.status === "missed" ? "Session Missed" : "Not Started Yet"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageBookings;