
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
    if(plan == 'video') newSession.meetingLink = `https://lexbridge-btw3.vercel.app/video/${newSession._id}`;
    if(plan == 'chat') newSession.meetingLink = `https://lexbridge-btw3.vercel.app/chat/${newSession._id}`;
    await newSession.save();
     console.log(newSession);
     res.json({message : "Booking confirmed"});
    }catch(e){
        console.log(e);
       res.json({message : "Something went wrong"});
    }
}

export const myBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const now = new Date();

    const bookings = await Session.find({
      $or: [{ userId }, { mentorId: userId }],
    });

    for (let b of bookings) {
      if (b.status === "completed" || b.status === "cancelled" || b.status === "missed" || b.status === "mentor_absent" || b.status === "student_absent") {
        continue;
      }

      const scheduledTime = new Date(`${b.date} ${b.timeSlot}`);
      const timeDiff = (now - scheduledTime) / (1000 * 60); // minutes
      if (timeDiff > 60) {
        
        if (b.isMentorJoined && b.isUserJoined) {
          b.status = "completed";
        } else if (b.isMentorJoined && !b.isUserJoined) {
          b.status = "student_absent";
        } else if (!b.isMentorJoined && b.isUserJoined) {
          b.status = "mentor_absent";
        } else {
          b.status = "missed"; 
        }

        await b.save();
      }
    }

    res.status(200).json({ success: true, myBookings: bookings });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//69a7b1ecc9adfa210501ff04