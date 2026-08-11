import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Auth initial check loading
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserOnRefresh = async () => {
      try {
        const res = await axios.get("https://lexbridge-m1oz.onrender.com/user/profile", { withCredentials: true });
        if (res.data.user) {
          setUser(res.data.user);
        }
      } catch (err) {
        console.log("No active session found");
        setUser(null);
      } finally {
        setLoading(false); 
      }
    };
    checkUserOnRefresh();
  }, []);

  const handleRegister = async (username, email, password) => {
    try { 
      let res = await axios.post("https://lexbridge-m1oz.onrender.com/user/signup", { username, email, password }, { withCredentials: true });
      if (res.data.user) {
        setUser(res.data.user);
        return res.data.message;
      }
    } catch (error) {
      throw error;
    }
  };

  const handleLogin = async (userEmail, userPassword, userRole) => {
    try { 
      let res = await axios.post("https://lexbridge-m1oz.onrender.com/user/login", { email: userEmail, password: userPassword, role: userRole }, { withCredentials: true });
      if (res.data.user) {
        setUser(res.data.user);
        return res.data.message;
      }
    } catch (error) {
      throw error;
    }
  };

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
      const code = authresult.code;
      const res = await axios.post(
        "https://lexbridge-m1oz.onrender.com/user/googleAuth",
        { code: code },
        { withCredentials: true }
      );
      
      if (res.data.success) {
        setUser(res.data.user);
        toast.success("Welcome to LexBridge!", { theme: "dark" });
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Google Authentication Failed", { theme: "dark" });
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: googleResponse,
    onError: googleResponse,
    flow: 'auth-code'
  });

  // Context value me loading state ko include kiya gaya hai
  const value = {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
    handleGoogleLogin
  };

  // Direct children render karo, pure app par spinner mat lagao!
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};