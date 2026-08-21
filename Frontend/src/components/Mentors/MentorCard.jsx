import React, { useState, useContext } from 'react';
import { MessageSquare, Video, Star, Clock, X, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/authContext';
import BookingModal from './BookingModel';

import { useNavigate } from 'react-router-dom';

const Avatar = ({ src, alt, fallback, className = "" }) => (
  <div className={`relative flex shrink-0 overflow-hidden rounded-full ${className}`}>
    {src ? (
      <img src={src} alt={alt} className="aspect-square h-full w-full object-cover" />
    ) : (
      <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-600 text-white text-xl font-semibold">
        {fallback}
      </div>
    )}
  </div>
);

const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${className}`}>
    {children}
  </span>
);

export const MentorCard = ({ mentor }) => {
  let navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlanSelect = (plan) => {
    if (!user) {
      navigate('/signin', { state: { from: location.pathname } });
      return;
    }
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="group relative w-full max-w-sm overflow-hidden rounded-2xl bg-slate-800/50 border border-slate-700/70 backdrop-blur-xl shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="relative p-6">
          <div className="flex items-start gap-4 mb-5">
            <Avatar 
              src={mentor.image} 
              alt={mentor.username} 
              fallback={mentor.username ? mentor.username.split(' ').map(n => n[0]).join('') : 'M'} 
              className="h-16 w-16 border-2 border-slate-700/80 shadow-md" 
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-slate-100 truncate">{mentor.username}</h3>
              <Badge className="mb-2 bg-blue-600/20 border border-blue-500/30 text-blue-400">
                {mentor.specialization}
              </Badge>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{mentor.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>{mentor.experience}+ yrs</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-5 pb-5 border-b border-slate-700/60 text-center">
            <div>
              <div className="text-xl font-bold text-slate-100">{mentor.sessions}</div>
              <div className="text-[11px] text-slate-400">Sessions</div>
            </div>
            <div className="w-px h-10 bg-slate-700/60" />
            <div>
              <div className="text-xl font-bold text-slate-100">{mentor.students}</div>
              <div className="text-[11px] text-slate-400">Students</div>
            </div>
            <div className="w-px h-10 bg-slate-700/60" />
            <div>
              <div className="text-xl font-bold text-slate-100">{mentor.responseTime}</div>
              <div className="text-[11px] text-slate-400">Response</div>
            </div>
          </div>

          <div className="space-y-2.5">
            <button 
              type="button"
              onClick={() => handlePlanSelect('chat')} 
              className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-700/80 bg-slate-900/60 hover:bg-slate-900 hover:border-blue-500/60 transition-all cursor-pointer group/btn"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-blue-400 transition-transform group-hover/btn:scale-110" /> 
                <span className="text-sm text-slate-200 font-medium">Book a chat session</span>
              </div>
            </button>

            <button 
              type="button"
              onClick={() => handlePlanSelect('video')} 
              className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-700/80 bg-slate-900/60 hover:bg-slate-900 hover:border-blue-500/60 transition-all cursor-pointer group/btn"
            >
              <div className="flex items-center gap-3">
                <Video className="w-4 h-4 text-blue-400 transition-transform group-hover/btn:scale-110" /> 
                <span className="text-sm text-slate-200 font-medium">Book a video call session</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        mentor={mentor} 
        selectedPlan={selectedPlan} 
      />
    </>
  );
};

export default MentorCard;