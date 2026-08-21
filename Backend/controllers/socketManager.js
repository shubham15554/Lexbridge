import { Server } from "socket.io";
import Session from "../models/session.js";
import { configDotenv } from "dotenv";
import Message from "../models/message.js";
import { datacatalog } from "googleapis/build/src/apis/datacatalog/index.js";
export const connectToSocket = (server)=>{

    const io = new Server(server , {
        cors: {
            origin: ['http://localhost:5173' , 'https://lexbridge-btw3.vercel.app'],
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });


    io.on("connection" , (socket)=>{
      console.log("Something Connected");

      socket.on('join-call' , async (path , user , sessionID)=>{
        try{
            
            console.log("a person joined as: " , user.role);
            console.log("sesion id" , sessionID);
            socket.join(path);
            socket.to(path).emit("user-joined", socket.id);
       
            const currentUserId = user._id
            const sess = await Session.findById(sessionID);

            if (!sess) {
               socket.emit('error-message', "Session not found");
               return;
            }
            
            if (currentUserId === sess.userId?.toString()) {
               sess.isUserJoined = true;
               sess.userJoinedAt = new Date();
            } else if (currentUserId === sess.mentorId?.toString()) {
                sess.isMentorJoined = true;
                sess.mentorJoinedAt = new Date();
            } else {
                socket.emit('error-message', "You are not participant of this session");
                return;
            }   
            await sess.save();
        }
        catch(err){
            console.log(err);
           console.log("something went wrong");
        }
    
      });

        
        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        });



        socket.on('leave-call', (path) => {
            socket.to(path).emit('user-left', socket.id);
           
        });

        socket.on('join-chat', async (path , user , sessionID) => {


           try{
                socket.join(path);
                socket.to(path).emit('user-joind-chat', socket.id);

                const currentUserId = user._id
                const sess = await Session.findById(sessionID);

            if (!sess) {
               socket.emit('error-message', "Session not found");
               return;
            }
            
            if (currentUserId === sess.userId?.toString()) {
               sess.isUserJoined = true;
               sess.userJoinedAt = new Date();
            } else if (currentUserId === sess.mentorId?.toString()) {
                sess.isMentorJoined = true;
                sess.mentorJoinedAt = new Date();
            } else {
                socket.emit('error-message', "You are not participant of this session");
                return;
            }   
            await sess.save();

            }
            catch(err){
                console.log(err);
            }





        });

        socket.on('send-message' , async (message, path)=>{

          try{
            let {sessionId , sender , data} = message
            console.log("Message received on server:", message);
            const newMessage = await Message.create({
                sessionId: sessionId,
                sender: sender,
                data : data
            });
            socket.to(path).emit("receive-message", newMessage);
          }

          catch(err){
            console.log(err);
          }
        });



        


        socket.on('disconnect', () => {
            console.log("User disconnected and rooms cleaned up automatically.");
        });

        socket.on('disconnecting', () => {
            socket.rooms.forEach(room => {
                if (room !== socket.id) { 
                    socket.to(room).emit('user-left', socket.id);
                }
            });
        });


    })



    return io;

}