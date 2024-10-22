import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddClass = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    teacher: "",
    fees: "",
    maxStudents: "",
  });

  // State to hold the list of teachers
  const [teachers, setTeachers] = useState([]);

  // Fetch teachers for the dropdown
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/teachers");
        setTeachers(response.data.teachers || []);
      } catch (error) {
        console.error("Error fetching teachers:", error);
        alert("Error fetching teachers. Please try again later.");
      }
    };

    fetchTeachers();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/class", formData);
      alert("Class added successfully!");
      setFormData({
        name: "",
        year: "",
        teacher: "",
        fees: "",
        maxStudents: "",
      });
    } catch (error) {
      console.error("Error adding class:", error);
      alert("Error adding class");
    }
  };

  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 flex items-center justify-center py-12">
      <div className="max-w-lg w-full bg-white/80 backdrop-blur-md border border-indigo-200 rounded-lg p-8 shadow-2xl transition-transform duration-300 transform hover:scale-105">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center relative group">
          Add New Class
          <span className="block h-1 bg-indigo-500 mt-2 mx-auto w-1/4"></span>
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Form fields here... */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Class Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 transform hover:shadow-lg hover:border-indigo-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Year:
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 transform hover:shadow-lg hover:border-indigo-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Teacher:
            </label>
            <select
              name="teacher"
              value={formData.teacher}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 transform hover:shadow-lg hover:border-indigo-400"
              required
            >
              <option value="">Select a teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.teacherId} value={teacher.teacherId}>
                  {teacher.name} (ID: {teacher.teacherId})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Fees:
            </label>
            <input
              type="number"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 transform hover:shadow-lg hover:border-indigo-400"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Max Students:
            </label>
            <input
              type="number"
              name="maxStudents"
              value={formData.maxStudents}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 transform hover:shadow-lg hover:border-indigo-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50"
          >
            Add Class
          </button>
        </form>
        <div className="mt-4">
          <button
            onClick={() => navigate("/")}
            className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
