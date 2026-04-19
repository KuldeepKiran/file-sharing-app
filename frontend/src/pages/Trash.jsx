import { useEffect, useState } from "react";
import { FileText, Image, Video, FileArchive, RotateCcw, Trash2 } from "lucide-react";

const BASE_URL = "https://qfsnl6ahcd.execute-api.ap-south-1.amazonaws.com/dev";

// 📄 File Icon
const getIcon = (name = "") => {
  if (name.endsWith(".png") || name.endsWith(".jpg") || name.endsWith(".jpeg"))
    return <Image className="text-gray-500 dark:text-gray-300" />;
  if (name.endsWith(".mp4"))
    return <Video className="text-gray-500 dark:text-gray-300" />;
  if (name.endsWith(".zip"))
    return <FileArchive className="text-gray-500 dark:text-gray-300" />;
  return <FileText className="text-gray-500 dark:text-gray-300" />;
};

function Trash() {
  const [files, setFiles] = useState([]);

  // 🚀 Fetch from backend (auto refresh)
  useEffect(() => {
  const fetchFiles = async () => {
    try {
      const res = await fetch(`${BASE_URL}/files`);
      const data = await res.json();

      // ✅ FIX: filter from API response, not state
      const deletedFiles = data.filter((file) => file.isDeleted === true);

      setFiles(deletedFiles);
    } catch (err) {
      console.error(err);
    }
  };

  fetchFiles();

  const interval = setInterval(fetchFiles, 2000);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="text-gray-900 dark:text-white">

      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        🗑️ Trash
      </h2>

      {files.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          Trash is empty.
        </p>
      ) : (
        <div className="space-y-4">

          {files.map((file) => (
            <div
              key={file.id}
              className="bg-gray-100 dark:bg-gray-800 
                         p-4 rounded-xl shadow 
                         flex justify-between items-center 
                         hover:shadow-lg transition"
            >

              {/* Left */}
              <div className="flex items-center gap-3">
                {getIcon(file.fileName)}

                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {file.fileName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {file.size || "—"}
                  </p>
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-4">

                {/* Restore */}
                <button
                  onClick={() => alert("Restore API coming soon")}
                  className="text-green-500 hover:text-green-700"
                >
                  <RotateCcw size={18} />
                </button>

                {/* Permanent Delete */}
                <button
                  onClick={() => alert("Permanent delete API coming soon")}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Trash;