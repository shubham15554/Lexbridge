import { Children } from "react";

import { useContext } from "react";


import { useState, useEffect, createContext } from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import {useGoogleLogin} from '@react-oauth/google';
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext({});


export const AuthProvider = ({children})=>{
            
    let [user , setUser] = useState(null);
    let [loading, setLoading] = useState(true);

    let navigate = useNavigate();
    useEffect(() => {
        
        const checkUserOnRefresh = async () => {
        try {
            
            const res = await axios.get("https://lexbridge-m1oz.onrender.com/user/profile", { withCredentials: true });
            if (res.data.user) {
            setUser(res.data.user);
            }
        } catch (err) {
            console.log(err);
            console.log("No active session found" , err);
            setUser(null);
        } finally {
            setLoading(false); 
        }
        };
        checkUserOnRefresh();

    }, []);

    const handleRegister = async (username , email , password)=>{
        try{ 
            
            let res = await axios.post("https://lexbridge-m1oz.onrender.com/user/signup"  , {username , email , password},  { withCredentials: true });
            
            if(res.data.user){
                setUser(res.data.user);
                return res.data.message;
            }
        }
        catch(error)
        {
         throw error;
        }
    }


    const handleLogin = async (userEmail , userPassword , userRole)=>{

        try{ 
            
            let res = await axios.post("https://lexbridge-m1oz.onrender.com/user/login"  , { email: userEmail , password : userPassword , role : userRole},  { withCredentials: true });
            if(res.data.user){
                setUser(res.data.user);
                return res.data.message;
            }
        }
        catch(error)
        {
         throw error;
        }
    }


    const handleLogout = async () => {
        try {
            const response = await axios.post("https://lexbridge-m1oz.onrender.com/user/logout", {}, { withCredentials: true });
            
            if (response.status === 200) {
            setUser(null); 
            return response;
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    };


      const googleResponse = async (authresult) => {
      try {
        setLoading(true);
        const code = authresult.code;

        const res = await axios.post(
          "https://lexbridge-m1oz.onrender.com/user/googleAuth",
          {
            code: code,
          },
          { withCredentials: true }
        );
        
        if(res.data.success){
          setUser(res.data.user);
          toast.success("Welcome to Wanderlust!");
          navigate("/");
          
        }
      } catch (err) {
        console.log(err);
      } finally{
        setLoading(false);
      }
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: googleResponse,
        onError: googleResponse,
        flow: 'auth-code'
    })



     
    let data = {handleRegister ,handleLogin, handleLogout, handleGoogleLogin, user};
      
     if (loading) {
        return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/80 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        );
      }

      return (
        <AuthContext.Provider value={data}>
           {children}
        </AuthContext.Provider>
       )



}