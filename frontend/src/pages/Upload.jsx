import { useState } from "react";
import { UploadCloud } from "lucide-react";
import toast from "react-hot-toast";

const BASE_URL = "https://qfsnl6ahcd.execute-api.ap-south-1.amazonaws.com/dev";

function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file select
  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);

    if (selectedFile.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  // 🚀 REAL UPLOAD LOGIC (S3)
  const handleUpload = async () => {
    if (!file) {
      toast.error("Select a file first ❌");
      return;
    }

    setLoading(true);

    try {
      // STEP 1: Get presigned URL
     const res = await fetch(`${BASE_URL}/upload-url`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    fileName: file.fileName,
    fileType: file.type,
  }),
});

const raw = await res.json();

// 🔥 Handle Lambda body format
const data = typeof raw.body === "string" ? JSON.parse(raw.body) : raw;

const uploadUrl = data.uploadUrl;

// 👉 generate file URL manually
const fileUrl = uploadUrl.split("?")[0];

      // STEP 2: Upload file to S3
      await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      toast.success("File uploaded to S3 🚀");

      // RESET UI
      setFile(null);
      setPreview(null);

    } catch (err) {
      console.error(err);
      toast.error("Upload failed ❌");
    }

    setLoading(false);
  };

  // Drag & Drop
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Upload Files</h1>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="bg-white dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-700 p-8 rounded-2xl shadow max-w-md mx-auto text-center transition hover:border-indigo-500"
      >
        <UploadCloud size={40} className="mx-auto text-indigo-600 mb-4" />

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Drag & drop your file here
        </p>

        <input
          type="file"
          onChange={(e) => handleFile(e.target.files[0])}
          className="mb-4 text-sm"
        />

        {/* Preview */}
        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="preview"
              className="w-32 h-32 object-cover mx-auto rounded-lg shadow"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {file.name}
            </p>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>
      </div>
    </div>
  );
}

export default Upload;