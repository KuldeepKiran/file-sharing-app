import { Bell, Search, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Topbar({ search, setSearch }) {
  const navigate = useNavigate();

  const [dark, setDark] = useState(false);

  // 🔥 Apply dark class to HTML
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  // 🔥 Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDark(true);
    }
  }, []);

  return (
    <div className="w-full h-16 bg-white dark:bg-gray-900 border-b flex items-center justify-between px-6">
      
      {/* 🔍 Search */}
      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg w-1/3">
        <Search size={16} className="text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search files..."
          className="bg-transparent outline-none w-full text-sm text-black dark:text-white"
        />
      </div>

      {/* 🔔 Right Section */}
      <div className="flex items-center gap-4">

        {/* 🌙 Dark Mode Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="text-gray-600 dark:text-white hover:scale-110 transition"
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notification */}
        <Bell className="text-gray-600 dark:text-white cursor-pointer" />

        {/* Profile Click */}
        <div
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded-lg"
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="user"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium text-black dark:text-white">
            User
          </span>
        </div>

      </div>
    </div>
  );
}

export default Topbar;