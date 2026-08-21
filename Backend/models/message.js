import mongoose from "mongoose";
import messageSchema from "../schema/MessageSchema.js";

const Message = mongoose.model("Message", messageSchema);

export default Message;