import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, LogOut, User as UserIcon } from "lucide-react";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  let { user, handleLogout } = useContext(AuthContext);

  let handleOnClick = async () => {
    let res = await handleLogout();
    console.log(res);
    toast(res.data.message, { theme: "dark" });
  };

  return (
    /* Change 1: Updated background from #030712 to #0f172a with transparency & subtle slate border */
    <header className="sticky top-0 z-50 w-full bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-800/80 font-gilroy">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Section (Left Side) */}
        <NavLink className="flex items-center gap-3 group shrink-0" to="/">
          <img
            className="h-10 w-10 md:h-12 md:w-12 object-contain transition-transform duration-300 group-hover:scale-105"
            src="/sellogo.png"
            alt="Logo"
          />
          <span className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Lex<span className="bg-gradient-to-r from-blue-500 to-[#e7bd3e] bg-clip-text text-transparent">Bridge</span>
          </span>
        </NavLink>

        {/* Desktop Links & Auth Options (Shifted to Right) */}
        <div className="hidden md:flex items-center gap-8 ml-auto">
          <nav className="flex items-center gap-8">
            <NavLink
              className={({ isActive }) =>
                `text-sm font-semibold transition-all duration-200 hover:text-[#e7bd3e] ${
                  isActive
                    ? "text-blue-400 font-bold border-b-2 border-blue-500 pb-1"
                    : "text-gray-300"
                }`
              }
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `text-sm font-semibold transition-all duration-200 hover:text-[#e7bd3e] ${
                  isActive
                    ? "text-blue-400 font-bold border-b-2 border-blue-500 pb-1"
                    : "text-gray-300"
                }`
              }
              to="/mentors"
            >
              Mentors
            </NavLink>

            {/* User Role Dynamic Links */}
            {user && user.role === "user" && (
              <NavLink
                className={({ isActive }) =>
                  `text-sm font-semibold transition-all duration-200 hover:text-[#e7bd3e] ${
                    isActive
                      ? "text-blue-400 font-bold border-b-2 border-blue-500 pb-1"
                      : "text-gray-300"
                  }`
                }
                to="/myBookings"
              >
                My Bookings
              </NavLink>
            )}

            {user && user.role === "mentor" && (
              <NavLink
                className={({ isActive }) =>
                  `text-sm font-semibold transition-all duration-200 hover:text-[#e7bd3e] ${
                    isActive
                      ? "text-blue-400 font-bold border-b-2 border-blue-500 pb-1"
                      : "text-gray-300"
                  }`
                }
                to="/manageBookings"
              >
                Manage Bookings
              </NavLink>
            )}

            <NavLink
              className={({ isActive }) =>
                `text-sm font-semibold transition-all duration-200 hover:text-[#e7bd3e] ${
                  isActive
                    ? "text-blue-400 font-bold border-b-2 border-blue-500 pb-1"
                    : "text-gray-300"
                }`
              }
              to="/about"
            >
              About Us
            </NavLink>

            {/* Sign In Link */}
            {!user && (
              <NavLink
                className={({ isActive }) =>
                  `text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? "text-white bg-blue-600/30 border border-blue-500/50"
                      : "text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
                  }`
                }
                to="/signin"
              >
                <UserIcon size={16} className="text-blue-400" />
                Sign In
              </NavLink>
            )}
          </nav>

          {/* User Profile / Logout Action */}
          {user && (
            <button
              onClick={handleOnClick}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 text-gray-300 text-sm font-semibold transition-all cursor-pointer"
            >
              <LogOut size={16} />
              Logout
            </button>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="md:hidden flex items-center ml-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        /* Change 2: Updated Mobile drawer background to match slate-900 theme */
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0f172a]/95 backdrop-blur-2xl border-b border-slate-800/80 flex flex-col p-6 gap-5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <NavLink
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `text-base font-semibold ${isActive ? "text-blue-400" : "text-gray-300"}`
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `text-base font-semibold ${isActive ? "text-blue-400" : "text-gray-300"}`
            }
            to="/mentors"
          >
            Mentors
          </NavLink>

          {user && user.role === "user" && (
            <NavLink
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-base font-semibold ${isActive ? "text-blue-400" : "text-gray-300"}`
              }
              to="/myBookings"
            >
              My Bookings
            </NavLink>
          )}

          {user && user.role === "mentor" && (
            <NavLink
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-base font-semibold ${isActive ? "text-blue-400" : "text-gray-300"}`
              }
              to="/manageBookings"
            >
              Manage Bookings
            </NavLink>
          )}

          <NavLink
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `text-base font-semibold ${isActive ? "text-blue-400" : "text-gray-300"}`
            }
            to="/about"
          >
            About Us
          </NavLink>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            {!user ? (
              <NavLink
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `w-full flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-blue-600/30 border-blue-500 text-white"
                      : "bg-white/5 border-white/10 text-gray-300"
                  }`
                }
                to="/signin"
              >
                <UserIcon size={16} className="text-blue-400" />
                Sign In
              </NavLink>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleOnClick();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-semibold text-sm"
              >
                <LogOut size={16} />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;