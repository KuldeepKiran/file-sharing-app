import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-200 via-blue-200 to-purple-200">
      <h1 className="text-4xl font-bold text-gray-800">
        Smart File Sharing
      </h1>

      <div className="mt-8 animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent"></div>
    </div>
  );
}

export default Splash;