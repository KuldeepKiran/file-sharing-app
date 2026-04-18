import { useContext } from "react";
import { FileText, Image, Video, Star, Trash2 } from "lucide-react";
import { FileContext } from "../context/FileContext";

// 🔹 File Icon
const getIcon = (name) => {
  if (name.endsWith(".png") || name.endsWith(".jpg"))
    return <Image size={20} />;
  if (name.endsWith(".mp4"))
    return <Video size={20} />;
  return <FileText size={20} />;
};

function FileCard({ file }) {
const {toggleFavorite, deleteFile } = useContext(FileContext);

console.log("DELETE FILE:", file);
  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-xl shadow flex justify-between items-center hover:shadow-lg transition">
      
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <div className="text-gray-600 dark:text-gray-300">
          {getIcon(file.fileName)}
        </div>

        <div>
          <p className="font-medium">{file.fileName}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {file.size || "—"}
          </p>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">

        {/* ⭐ Favorite (UI only for now) */}
        <button onClick={() => alert("Favorite API coming soon")}>
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

        {/* 🗑 Delete (API later) */}
        <button onClick={() => deleteFile(file.id, file.fileUrl)}>
  <Trash2
    size={18}
    className="text-red-500 hover:text-red-700 dark:hover:text-red-400 cursor-pointer"
  />
</button>

      </div>
    </div>
  );
}

export default FileCard;