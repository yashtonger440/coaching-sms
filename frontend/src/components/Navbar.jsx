import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLink =
    "text-gray-700 hover:text-blue-600 transition font-medium";

  const activeLink =
    "text-blue-600 font-semibold";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-700">
        Coaching Logo
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeLink : navLink
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? activeLink : navLink
            }
          >
            About
          </NavLink>

          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive ? activeLink : navLink
            }
          >
            Courses
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? activeLink : navLink
            }
          >
            Contact
          </NavLink>

          {/* SMS Button */}
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow"
          >
            SMS Login
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="flex flex-col px-6 py-4 gap-4">

            <NavLink to="/" onClick={()=>setOpen(false)} className={navLink}>Home</NavLink>
            <NavLink to="/about" onClick={()=>setOpen(false)} className={navLink}>About</NavLink>
            <NavLink to="/courses" onClick={()=>setOpen(false)} className={navLink}>Courses</NavLink>
            <NavLink to="/contact" onClick={()=>setOpen(false)} className={navLink}>Contact</NavLink>

            <Link
              to="/dashboard"
              onClick={()=>setOpen(false)}
              className="bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
            >
              SMS Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
