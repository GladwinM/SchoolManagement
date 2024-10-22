import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 flex items-center justify-center py-12">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full transform transition-all duration-500 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center relative group">
          School Management Dashboard
          <span className="block h-1 bg-indigo-500 absolute bottom-0 left-1/2 transform -translate-x-1/2 origin-center animate-underline"></span>
        </h1>
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Manage</h2>
          <ul className="space-y-4">
            <li>
              <Link
                to="/add-class"
                className="block bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white text-center py-3 px-6 rounded-lg shadow-lg transform hover:scale-110 transition duration-300 "
              >
                Add New Class
              </Link>
            </li>
            <li>
              <Link
                to="/add-teacher"
                className="block bg-gradient-to-r from-green-500 to-teal-600 hover:from-teal-600 hover:to-green-500 text-white text-center py-3 px-6 rounded-lg shadow-lg transform hover:scale-110 transition duration-300 "
              >
                Add Teacher
              </Link>
            </li>
            <li>
              <Link
                to="/add-student"
                className="block bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-cyan-600 hover:to-blue-500 text-white text-center py-3 px-6 rounded-lg shadow-lg transform hover:scale-110 transition duration-300 "
              >
                Add Student
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 p-5">View</h2>
          <ul className="space-y-4">
            <li>
              <Link
                to="/classes"
                className="block bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 text-white text-center py-3 px-6 rounded-lg shadow-lg transform hover:scale-110 transition duration-300 "
              >
                View Classes
              </Link>
            </li>
            <li>
              <Link
                to="/teachers"
                className="block bg-gradient-to-r from-red-500 to-orange-600 hover:from-orange-600 hover:to-red-500 text-white text-center py-3 px-6 rounded-lg shadow-lg transform hover:scale-110 transition duration-300 "
              >
                View Teachers
              </Link>
            </li>
            <li>
              <Link
                to="/students"
                className="block bg-gradient-to-r from-teal-500 to-green-600 hover:from-green-600 hover:to-teal-500 text-white text-center py-3 px-6 rounded-lg shadow-lg transform hover:scale-110 transition duration-300 "
              >
                View Students
              </Link>

              
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
