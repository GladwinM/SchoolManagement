const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Class = require("./models/Class");
const Teacher = require("./models/Teacher");
const Student = require("./models/Student");
const { ObjectId } = mongoose.Types;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/schoolcrm", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample route to check if the server is running
app.get("/", (req, res) => {
  res.send("Server is running");
});

// CRUD operations for Class
app.post("/class", async (req, res) => {
  const { name, year, teacher, fees, maxStudents } = req.body;

  console.log("Request Body:", req.body); // Log the request body for debugging

  try {
    // Validate that all required fields, including maxStudents, are present
    if (!name || !year || !teacher || !fees || maxStudents === undefined) {
      return res
        .status(400)
        .json({ error: "All fields are required, including maxStudents" });
    }

    // Find the teacher by the custom teacher ID (e.g., TCH-009)
    const teacherRecord = await Teacher.findOne({ teacherId: teacher });
    if (!teacherRecord) {
      return res.status(400).json({ error: "Teacher not found" });
    }

    // Create the class with the teacher's ObjectId
    const newClass = new Class({
      name,
      year,
      teacher: teacherRecord._id, // Use the ObjectId of the teacher
      fees,
      maxStudents,
    });

    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    console.error("Error while adding class:", error.message);
    res.status(400).json({ error: error.message });
  }
});


app.get("/classes", async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Get page and limit from query parameters

  try {
    // Fetch the classes with pagination and populate the teacher details
    const classes = await Class.find()
      .populate("teacher", "name teacherId") // Populate the teacher details directly
      .skip((page - 1) * limit)
      .limit(Number(limit));

    // Get the total number of classes for pagination calculation
    const total = await Class.countDocuments();

    // Return the paginated classes along with the total count
    res.json({ classes, total });
  } catch (error) {
    console.error("Error fetching classes:", error.message);
    res.status(500).json({ error: error.message });
  }
});


app.get("/class/:id", async (req, res) => {
  try {
    const cls = await Class.findById(req.params.id).populate("teacher");
    if (!cls) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.json(cls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/class/:id", async (req, res) => {
  try {
    const { name, year, teacher, fees, maxStudents } = req.body;

    // Fetch the class to validate against the current number of students
    const classData = await Class.findById(req.params.id).populate("students");
    if (!classData) {
      return res.status(404).json({ error: "Class not found" });
    }

    // Ensure the new maxStudents value is not less than the current number of enrolled students
    if (maxStudents < classData.students.length) {
      return res.status(400).json({
        error: `Max students cannot be less than the current number of students (${classData.students.length}) enrolled`,
      });
    }

    // Update the class with new values, including maxStudents
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      { name, year, teacher, fees, maxStudents },
      { new: true, runValidators: true }
    );

    res.json(updatedClass);
  } catch (error) {
    console.error("Error updating class:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// Get class details for analytics
app.get("/class/:id/analytics", async (req, res) => {
  try {
    const classDetails = await Class.findById(req.params.id).populate(
      "students"
    );
    if (!classDetails) {
      return res.status(404).json({ error: "Class not found" });
    }

    const maleCount = classDetails.students.filter(
      (student) => student.gender.toLowerCase() === "male"
    ).length;
    const femaleCount = classDetails.students.filter(
      (student) => student.gender.toLowerCase() === "female"
    ).length;

    res.json({
      classDetails,
      genderDistribution: { male: maleCount, female: femaleCount },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CRUD operations for Teacher
app.post("/teacher", async (req, res) => {
  try {
    const { teacherId, name, gender, dob, contactDetails, salary } = req.body;

    // Validate that all required fields are present
    if (!teacherId || !name || !gender || !dob || !contactDetails || !salary) {
      return res
        .status(400)
        .json({
          error:
            "All fields are required: teacherId, name, gender, dob, contactDetails, and salary.",
        });
    }

    // Validate that contactDetails contains phone and email
    if (!contactDetails.phone || !contactDetails.email) {
      return res
        .status(400)
        .json({ error: "Contact details must include both phone and email." });
    }

    const newTeacher = new Teacher({
      teacherId,
      name,
      gender,
      dob,
      contactDetails,
      salary,
    });

    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    console.error("Error adding teacher:", error.message);
    res.status(400).json({ error: error.message });
  }
});

app.delete("/class/:id", async (req, res) => {
  try {
    console.log("Deleting class with ID:", req.params.id);
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ error: "Class not found" });
    }
    res.json({ message: "Class deleted successfully" });
  } catch (error) {
    console.error("Error deleting class:", error.message);
    res.status(500).json({ error: error.message });
  }
});


app.get("/teachers", async (req, res) => {
  const {
    page = 1,
    limit = 10,
    name = "",
    sort = "name",
    order = "asc",
  } = req.query;
  const sortOrder = order === "asc" ? 1 : -1; // Set sorting order

  try {
    const teachers = await Teacher.find({
      name: { $regex: name, $options: "i" },
    })
      .sort({ [sort]: sortOrder })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Teacher.countDocuments({
      name: { $regex: name, $options: "i" },
    });
    res.json({ teachers, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/teacher/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ teacherId: req.params.id });
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/teacher/:id", async (req, res) => {
  try {
    const { name, gender, dob, contactDetails, salary } = req.body;
    const updatedTeacher = await Teacher.findOneAndUpdate(
      { teacherId: req.params.id.trim() },
      { name, gender, dob, contactDetails, salary },
      { new: true, runValidators: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.json(updatedTeacher);
  } catch (error) {
    console.error("Error updating teacher:", error.message);
    res.status(400).json({ error: error.message });
  }
});

app.delete("/teacher/:id", async (req, res) => {
  try {
    await Teacher.findOneAndDelete({ teacherId: req.params.id.trim() });
    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CRUD operations for Student

app.post("/student", async (req, res) => {
  console.log("Request Body:", req.body);
  try {
    const { studentId, name, gender, dob, contactDetails, assignedClass } =
      req.body;

    // Validate that all required fields are present
    if (
      !studentId ||
      !name ||
      !gender ||
      !dob ||
      !contactDetails ||
      !assignedClass
    ) {
      return res.status(400).json({
        error:
          "All fields are required: studentId, name, gender, dob, contactDetails, and assignedClass.",
      });
    }

    // Validate that contactDetails contains phone and email
    if (!contactDetails.phone || !contactDetails.email) {
      return res.status(400).json({
        error: "Contact details must include both phone and email.",
      });
    }

    // Fetch the class using the assignedClass directly; Mongoose will convert it to ObjectId automatically
    const classData = await Class.findById(assignedClass).populate("students");
    if (!classData) {
      return res.status(400).json({ error: "Assigned class not found." });
    }

    // Check if the class has reached its maximum number of students
    if (classData.students.length >= classData.maxStudents) {
      return res
        .status(400)
        .json({ error: "Class has reached the maximum number of students" });
    }

    // Create and save the new student
    const newStudent = new Student({
      studentId,
      name,
      gender,
      dob,
      contactDetails,
      assignedClass, // Save as string; Mongoose will handle the conversion
    });

    await newStudent.save();

    // Add the student to the class and save the class
    classData.students.push(newStudent._id);
    await classData.save();

    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Error adding student:", error.message);
    res.status(400).json({ error: error.message });
  }
});




app.get("/students", async (req, res) => {
  const {
    page = 1,
    limit = 10,
    name = "",
    sort = "name",
    order = "asc",
  } = req.query;
  const sortOrder = order === "asc" ? 1 : -1; // Set sorting order

  try {
    // Fetch students with pagination and populate the assigned class's name
    const students = await Student.find({
      name: { $regex: name, $options: "i" },
    })
      .populate("assignedClass", "name") // Populate the assigned class's name
      .sort({ [sort]: sortOrder })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Student.countDocuments({
      name: { $regex: name, $options: "i" },
    });

    res.json({ students, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get("/student/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/student/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/student/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//route for financial-analytics
app.get("/financial-analytics", async (req, res) => {
  const { view, year, month } = req.query;
  // Fetch and calculate data based on the view (yearly or monthly)
  // For example, calculate total salaries and fees
  try {
    const teachers = await Teacher.find();
    const students = await Student.find();

    const expenses = teachers.reduce((sum, teacher) => sum + teacher.salary, 0);
    const income = students.reduce((sum, student) => sum + student.feesPaid, 0);

    res.json({ income, expenses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/classes/analytics", async (req, res) => {
  try {
    const classes = await Class.find().populate("teacher", "name");
    const students = await Student.find();

    const analytics = classes.map((cls) => {
      const studentsInClass = students.filter(
        (student) => student.assignedClass.toString() === cls._id.toString()
      );
      return {
        className: cls.name,
        teacher: cls.teacher ? cls.teacher.name : "N/A",
        numberOfStudents: studentsInClass.length,
        totalFees: cls.fees * studentsInClass.length,
      };
    });

    res.json(analytics);
  } catch (error) {
    console.error("Error fetching class analytics:", error.message);
    res.status(500).json({ error: error.message });
  }
});


// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
