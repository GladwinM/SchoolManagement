import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditStudent = () => {
  const { id } = useParams(); // Get student ID from the URL
  const navigate = useNavigate(); // To navigate after successful update

  // Initial state for form data
  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    dob: "",
    contactDetails: {
      phone: "",
      email: "",
    },
    assignedClass: "",
  });

  // Initial state for available classes
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to ensure data is fetched before rendering

  useEffect(() => {
    const fetchStudentAndClasses = async () => {
      try {
        // Fetch the student details based on the ID
        const studentResponse = await axios.get(
          `http://localhost:5000/student/${id}`
        );
        const studentData = studentResponse.data;

        // Fetch available classes to populate the dropdown
        const classResponse = await axios.get("http://localhost:5000/classes");
        const classesData = Array.isArray(classResponse.data.classes)
          ? classResponse.data.classes
          : []; // Ensure classes is an array

        setClasses(classesData);

        // Format the date to YYYY-MM-DD format
        const formattedDob = new Date(studentData.dob)
          .toISOString()
          .split("T")[0];

        // Set form data with fetched student details
        setFormData({
          studentId: studentData.studentId,
          name: studentData.name,
          dob: formattedDob, // Use the formatted date
          contactDetails: {
            phone: studentData.contactDetails.phone,
            email: studentData.contactDetails.email,
          },
          assignedClass: studentData.assignedClass,
        });
        setLoading(false); // Mark as done loading
      } catch (error) {
        console.error("Error fetching student or classes:", error);
        setLoading(false); // Set loading state to false if there's an error
      }
    };

    fetchStudentAndClasses(); // Fetch data when the component mounts
  }, [id]);

  // Handle form field changes
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/student/${id}`, formData);
      alert("Student updated successfully!");
      navigate("/students"); // Navigate back to the students list
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Error updating student");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <form onSubmit={handleSubmit} className="p-5">
      <h2 className="text-2xl mb-4">Edit Student</h2>
      <input
        type="text"
        name="studentId"
        placeholder="Enter student ID"
        value={formData.studentId} // Pre-fill student ID
        onChange={handleChange}
        className="border px-4 py-2 mb-2"
        required
      />
      <input
        type="text"
        name="name"
        placeholder="Enter student's name"
        value={formData.name} // Pre-fill student name
        onChange={handleChange}
        className="border px-4 py-2 mb-2"
        required
      />
      <input
        type="date"
        name="dob"
        placeholder="Enter date of birth"
        value={formData.dob} // Pre-fill date of birth
        onChange={handleChange}
        className="border px-4 py-2 mb-2"
        required
      />
      <input
        type="text"
        name="contactDetails.phone"
        placeholder="Enter phone number"
        value={formData.contactDetails.phone} // Pre-fill phone number
        onChange={handleChange}
        className="border px-4 py-2 mb-2"
        required
      />
      <input
        type="email"
        name="contactDetails.email"
        placeholder="Enter email"
        value={formData.contactDetails.email} // Pre-fill email
        onChange={handleChange}
        className="border px-4 py-2 mb-2"
        required
      />
      <select
        name="assignedClass"
        value={formData.assignedClass} // Pre-fill assigned class
        onChange={handleChange}
        className="border px-4 py-2 mb-2"
        required
      >
        <option value="">Select Class</option>
        {classes.map((cls) => (
          <option key={cls._id} value={cls._id}>
            {cls.name} (Year: {cls.year})
          </option>
        ))}
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Update Student
      </button>
    </form>
  );
};

export default EditStudent;
