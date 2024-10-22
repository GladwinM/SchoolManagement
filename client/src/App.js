import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Form from "./components/Form"; // Keep this if you need it for other models
import Table from "./components/Table";
import AddTeacher from "./components/AddTeacher";
import AddStudent from "./components/AddStudent";
import AddClass from "./components/AddClass";
import EditStudent from "./components/EditStudent";
import ViewClasses from "./components/ViewClasses";
import EditClass from "./components/EditClass";
import EditTeacher from "./components/EditTeacher";
import ClassAnalytics from "./components/ClassAnalytics";
import FinancialAnalytics from "./components/FinancialAnalytics";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-class" element={<AddClass />} />
        <Route path="/add-teacher" element={<AddTeacher />} />
        <Route path="/edit-teacher/:id" element={<EditTeacher />} />
        <Route path="/add-class" element={<Form model="class" />} />
        <Route path="/classes" element={<ViewClasses />} />
        <Route path="/teachers" element={<Table model="teachers" />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/students" element={<Table model="students" />} />
        <Route path="/edit-student/:id" element={<EditStudent />} />
        <Route path="/edit-class/:id" element={<EditClass />} />
        <Route path="/class/:id/analytics" element={<ClassAnalytics />} />
        <Route path="/class-analytics" element={<ClassAnalytics />} />
        <Route path="/financial-analytics" element={<FinancialAnalytics />} />
      </Routes>
    </Router>
  );
}

export default App;
