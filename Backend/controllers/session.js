
import Session from "../models/session.js";
import User from "../models/user.js";
import { createSecretToken } from "../utils/createToken.js";
import bcrypt from "bcrypt";
import  { uuid } from 'uuidv4';

export const booking = async (req , res) => {
    
    try{
     
     let formData = req.body;
     let plan = formData.planType;
     console.log(formData);
     let newSession = new Session(formData);
     let code = uuid();
    if(plan == 'video') newSession.meetingLink = `https://project-v1-338y.vercel.app/vedio/${code}`;
    if(plan == 'chat') newSession.meetingLink = `https://project-v1-338y.vercel.app/chat/${code}`;
    await newSession.save();
     console.log(newSession);
     res.json({message : "Booking confirmed"});
    }catch(e){
        console.log(e);
       res.json({message : "Something went wrong"});
    }
}

export const getSlotEndTime = (dateStr, timeSlot, durationInMinutes = 60) => {
  if (!dateStr || !timeSlot) return null;

  try {
    const [year, month, day] = dateStr.split("-").map(Number);

    const [time, modifier] = timeSlot.trim().split(" ");
    let [hours, minutes] = time.split(":").map(Number);

  
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const startTime = new Date(year, month - 1, day, hours, minutes, 0, 0);

    const endTime = new Date(startTime.getTime() + durationInMinutes * 60 * 1000);

    return endTime;
  } catch (error) {
    console.error("Error calculating slot end time:", error);
    return null;
  }
};
export const myBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const now = new Date();

    const bookings = await Session.find({
      $or: [{ userId }, { mentorId: userId }],
    });

    for (let b of bookings) {
      
      const slotEndTime = getSlotEndTime(b.date, b.timeSlot);

      if (now > slotEndTime) {
        
        if (b.isUserJoined && b.isMentorJoined) {
          b.status = "completed";
        } else if (!b.isUserJoined && !b.isMentorJoined) {
          b.status = "missed";
        } else {
          
          b.status = b.isUserJoined ? "mentor_absent" : "missed";
        }
        
        await b.save(); 
      }
    }
    const updatedBookings = await Session.find({
      $or: [{ userId }, { mentorId: userId }]
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, myBookings: updatedBookings });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export const manageBookings = async (req , res) => {

    try{
        const mentorId = req.user._id;
        let bookings = await Session.find({ mentorId: mentorId });
        res.status(200).json({
            success: true,
            count: bookings.length,
            bookings
        });
        
    }
    catch(err){
        console.log(err);
        res.json({message : "something went wrong"});
    }
}


export const markJoined = async (req, res) => {
  try {
    const currentUserId = req.user._id
    const { sessionId } = req.params;              

   console.log("Req is coming");
    const sess = await Session.findById(sessionId);

    if (!sess) {
      return res.status(404).json({ message: "Session nahi mila" });
    }

    if (currentUserId === sess.userId) {
      sess.isUserJoined = true;
      sess.userJoinedAt = new Date();
    } else if (currentUserId === sess.mentorId) {
      sess.isMentorJoined = true;
      sess.mentorJoinedAt = new Date();
    } else {
      return res.status(403).json({ message: "Aap is session ke participant nahi hain" });
    }

   
    await sess.save();

    return res.status(200).json({ 
      message: "Marked as joined successfully", 
      sess 
    });

  } catch (err) {
    console.error("Error in markJoined:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};