import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import { toast } from "react-toastify";
import 'remixicon/fonts/remixicon.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleRegister, handleGoogleLogin } = useContext(AuthContext);

  const handleOnClick = async (e) => {
    try {
      e.preventDefault();
      let msg = await handleRegister(username, email, password);
      toast("User signed up successfully", { theme: "dark" });
      navigate('/');
    } catch (e) {
      console.log(e?.response?.data?.message);
      toast.error(e?.response?.data?.message || "Signup failed", { theme: "dark" });
    }
  };

  const handleGoogleClick = () => {
    console.log("Clicked");
    handleGoogleLogin();
  };

  return (
    <div className="min-h-screen w-full bg-[#0f172a] text-slate-100 font-gilroy select-none flex items-center justify-center p-4 relative overflow-x-hidden selection:bg-blue-600 selection:text-white">
      
   
      <button 
        onClick={() => navigate("/")} 
        className="absolute top-6 right-6 text-slate-400 hover:text-white text-2xl z-10 p-2 rounded-xl bg-slate-800/50 border border-slate-700/60 hover:bg-slate-800 transition-all cursor-pointer"
        aria-label="Close"
      >
        <i className="ri-close-line"></i>
      </button>

      <div className="bg-slate-800/50 border border-slate-700/70 backdrop-blur-xl rounded-2xl flex flex-col justify-center items-center p-8 w-full max-w-[420px] my-10 shadow-2xl">
      
        <div className="logo flex items-center justify-center mb-4">
          <span className="text-3xl font-black text-white tracking-tight">
            Lex<span className="bg-gradient-to-r from-blue-500 to-[#e7bd3e] bg-clip-text text-transparent">Bridge</span>
          </span>
        </div>

        <div className="flex flex-col gap-1 text-center mb-6">
          <h1 className="text-2xl text-slate-100 font-bold tracking-tight">Join Us</h1>
          <p className="text-sm text-slate-400">Create an account to get started</p>
        </div>

        {/* Social Login */}
        <div className="w-full flex flex-col gap-4">
          <button 
            type="button"
            onClick={handleGoogleClick} 
            className="w-full h-11 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 flex gap-3 items-center justify-center rounded-xl font-medium text-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            <img className="w-4 h-4 object-contain" src="/google.png" alt="google" />
            <span>Sign up with Google</span>
          </button>

          <div className="flex items-center gap-3 my-1">
            <div className="h-[1px] bg-slate-700/60 flex-1"></div>
            <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">or</p>
            <div className="h-[1px] bg-slate-700/60 flex-1"></div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="w-full">
          <form className="w-full" onSubmit={handleOnClick}>
            
            <div className="flex flex-col gap-1.5 mt-3">
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <input
                className="w-full h-11 bg-slate-900/60 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 px-3.5 focus:border-blue-500 focus:outline-none transition-all"
                type="email"
                placeholder="johndoe123@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 mt-4">
              <label className="text-xs font-semibold text-slate-300">Full Name</label>
              <input
                className="w-full h-11 bg-slate-900/60 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 px-3.5 focus:border-blue-500 focus:outline-none transition-all"
                type="text"
                placeholder="John Doe"
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 mt-4">
              <label className="text-xs font-semibold text-slate-300">Create Password</label>
              <input
                className="w-full h-11 bg-slate-900/60 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 px-3.5 focus:border-blue-500 focus:outline-none transition-all"
                type="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button 
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 transition-all rounded-xl text-white text-sm font-semibold mt-6 shadow-md cursor-pointer active:scale-[0.98]"
              >
                Create Account
              </button>

              <p className="text-slate-400 font-normal text-xs text-center mt-6">
                Already have an account?{" "}
                <NavLink to="/signin" className="text-blue-400 font-semibold hover:underline">
                  Login Here
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;