import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AddTeacher = () => {
  const navigate = useNavigate(); // Initialize navigate

  const [formData, setFormData] = useState({
    teacherId: "",
    name: "",
    gender: "",
    dob: "",
    contactDetails: {
      phone: "",
      email: "",
    },
    salary: "",
  });

  const handleChange = (e) => {
    if (e.target.name.includes("contactDetails.")) {
      const key = e.target.name.split(".")[1];
      setFormData({
        ...formData,
        contactDetails: {
          ...formData.contactDetails,
          [key]: e.target.value,
        },
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/teacher", formData);
      alert("Teacher added successfully!");
      setFormData({
        teacherId: "",
        name: "",
        gender: "",
        dob: "",
        contactDetails: {
          phone: "",
          email: "",
        },
        salary: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding teacher");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 to-blue-400 flex items-center justify-center pt-20 pb-20">
      <div className="bg-white/80 backdrop-blur-md border border-indigo-200 rounded-lg p-8 shadow-2xl max-w-md w-full transition-transform duration-300 transform hover:scale-105">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center relative group">
          Add Teacher
          <span className="block h-1 bg-indigo-500 mt-2 mx-auto w-1/4"></span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Teacher ID:</label>
            <input
              type="text"
              name="teacherId"
              placeholder="Enter Teacher ID"
              value={formData.teacherId}
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
              placeholder="Enter teacher's name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Gender:</label>
            <input
              type="text"
              name="gender"
              placeholder="Enter gender"
              value={formData.gender}
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
            <label className="block mb-2 text-gray-700">Phone:</label>
            <input
              type="text"
              name="contactDetails.phone"
              placeholder="Enter phone number"
              value={formData.contactDetails.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Email:</label>
            <input
              type="email"
              name="contactDetails.email"
              placeholder="Enter email"
              value={formData.contactDetails.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-700">Salary:</label>
            <input
              type="number"
              name="salary"
              placeholder="Enter salary"
              value={formData.salary}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50"
          >
            Add Teacher
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

export default AddTeacher;
