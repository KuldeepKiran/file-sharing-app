import { LogOut, User, Mail, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-full px-6 text-gray-900 dark:text-white">

      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/100"
            alt="user"
            className="w-20 h-20 rounded-full border"
          />

          <div>
            <h2 className="text-xl font-semibold">Kuldeep</h2>
            <p className="text-gray-500 dark:text-gray-400">
              kuldeep@email.com
            </p>
            <p className="text-sm text-indigo-600 mt-1">
              Pro Member
            </p>
          </div>
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition">
          Edit Profile
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Account Info */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow space-y-4">
          <h2 className="text-lg font-semibold">Account Info</h2>

          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <User size={18} />
            <span>Full Name: Kuldeep</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <Mail size={18} />
            <span>Email: kuldeep@email.com</span>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow space-y-4">
          <h2 className="text-lg font-semibold">Security</h2>

          <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <Shield size={18} />
            <span>Password: ********</span>
          </div>

          <button className="text-indigo-600 text-sm hover:underline">
            Change Password
          </button>
        </div>

        {/* Subscription */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow col-span-2">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Pro Member</h2>
              <p className="text-sm opacity-90">
                Your next billing cycle is coming soon.
              </p>
            </div>

            <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium">
              Manage Plan
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl shadow col-span-2">
          <h2 className="text-lg font-semibold text-red-600 mb-2">
            Danger Zone
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Deleting your account will remove all your files permanently.
          </p>

          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
            Delete Account
          </button>
        </div>

      </div>

      {/* Logout */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-500 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </div>
  );
}

export default Profile;