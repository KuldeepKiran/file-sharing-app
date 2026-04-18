import { useEffect, useState } from "react";
import { Download, Trash2, FileText } from "lucide-react";
import { Image, Video, FileArchive } from "lucide-react";

const BASE_URL = "https://qfsnl6ahcd.execute-api.ap-south-1.amazonaws.com/dev";

function Files({ search }) {
  const [files, setFiles] = useState([]);

  // 🚀 Fetch from backend
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch(`${BASE_URL}/files`);
        const data = await res.json();
        setFiles(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFiles();
  }, []);

  // 🔍 Filter files
  const filteredFiles = files.filter((file) =>
    file.fileName.toLowerCase().includes(search.toLowerCase())
  );

  // ⬇ Download (REAL from S3)
  const handleDownload = (file) => {
    if (!file.fileUrl) {
      alert("No file available");
      return;
    }

    window.open(file.fileUrl, "_blank"); // ✅ direct S3 link
  };

  // 🗑 Delete (TEMP for now)
  const handleDelete = (id) => {
    alert("Delete API not connected yet");
  };

  // 📄 Icons
  const getFileIcon = (name) => {
    if (name.endsWith(".png") || name.endsWith(".jpg"))
      return <Image className="text-gray-500 dark:text-gray-300" />;
    if (name.endsWith(".mp4"))
      return <Video className="text-gray-500 dark:text-gray-300" />;
    if (name.endsWith(".zip"))
      return <FileArchive className="text-gray-500 dark:text-gray-300" />;
    return <FileText className="text-gray-500 dark:text-gray-300" />;
  };

  return (
    <div className="text-gray-900 dark:text-white">
      
      <h1 className="text-2xl font-bold mb-6">My Files</h1>

      {filteredFiles.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
          📂 No files found
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow overflow-hidden">

          {/* Header */}
          <div className="grid grid-cols-4 px-6 py-3 text-sm font-semibold 
                          bg-gray-100 dark:bg-gray-800 
                          text-gray-600 dark:text-gray-300">
            <span>File Name</span>
            <span>Size</span>
            <span>Date</span>
            <span className="text-right">Actions</span>
          </div>

          {/* Files */}
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              className="grid grid-cols-4 items-center px-6 py-4 border-t 
                         border-gray-200 dark:border-gray-700 
                         hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              
              {/* File Name */}
              <div className="flex items-center gap-3">
                {getFileIcon(file.fileName)}
                <span className="text-gray-800 dark:text-gray-200">
                  {file.fileName}
                </span>
              </div>

              {/* Size */}
              <span className="text-gray-500 dark:text-gray-400">
                {file.size || "—"}
              </span>

              {/* Date */}
              <span className="text-gray-500 dark:text-gray-400">
                {file.date
                  ? new Date(file.date).toLocaleDateString()
                  : "—"}
              </span>

              {/* Actions */}
              <div className="flex justify-end gap-3">

                <button
                  onClick={() => handleDownload(file)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <Download size={18} />
                </button>

                <button
                  onClick={() => handleDelete(file.id)}
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

export default Files;