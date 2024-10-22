const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true }, // Student's ID
  name: { type: String, required: true }, // Student's name
  dob: { type: Date, required: true }, // Student's date of birth
  contactDetails: {
    phone: { type: String, required: true }, // Student's contact phone number
    email: { type: String, required: true }, // Student's email address
  },
  assignedClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  }, // Reference to the class the student is assigned to
});

// Create and export the Student model
module.exports = mongoose.model("Student", studentSchema);
