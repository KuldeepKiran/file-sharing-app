import { useState } from "react";

function ShareModal({ file, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!file) return null;

  const shareLink = `${window.location.origin}/file/${file.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareLink)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-[400px]">

        <h2 className="text-lg font-semibold mb-4">Share File</h2>

        <input
          value={shareLink}
          readOnly
          className="w-full p-2 border rounded mb-4 text-sm"
        />

        <div className="flex gap-3">

          <button
            onClick={handleCopy}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>

          <button
            onClick={handleWhatsApp}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            WhatsApp
          </button>

        </div>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:text-red-500"
        >
          Close
        </button>

      </div>
    </div>
  );
}

export default ShareModal;