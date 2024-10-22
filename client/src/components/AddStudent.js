import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    dob: "",
    phone: "",
    email: "",
    gender: "",
    assignedClass: "",
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentData = {
      studentId: formData.studentId,
      name: formData.name,
      dob: formData.dob,
      gender: formData.gender,
      contactDetails: {
        phone: formData.phone,
        email: formData.email,
      },
      assignedClass: formData.assignedClass,
    };

    try {
      await axios.post("http://localhost:5000/student", studentData);
      alert("Student added successfully!");
      setFormData({
        studentId: "",
        name: "",
        dob: "",
        phone: "",
        email: "",
        gender: "",
        assignedClass: "",
      });
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Error adding student");
    }
  };

  const navigate = useNavigate(); // Initialize navigate

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 to-blue-400 flex items-center justify-center pt-20 pb-20">
      <div className="bg-white/80 backdrop-blur-md border border-indigo-200 rounded-lg p-8 shadow-2xl max-w-md w-full transition-transform duration-300 transform hover:scale-105">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center relative group">
          Add Student
          <span className="block h-1 bg-indigo-500 mt-2 mx-auto w-1/4"></span>
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Form fields remain unchanged */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Student ID:</label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Assigned Class:</label>
            <select
              name="assignedClass"
              value={formData.assignedClass}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              required
            >
              <option value="">Select a class</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50"
          >
            Add Student
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

export default AddStudent;
