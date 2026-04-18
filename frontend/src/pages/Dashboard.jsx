import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FileCard from "../components/FileCard";

const BASE_URL = "https://qfsnl6ahcd.execute-api.ap-south-1.amazonaws.com/dev";

function Dashboard({ search }) {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  // 🚀 Fetch from backend
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch(`${BASE_URL}/files`);
        const data = await res.json();

        setFiles(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch files ❌");
      }
    };

    fetchFiles();
  }, []);

  // 🔥 UPDATED Share logic (IMPORTANT CHANGE HERE)
  const handleShare = () => {
    if (files.length === 0) {
      toast.error("No files available ❌");
      return;
    }

    const fileNames = files.map((f) => f.fileName || "Unnamed File").join("\n");
    const selectedName = prompt(
      `Enter file name to share:\n\n${fileNames}`
    );

    if (!selectedName) return;

    const file = files.find(
      (f) => (f.fileName || "Unnamed File").toLowerCase() === selectedName.toLowerCase()
    );

    if (!file) {
      toast.error("File not found ❌");
      return;
    }

    // 🔥 CHANGE: use app link instead of S3 link
    const link = `${window.location.origin}/file/${file.id}`;

    navigator.clipboard.writeText(link);

    toast.success(`Link copied for ${file.fileName} 🔗`);
  };

  // Filter files
 const filteredFiles = files.filter((file) =>
  file?.fileName?.toLowerCase().includes(search?.toLowerCase() || "")
);

  // Calculate size (if backend provides size later)
  const totalSize = 0;

  const formatSize = (size) => {
    return size.toFixed(2) + " MB";
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Welcome back 👋</h1>
      <p className="text-gray-500 mb-6">
        Your digital storage is organized and ready.
      </p>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Total Files</p>
          <h2 className="text-2xl font-bold">{files.length}</h2>
        </div>

        <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Shared Files</p>
          <h2 className="text-2xl font-bold">0</h2>
        </div>

        <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-xl shadow">
          <p className="text-gray-500">Storage Used</p>
          <h2 className="text-2xl font-bold">
            {formatSize(totalSize)}
          </h2>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
          Quick Actions
        </h2>

        <div className="flex gap-4">

          {/* Upload */}
          <button
            onClick={() => navigate("/upload")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition shadow"
          >
            Upload
          </button>

          {/* New Folder (temporary frontend only) */}
          <button
            onClick={() => alert("Folder feature coming soon")}
            className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 
                       px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            New Folder
          </button>

          {/* Share File */}
          <button
            onClick={handleShare}
            className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 
                       px-5 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition shadow"
          >
            Share File
          </button>

        </div>
      </div>

      {/* Recent Files */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Recent Files</h2>

        {files.length === 0 ? (
          <p className="text-gray-500">No files uploaded yet</p>
        ) : (
          <div className="space-y-3">
            {filteredFiles.slice(0, 5).map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;