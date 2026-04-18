import { useEffect, useState } from "react";
import { FileText, Image, Video, FileArchive, Star } from "lucide-react";

const BASE_URL = "https://qfsnl6ahcd.execute-api.ap-south-1.amazonaws.com/dev";

// 📄 Icon logic
const getIcon = (name) => {
  if (name.endsWith(".png") || name.endsWith(".jpg"))
    return <Image className="text-gray-500 dark:text-gray-300" />;
  if (name.endsWith(".mp4"))
    return <Video className="text-gray-500 dark:text-gray-300" />;
  if (name.endsWith(".zip"))
    return <FileArchive className="text-gray-500 dark:text-gray-300" />;
  return <FileText className="text-gray-500 dark:text-gray-300" />;
};

function Favorites() {
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

  // ⚠️ TEMP: No favorite field in backend yet
  const favoriteFiles = files.filter((file) => file.favorite);

  return (
    <div className="text-gray-900 dark:text-white">

      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Star className="text-yellow-400" /> Favorites
      </h2>

      {favoriteFiles.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No favorite files yet.
        </p>
      ) : (
        <div className="space-y-4">

          {favoriteFiles.map((file) => (
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

              {/* Right */}
              <Star className="text-yellow-400 fill-yellow-400" />

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Favorites;