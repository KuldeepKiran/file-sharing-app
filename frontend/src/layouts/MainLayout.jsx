import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function MainLayout() {
  // 🔍 search state (global for layout)
  const [search, setSearch] = useState("");

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <Topbar search={search} setSearch={setSearch} />

        {/* Page Content */}
        <div className="p-6">
          <Outlet context={{ search }} />
        </div>

      </div>
    </div>
  );
}

export default MainLayout;