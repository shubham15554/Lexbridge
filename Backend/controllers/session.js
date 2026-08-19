
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
    if(plan == 'video') newSession.meetingLink = `https://lexbridge-btw3.vercel.app/video/${code}`;
    if(plan == 'chat') newSession.meetingLink = `https://lexbridge-btw3.vercel.app/chat/${code}`;
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

    res.status(200).json({ success: true, myBookings: bookings });
    
   
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

//69a7b1ecc9adfa210501ff04
export const markJoined = async (req, res) => {
  try {
    const currentUserId = req.user._id
    const { sessionID } = req.params;              
   
    const sess = await Session.findById(sessionID);

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