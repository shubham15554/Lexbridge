import React, { useState, useContext } from 'react';
import { MessageSquare, Video, Star, Clock, X, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/authContext';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-slate-800/90 border border-slate-700/80 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10 animate-in fade-in zoom-in duration-200 backdrop-blur-xl">
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 rounded-xl p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all z-20 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
};


const Button = ({ children, onClick, type = "button", variant = "default", className = "", ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:scale-[0.98]";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-600/20",
    outline: "border border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-white",
    gradient: "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-600/20",
  };
  return (
    <button type={type} onClick={onClick} className={`${baseStyles} ${variants[variant]} px-4 py-2.5 ${className}`} {...props}>
      {children}
    </button>
  );
};

const Input = ({ label, id, className = "", ...props }) => (
  <div className="space-y-1.5">
    {label && <label htmlFor={id} className="text-xs font-semibold text-slate-300">{label}</label>}
    <input 
      id={id} 
      className={`flex h-11 w-full rounded-xl border border-slate-700/80 bg-slate-900/60 px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-all ${className}`} 
      {...props} 
    />
  </div>
);

const Textarea = ({ label, id, className = "", ...props }) => (
  <div className="space-y-1.5">
    {label && <label htmlFor={id} className="text-xs font-semibold text-slate-300">{label}</label>}
    <textarea 
      id={id} 
      className={`flex min-h-[80px] w-full rounded-xl border border-slate-700/80 bg-slate-900/60 px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-all resize-none ${className}`} 
      {...props} 
    />
  </div>
);



const SimpleCalendar = ({ selected, onSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(<div key={`empty-${i}`} className="p-2" />);
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const isSelected = selected && date.toDateString() === selected.toDateString();
    const isPast = date < new Date().setHours(0, 0, 0, 0);
    days.push(
      <button 
        key={day} 
        type="button" 
        onClick={() => !isPast && onSelect(date)} 
        disabled={isPast}
        className={`p-2 text-xs font-semibold rounded-lg transition-all ${
          isSelected 
            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold' 
            : isPast 
              ? 'text-slate-600 cursor-not-allowed' 
              : 'hover:bg-slate-800 text-slate-300 cursor-pointer'
        }`}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="border border-slate-700/80 rounded-xl p-4 bg-slate-900/60">
      <div className="flex items-center justify-between mb-4">
        <button 
          type="button" 
          onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))} 
          className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5"/>
        </button>
        <div className="font-semibold text-xs text-slate-200">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</div>
        <button 
          type="button" 
          onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))} 
          className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5"/>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="text-[10px] font-bold text-slate-500 uppercase">{d}</div>
        ))}
        {days}
      </div>
    </div>
  );
};



const BookingModal = ({ isOpen, onClose, mentor, selectedPlan }) => {
  const { user } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    timeSlot: '',
  });

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.timeSlot) {
      toast.error("Please select a time slot", { theme: "dark" });
      return;
    }

    const submissionData = {
      ...formData,
      date: selectedDate.toLocaleDateString("en-CA"), 
      mentorName: mentor.username,
      mentorId: mentor._id,
      planType: selectedPlan,
      userId: user._id
    };

    try {
      let res = await axios.post('https://lexbridge-m1oz.onrender.com/session/booking', submissionData, { withCredentials: true });
      toast.success(res.data.message || "Booking Confirmed!", { theme: "dark" });
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Booking failed. Please try again.", { theme: "dark" });
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const planDetails = {
    chat: { icon: MessageSquare, title: 'Chat Session', price: mentor?.chatPrice, description: 'Text-based mentorship session' },
    video: { icon: Video, title: 'Video Call', price: mentor?.videoPrice, description: 'Face-to-face video mentorship' },
  };

  const currentPlan = planDetails[selectedPlan] || planDetails.chat;
  const PlanIcon = currentPlan.icon;

  const isTimeInPast = (slot) => {
    const now = new Date();
    const today = new Date();
    if (selectedDate.toDateString() !== today.toDateString()) {
      return false;
    }
    const [time, modifier] = slot.split(' ');
    let [hours, minutes] = time.split(':');
    
    if (hours === '12') {
      hours = modifier === 'PM' ? '12' : '00';
    } else if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    const slotDate = new Date(selectedDate);
    slotDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    return slotDate < now;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 bg-slate-800/90 text-slate-100">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30">
              <PlanIcon className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-100">Book {currentPlan.title}</h2>
          </div>
          <p className="text-xs text-slate-400">Schedule with {mentor?.username || mentor?.name}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-blue-500/40 flex justify-between items-center">
            <div>
              <div className="text-sm font-semibold text-slate-100">{currentPlan.title}</div>
              <div className="text-xs text-slate-400">{currentPlan.description}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name *" name="name" value={formData.name} onChange={handleInputChange} required />
            <Input label="Email *" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
          </div>
          <Input label="Phone Number *" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <CalendarIcon className="w-3.5 h-3.5 text-blue-400" /> Choose Date
              </label>
              <SimpleCalendar selected={selectedDate} onSelect={setSelectedDate} />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-400" /> Choose Time Slot
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-[260px] overflow-y-auto p-2.5 border border-slate-700/80 rounded-xl bg-slate-900/60">
                {timeSlots.map((slot) => {
                  const past = isTimeInPast(slot);
                  const isSelected = formData.timeSlot === slot;
                  return (
                    <button 
                      key={slot} 
                      type="button" 
                      disabled={past} 
                      onClick={() => !past && setFormData({ ...formData, timeSlot: slot })}
                      className={`p-2 text-xs font-medium rounded-lg border transition-all ${
                        isSelected 
                          ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/20' 
                          : past 
                            ? 'bg-slate-900/40 border-slate-800 text-slate-600 cursor-not-allowed' 
                            : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800 cursor-pointer'
                      }`}
                    >
                      {slot} 
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <Textarea label="Message (Optional)" name="message" value={formData.message} onChange={handleInputChange} />

          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
            <Button type="submit" variant="gradient" className="flex-1">Confirm Booking</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default BookingModal;