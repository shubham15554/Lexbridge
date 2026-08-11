import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/authContext";
import 'remixicon/fonts/remixicon.css';

const SignIn = () => {
  const navigate = useNavigate();
  let { handleLogin, handleGoogleLogin } = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [role, setRole] = useState("user"); 

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      await handleLogin(userEmail, userPassword, role); 
      toast.success(`${role === 'mentor' ? 'Mentor' : 'User'} logged in successfully`, { theme: "dark" });
      navigate('/');
    } catch (e) {
      toast.error(e.response?.data?.msg || "Login failed", { theme: "dark" });
    }
  };

  const handleGoogleClick = () => {
    console.log("Clicked");
    handleGoogleLogin();
  };

  return (
    <div className="main min-h-screen w-full bg-[#0f172a] text-slate-100 font-gilroy select-none flex items-center justify-center p-4 relative overflow-x-hidden selection:bg-blue-600 selection:text-white">
      
      {/* Close Button */}
      <button 
        onClick={() => navigate("/")} 
        className="absolute top-6 right-6 text-slate-400 hover:text-white text-2xl z-10 p-2 rounded-xl bg-slate-800/50 border border-slate-700/60 hover:bg-slate-800 transition-all cursor-pointer"
        aria-label="Close"
      >
        <i className="ri-close-line"></i>
      </button>

      {/* Main Container Card */}
      <div className="bg-slate-800/50 border border-slate-700/70 backdrop-blur-xl rounded-2xl flex flex-col justify-center items-center p-8 w-full max-w-[420px] my-10 shadow-2xl transition-all duration-300">
        
        {/* Logo Section */}
        <div className="logo flex items-center justify-center mb-4">
          <span className="text-3xl font-black text-white tracking-tight">
            Lex<span className="bg-gradient-to-r from-blue-500 to-[#AE8623] bg-clip-text text-transparent">Bridge</span>
          </span>
        </div>

        <div className="flex flex-col gap-1 text-center mb-6">
          <h1 className="text-2xl text-slate-100 font-bold tracking-tight">Welcome Back</h1>
          <p className="text-sm text-slate-400">Login to manage your account</p>
        </div>

        {/* Social Login */}
        <div className="w-full flex flex-col gap-4">
          <button 
            type="button"
            onClick={handleGoogleClick} 
            className="w-full h-11 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 flex gap-3 items-center justify-center rounded-xl font-medium text-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            <img className="w-4 h-4 object-contain" src="/google.png" alt="google" />
            <span className="font-normal text-sm">Sign in with Google</span>
          </button>

          <div className="flex items-center gap-3 my-1">
            <div className="h-[1px] bg-slate-700/60 flex-1"></div>
            <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">or</p>
            <div className="h-[1px] bg-slate-700/60 flex-1"></div>
          </div>
        </div>

        {/* Role Toggle Switcher */}
        <div className="flex w-full bg-slate-900/80 p-1 rounded-xl mb-5 border border-slate-700/80">
          <button 
            type="button"
            onClick={() => setRole("user")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center ${
              role === "user" 
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <i className="ri-user-line mr-2 text-sm"></i>User
          </button>
          <button 
            type="button"
            onClick={() => setRole("mentor")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center ${
              role === "mentor" 
                ? "bg-[#AE8623] text-white shadow-md shadow-[#AE8623]/20" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <i className="ri-shield-user-line mr-2 text-sm"></i>Mentor
          </button>
        </div>

        {/* Form Inputs */}
        <div className="text-slate-100 w-full">
          <form onSubmit={submitHandler} className="w-full">
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <input
                onChange={(dets) => setUserEmail(dets.target.value)}
                className={`w-full h-11 bg-slate-900/60 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 px-3.5 focus:outline-none transition-all ${
                  role === 'mentor' ? 'focus:border-[#AE8623]' : 'focus:border-blue-500'
                }`}
                type="email"
                placeholder="johndoe123@gmail.com"
                value={userEmail}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 w-full mt-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <span className="text-xs font-semibold text-blue-400 cursor-pointer hover:underline">Forgot?</span>
              </div>
              <input
                onChange={(dets) => setUserPassword(dets.target.value)}
                className={`w-full h-11 bg-slate-900/60 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 px-3.5 focus:outline-none transition-all ${
                  role === 'mentor' ? 'focus:border-[#AE8623]' : 'focus:border-blue-500'
                }`}
                type="password"
                placeholder="Enter password"
                value={userPassword}
                required
              />

              <button 
                type="submit"
                className={`w-full py-3 rounded-xl text-white text-sm font-semibold mt-6 cursor-pointer active:scale-[0.98] shadow-md transition-all ${
                  role === 'user' 
                    ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/10' 
                    : 'bg-[#AE8623] hover:bg-[#8e6d1c] shadow-[#AE8623]/10'
                }`}
              >
                Login as {role === 'user' ? 'User' : 'Mentor'}
              </button>

              <p className="text-slate-400 font-normal text-xs text-center mt-6">
                Don't have an account?{" "}
                <NavLink to="/signup" className="text-blue-400 font-semibold hover:underline">
                  Create New
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;