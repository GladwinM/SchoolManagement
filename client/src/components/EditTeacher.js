import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditTeacher = () => {
  const { id } = useParams(); // Get teacher ID from the URL
  const navigate = useNavigate(); // To navigate after successful update

  // State to hold form data
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

  const [loading, setLoading] = useState(true); // Loading state to ensure data is fetched before rendering

  // Fetch teacher details when component mounts
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        // Make sure the URL matches the backend route
        const response = await axios.get(`http://localhost:5000/teacher/${id}`);
        const teacherData = response.data;

        setFormData({
          teacherId: teacherData.teacherId,
          name: teacherData.name,
          gender: teacherData.gender,
          dob: teacherData.dob.split("T")[0], // Format the date
          contactDetails: {
            phone: teacherData.contactDetails.phone,
            email: teacherData.contactDetails.email,
          },
          salary: teacherData.salary,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching teacher:", error);
        alert("Error fetching teacher details");
      }
    };

    fetchTeacher();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    if (e.target.name.includes("contactDetails.")) {
      const key = e.target.name.split(".")[1]; // Get the field name (phone/email)
      setFormData({
        ...formData,
        contactDetails: {
          ...formData.contactDetails,
          [key]: e.target.value, // Update phone or email based on input
        },
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/teacher/${id}`, formData);
      alert("Teacher updated successfully!");
      navigate("/teachers"); // Navigate back to the teachers list
    } catch (error) {
      console.error("Error updating teacher:", error);
      alert("Error updating teacher");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <form onSubmit={handleSubmit} className="p-5">
      <h2 className="text-2xl mb-4">Edit Teacher</h2>
      <input
        type="text"
        name="teacherId"
        placeholder="Enter teacher ID"
        value={formData.teacherId}
        onChange={handleChange}
        className="border px-4 py-2 mb-2"
        readOnly
      />
      <input
        type="text"
        name="name"
        placeholder="Enter teacher's name"
        value={formData.name}
        onChange={handleChange}
        className="border px-4 py-2 mb-2"
        required
      />
      <input
        type="text"
        name="gender"
        placeholder="Enter gender"
        value={formData.gender}
        onChange={handleChange}
        className="border px-4 py-2 mb-2"
        required
      />
      <input
        type="date"
        name="dob"
        placeholder="Enter date of birth"
        value={formData.dob}
        onChange={handleChange}
        className="border px-4 py-2 mb-2"
        required
      />
      <input
        type="text"
        name="contactDetails.phone"
        placeholder="Enter phone number"
        value={formData.contactDetails.phone}
        onChange={handleChange}
        className="border px-4 py-2 mb-2"
        required
      />
      <input
        type="email"
        name="contactDetails.email"
        placeholder="Enter email"
        value={formData.contactDetails.email}
        onChange={handleChange}
        className="border px-4 py-2 mb-2"
        required
      />
      <input
        type="number"
        name="salary"
        placeholder="Enter salary"
        value={formData.salary}
        onChange={handleChange}
        className="border px-4 py-2 mb-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Update Teacher
      </button>
    </form>
  );
};

export default EditTeacher;
