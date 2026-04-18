import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function FileView() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://qfsnl6ahcd.execute-api.ap-south-1.amazonaws.com/dev/file?id=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFile(data);
        setLoading(false);
      })
      .catch(() => {
        setFile(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!file || file.message) {
    return (
      <p className="text-center mt-10 text-red-500">
        File not found ❌
      </p>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white dark:bg-gray-900 p-6 rounded-xl shadow text-center">

  <h1 className="text-xl font-bold mb-4">{file.fileName}</h1>

  <p className="text-gray-500 mb-4">
    Uploaded: {new Date(file.date).toLocaleDateString()}
  </p>

  {/* 🔥 IMAGE PREVIEW */}
  {file.fileUrl?.match(/\.(jpg|png|jpeg)$/i) && (
    <img
      src={file.fileUrl}
      alt="preview"
      className="mx-auto mb-4 rounded-lg shadow max-h-80"
    />
  )}

  {/* 🔥 PDF PREVIEW */}
  {file.fileUrl?.match(/\.pdf$/i) && (
    <iframe
      src={file.fileUrl}
      title="PDF Preview"
      className="w-full h-96 mb-4 rounded-lg"
    />
  )}

  {/* 🔥 ACTION BUTTONS */}
  <div className="flex justify-center gap-4">

    {/* View */}
    <a
      href={file.fileUrl}
      target="_blank"
      rel="noreferrer"
      className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700"
    >
      View
    </a>

    {/* Download */}
    <a
      href={file.fileUrl}
      download
      className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
    >
      Download
    </a>

  </div>

</div>
  );
}

export default FileView;