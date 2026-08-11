import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mentorName: {
    type: String,
    required: true,
  },

  planType: {
    type: String,
    enum: ["chat", "video"],
    required: true,
  },

  message: {
    type: String,
  },

  date: {
    type: String, // "YYYY-MM-DD"
    required: true,
  },
  timeSlot: {
    type: String, // "10:00 AM"
    required: true,
  },

  roomId: {
    type: String,
    unique: true,
    sparse: true,
  },
  meetingLink: {
    type: String,
    default: "https://meet.google.com",
  },

  // Both User & Mentor Tracking Flags
  isUserJoined: {
    type: Boolean,
    default: false,
  },
  isMentorJoined: {
    type: Boolean,
    default: false,
  },
  userJoinedAt: {
    type: Date,
    default: null,
  },
  mentorJoinedAt: {
    type: Date,
    default: null,
  },

  // Final Dynamic Status
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled", "missed", "mentor_absent"],
    default: "confirmed",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default sessionSchema;