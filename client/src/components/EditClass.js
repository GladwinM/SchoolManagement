import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditClass = () => {
  const { id } = useParams(); // Get class ID from the URL
  const navigate = useNavigate(); // To navigate after successful update

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
  const [loading, setLoading] = useState(true); // Loading state to ensure data is fetched before rendering

  useEffect(() => {
    // Fetch the class details to pre-fill the form
    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/class/${id}`);
        const classData = response.data;
        setFormData({
          name: classData.name,
          year: classData.year,
          teacher: classData.teacher.teacherId, // Use teacherId for dropdown selection
          fees: classData.fees,
          maxStudents: classData.maxStudents,
        });
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching class details:", error);
        alert("Error fetching class details");
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    // Fetch the list of teachers for the dropdown
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/teachers");
        // Ensure teachers is an array
        setTeachers(
          Array.isArray(response.data.teachers) ? response.data.teachers : []
        );
      } catch (error) {
        console.error("Error fetching teachers:", error);
        alert("Error fetching teachers");
      }
    };

    fetchClassDetails();
    fetchTeachers();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const value =
      e.target.name === "year" ||
      e.target.name === "fees" ||
      e.target.name === "maxStudents"
        ? Number(e.target.value)
        : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/class/${id}`, formData);
      alert("Class updated successfully!");
      navigate("/classes"); // Navigate back to the classes list
    } catch (error) {
      console.error("Error updating class:", error);
      alert("Error updating class");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <form onSubmit={handleSubmit} className="p-5">
      <h2 className="text-2xl mb-4">Edit Class</h2>
      <input
        type="text"
        name="name"
        placeholder="Enter class name"
        value={formData.name}
        onChange={handleChange}
        className="border px-4 py-2 mb-2"
        required
      />
      <input
        type="number"
        name="year"
        placeholder="Enter year"
        value={formData.year}
        onChange={handleChange}
        className="border px-4 py-2 mb-2"
        required
      />
      <select
        name="teacher"
        value={formData.teacher}
        onChange={handleChange}
        className="border px-4 py-2 mb-2"
        required
      >
        <option value="">Select Teacher</option>
        {teachers.map((teacher) => (
          <option key={teacher.teacherId} value={teacher.teacherId}>
            {teacher.name} (ID: {teacher.teacherId})
          </option>
        ))}
      </select>
      <input
        type="number"
        name="fees"
        placeholder="Enter fees"
        value={formData.fees}
        onChange={handleChange}
        className="border px-4 py-2 mb-2"
        required
      />
      <input
        type="number"
        name="maxStudents"
        placeholder="Enter max number of students"
        value={formData.maxStudents}
        onChange={handleChange}
        className="border px-4 py-2 mb-2"
        required
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Update Class
      </button>
    </form>
  );
};

export default EditClass;
