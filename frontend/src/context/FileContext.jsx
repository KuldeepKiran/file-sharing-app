import { createContext, useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState(() => {
  const stored = localStorage.getItem("files");
  return stored ? JSON.parse(stored) : [];
});

  useEffect(() => {
    localStorage.setItem("files", JSON.stringify(files));
  }, [files]);

  // ✅ Add File (NEW)
  const addFile = (file) => {
  const newFile = {
    id: Date.now(),
    name: file.name,
    size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
    favorite: false,
    deleted: false,
    // ❌ remove url (temporary)
  };

  setFiles((prev) => [newFile, ...prev]);
};

const addFolder = (name) => {
  const newFolder = {
    id: Date.now(),
    name,
    size: "—",
    type: "folder",
    favorite: false,
    deleted: false,
  };

  setFiles((prev) => [newFolder, ...prev]);
};


  // ⭐ Toggle Favorite
  const toggleFavorite = (id) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === id
          ? { ...file, favorite: !file.favorite }
          : file
      )
    );
  };

  // 🗑️ Move to Trash

const deleteFile = async (id) => {
  try {
    const res = await fetch(
      "https://qfsnl6ahcd.execute-api.ap-south-1.amazonaws.com/dev/delete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: String(id) }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Delete failed ❌");
      return;
    }

    // 🔥 IMPORTANT: remove from UI immediately
    setFiles((prev) => prev.filter((file) => file.id !== id));

    toast.success("Moved to Trash 🗑️");

  } catch (err) {
    console.error(err);
    toast.error("Delete failed ❌");
  }
};
  // ♻️ Restore from Trash (BONUS 🔥)
  const restoreFile = (id) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === id
          ? { ...file, deleted: false }
          : file
      )
    );
  };

  return (
    <FileContext.Provider
      value={{
        files,
        addFile,
        setFiles,
        addFolder,
            
        toggleFavorite,
        deleteFile,
        restoreFile,    // ✅ bonus
      }}
    >
      {children}
    </FileContext.Provider>
  );
};