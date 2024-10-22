import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = ({ model, id = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    teacher: "",
    fees: "",
    maxStudents: "",
    assignedClass: "", // Add assignedClass to formData
  });

  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]); // Add state for classes
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/teachers");
        setTeachers(
          Array.isArray(response.data.teachers) ? response.data.teachers : []
        );
      } catch (error) {
        console.error("Error fetching teachers:", error);
        setError("Error fetching teachers. Please try again later.");
      }
    };

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

    const fetchDetails = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `http://localhost:5000/${model}/${id}`
          );
          const data = response.data;
          setFormData({
            name: data.name || "",
            year: data.year || "",
            teacher: data.teacher || "",
            fees: data.fees || "",
            maxStudents: data.maxStudents || "",
            assignedClass: data.assignedClass || "", // Populate assignedClass if available
          });
        } catch (error) {
          console.error("Error fetching details:", error);
          alert("Error fetching details");
        }
      }
    };

    fetchTeachers();
    if (model === "students") {
      fetchClasses(); // Only fetch classes if the model is for students
    }
    fetchDetails();
  }, [model, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await axios.put(`http://localhost:5000/${model}/${id}`, formData);
        alert("Updated successfully!");
      } else {
        await axios.post(`http://localhost:5000/${model}`, formData);
        alert("Added successfully!");
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      alert("Error adding/updating");
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-5">
      <h2 className="text-2xl mb-4">{id ? `Edit ${model}` : `Add ${model}`}</h2>
      <input
        type="text"
        name="name"
        placeholder={`Enter ${model} name`}
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
      {model === "students" && (
        <select
          name="assignedClass"
          value={formData.assignedClass}
          onChange={handleChange}
          className="border px-4 py-2 mb-2"
          required
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.name}
            </option>
          ))}
        </select>
      )}
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
        {id ? "Update" : "Add"} {model}
      </button>
    </form>
  );
};

export default Form;
