const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  teacherId: { type: String, required: true, unique: true }, // Ensure teacherId is defined
  name: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  contactDetails: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  salary: { type: Number, required: true },
});

module.exports = mongoose.model("Teacher", teacherSchema);
