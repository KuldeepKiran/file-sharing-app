import { useState } from "react";
import { UploadCloud } from "lucide-react";
import toast from "react-hot-toast";

function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);

    if (selectedFile.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("files")) || [];

    const newFile = {
      name: file.name,
      size: file.size,
      date: new Date(),
    };

    localStorage.setItem("files", JSON.stringify([newFile, ...existing]));

    toast.success("File uploaded successfully 🚀");

    setFile(null);
    setPreview(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      
      {/* Upload Card */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="bg-white dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-700 p-8 rounded-2xl shadow-lg text-center transition hover:border-indigo-500"
      >
        <UploadCloud className="mx-auto text-indigo-600 mb-4" size={40} />

        <h2 className="text-lg font-semibold mb-2">
          Drag & Drop your file
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          or click to browse from your device
        </p>

        <input
          type="file"
          onChange={(e) => handleFile(e.target.files[0])}
          className="mb-4"
        />

        {/* Preview */}
        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="preview"
              className="w-32 h-32 object-cover mx-auto rounded-lg shadow"
            />
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
              {file.name}
            </p>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
        >
          Upload File
        </button>
      </div>
    </div>
  );
}

export default Upload;