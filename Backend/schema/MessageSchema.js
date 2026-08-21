import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({


    sender : {
       type: mongoose.Schema.Types.ObjectId,
       ref : "User",
       required: true,
    },


    sessionId : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : "Session",
        required: true
    },

    data : String,
    
    createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default messageSchema;