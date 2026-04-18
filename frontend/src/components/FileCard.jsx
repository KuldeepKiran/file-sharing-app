import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Image, Video, Star, Trash2 } from "lucide-react";
import { FileContext } from "../context/FileContext";
import ShareModal from "./ShareModal";

// 🔹 File Icon
const getIcon = (name = "") => {
  if (name.endsWith(".png") || name.endsWith(".jpg") || name.endsWith(".jpeg"))
    return <Image size={20} />;
  if (name.endsWith(".mp4"))
    return <Video size={20} />;
  return <FileText size={20} />;
};

function FileCard({ file }) {
  const [showShare, setShowShare] = useState(false);
  const { toggleFavorite, deleteFile } = useContext(FileContext);
  const navigate = useNavigate();

  console.log("DELETE FILE:", file);

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-xl shadow flex justify-between items-center hover:shadow-lg transition">
      
      {/* Left Section */}
      <div className="flex items-center gap-3">
        
        <div className="text-gray-600 dark:text-gray-300">
          {getIcon(file.fileName)}
        </div>

        <div>
          {/* ✅ CLICKABLE FILE NAME */}
          <p
            onClick={() => navigate(`/file/${file.id}`)}
            className="font-medium cursor-pointer hover:text-indigo-600"
          >
            {file.fileName}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {file.size || "—"}
          </p>
        </div>

      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">

        {/* ⭐ Favorite */}
        <button onClick={() => toggleFavorite?.(file.id)}>
          <Star
            size={18}
            className="cursor-pointer text-gray-400 hover:text-yellow-500"
          />
        </button>

        {/* ⬇ Download */}
        <button
          onClick={() => window.open(file.fileUrl, "_blank")}
          className="text-indigo-600 hover:text-indigo-800"
        >
          ⬇
        </button>

        {/* 🔗 Share */}
        <button onClick={() => setShowShare(true)}>
          🔗
        </button>

        {/* 🗑 Delete with Confirmation */}
        <button
          onClick={() => {
            const confirmDelete = window.confirm(
              `Are you sure you want to delete "${file.fileName}"?`
            );

            if (confirmDelete) {
              deleteFile(file.id, file.fileUrl);
            }
          }}
        >
          <Trash2
            size={18}
            className="text-red-500 hover:text-red-700 dark:hover:text-red-400 cursor-pointer"
          />
        </button>

      </div>

      {/* Share Modal */}
      {showShare && (
        <ShareModal file={file} onClose={() => setShowShare(false)} />
      )}
    </div>
  );
}

export default FileCard;