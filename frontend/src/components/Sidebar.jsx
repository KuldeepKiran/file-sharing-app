import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Folder,
  Upload,
  User,
  Star,
  Trash2,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "My Files", path: "/files", icon: <Folder size={18} /> },
    { name: "Upload", path: "/upload", icon: <Upload size={18} /> },
    { name: "Favorites", path: "/favorites", icon: <Star size={18} /> },
    { name: "Trash", path: "/trash", icon: <Trash2 size={18} /> },
    { name: "Profile", path: "/profile", icon: <User size={18} /> },
  ];

  // ✅ FIXED (only one function)
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-900 text-black dark:text-white border-r dark:border-gray-800 p-5 flex flex-col justify-between">
      
      {/* Top Section */}
      <div>
        {/* Logo */}
        <h2 className="text-xl font-bold text-indigo-600 mb-8">
          Smart File Sharing
        </h2>

        {/* Menu */}
        <nav className="flex flex-col gap-2">
          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-medium"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-4">

        {/* Storage Card */}
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Storage Usage
          </p>

          <div className="w-full bg-gray-300 dark:bg-gray-700 h-2 rounded mt-2">
            <div className="bg-indigo-600 h-2 rounded w-[60%]"></div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            6 GB of 10 GB used
          </p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
        >
          <LogOut size={18} />
          Logout
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-400 dark:text-gray-500">
          © 2026 Smart File App
        </p>
      </div>
    </div>
  );
}

export default Sidebar;