import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewClasses = () => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/classes");
        setClasses(
          Array.isArray(response.data.classes) ? response.data.classes : []
        );
      } catch (error) {
        console.error("Error fetching classes:", error);
        setError("Error fetching classes. Please try again later.");
      }
    };

    fetchClasses();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      try {
        console.log("Deleting class with ID:", id); // Debug log
        await axios.delete(`http://localhost:5000/class/${id}`);
        setClasses((prevClasses) =>
          prevClasses.filter((cls) => cls._id !== id)
        );
        alert("Class deleted successfully!");
      } catch (error) {
        console.error(
          "Error deleting class:",
          error.response?.data || error.message
        );
        alert("Error deleting class. Please try again later.");
      }
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!classes.length) {
    return <p>No classes available.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 to-blue-400 flex items-center justify-center pt-20 pb-20 px-4">
      <div className="bg-white/80 backdrop-blur-md border border-indigo-200 rounded-lg p-8 shadow-2xl max-w-4xl w-full ">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center relative group">
          Classes
          <span className="block h-1 bg-indigo-500 mt-2 mx-auto w-1/4"></span>
        </h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Class Name</th>
              <th className="py-2">Year</th>
              <th className="py-2">Fees</th>
              <th className="py-2">Teacher</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr
                key={cls._id}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="border px-4 py-2">{cls.name}</td>
                <td className="border px-4 py-2">{cls.year}</td>
                <td className="border px-4 py-2">{cls.fees}</td>
                <td className="border px-4 py-2">
                  {cls.teacher
                    ? `${cls.teacher.name} (ID: ${cls.teacher.teacherId})`
                    : "N/A"}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => navigate(`/edit-class/${cls._id}`)}
                    className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded-md hover:bg-yellow-600 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cls._id)}
                    className="bg-red-500 text-white px-2 py-1 mr-2 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/class-analytics")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewClasses;
