import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// Layout Components
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

// Pages
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Files from "./pages/Files";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import Trash from "./pages/Trash";
import FileView from "./pages/FileView";

function App() {
  const [search, setSearch] = useState("");

  const isLoggedIn = localStorage.getItem("token");

  return (
    <Routes>
       

       <Route
  path="/dashboard"
  element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
/>
      {/* 🌟 Splash */}
      <Route path="/" element={<Splash />} />

      {/* 🔓 Public Route */}
      <Route
        path="/login"
        element={
          isLoggedIn ? <Navigate to="/dashboard" /> : <Login />
        }
      />

      {/* 🔒 Private Layout */}
      <Route
        path="/*"
        element={
          isLoggedIn ? (
            <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white">

              {/* Sidebar */}
              <Sidebar />

              {/* Main Area */}
              <div className="flex-1 flex flex-col">

                {/* Topbar */}
                <Topbar search={search} setSearch={setSearch} />

                {/* Pages */}
                <div className="p-6">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard search={search} />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/files" element={<Files search={search} />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/trash" element={<Trash />} />
                    <Route path="/file/:id" element={<FileView />} />
                    {/* Default */}
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </div>

              </div>
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

    </Routes>
  );
}

export default App;