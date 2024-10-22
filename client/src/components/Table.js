import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Table = ({ model }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/${model}`, {
        params: {
          page,
          limit: 10,
          name: search,
          sort: sortField,
          order: sortOrder,
        },
      });

      if (model === "students") {
        setData(response.data.students);
      } else if (model === "teachers") {
        setData(response.data.teachers);
      } else if (model === "classes") {
        setData(response.data.classes);
      }

      setTotalPages(Math.ceil(response.data.total / 10));
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data");
    }
  }, [model, page, search, sortField, sortOrder]);

  useEffect(() => {
    fetchData();
  }, [fetchData, page]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        let deleteUrl = "";
        let itemId = id;

        if (model === "teachers") {
          const teacherItem = data.find((item) => item.teacherId === id);
          if (!teacherItem) {
            alert("Teacher not found");
            return;
          }
          itemId = teacherItem._id;
          deleteUrl = `http://localhost:5000/teacher/${itemId}`;
        } else if (model === "students") {
          deleteUrl = `http://localhost:5000/student/${id}`;
        } else {
          deleteUrl = `http://localhost:5000/${model}/${id}`;
        }

        await axios.delete(deleteUrl);
        setData((prevData) =>
          prevData.filter((item) =>
            model === "teachers" ? item._id !== itemId : item._id !== id
          )
        );

        alert("Item deleted successfully");
      } catch (error) {
        console.error(
          "Error deleting item:",
          error.response?.data || error.message
        );
        alert("Error deleting item");
      }
    }
  };

  const renderTableHeader = () => {
    return (
      <tr className="bg-gray-100">
        {model === "classes" && (
          <>
            <th className="py-2">Name</th>
            <th className="py-2">Year</th>
            <th className="py-2">Fees</th>
            <th className="py-2">Actions</th>
          </>
        )}
        {model === "students" && (
          <>
            <th className="py-2">Student ID</th>
            <th className="py-2">Name</th>
            <th className="py-2">Date of Birth</th>
            <th className="py-2">Phone</th>
            <th className="py-2">Email</th>
            <th className="py-2">Assigned Class</th>
            <th className="py-2">Actions</th>
          </>
        )}
        {model === "teachers" && (
          <>
            <th className="py-2">Teacher ID</th>
            <th className="py-2">Name</th>
            <th className="py-2">Phone</th>
            <th className="py-2">Email</th>
            <th className="py-2">Actions</th>
          </>
        )}
      </tr>
    );
  };

  const renderTableData = () => {
    if (!data || data.length === 0) {
      return (
        <tr>
          <td colSpan="7" className="text-center py-4">
            No data available
          </td>
        </tr>
      );
    }

    return data.map((item) => (
      <tr key={item._id} className="hover:bg-gray-50 transition duration-200">
        {model === "classes" && (
          <>
            <td className="border px-4 py-2">{item.name}</td>
            <td className="border px-4 py-2">{item.year}</td>
            <td className="border px-4 py-2">{item.fees}</td>
            <td>
              <button
                onClick={() => navigate(`/edit-class/${item._id}`)}
                className="bg-yellow-500 text-white px-2 py-1 mr-2 transition duration-300 hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white px-2 py-1 transition duration-300 hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </>
        )}
        {model === "students" && (
          <>
            <td className="border px-4 py-2">{item.studentId}</td>
            <td className="border px-4 py-2">{item.name}</td>
            <td className="border px-4 py-2">
              {new Date(item.dob).toLocaleDateString()}
            </td>
            <td className="border px-4 py-2">{item.contactDetails.phone}</td>
            <td className="border px-4 py-2">{item.contactDetails.email}</td>
            <td className="border px-4 py-2">
              {item.assignedClass ? item.assignedClass.name : "N/A"}
            </td>
            <td>
              <button
                onClick={() => navigate(`/edit-student/${item._id}`)}
                className="bg-yellow-500 text-white px-2 py-1 mr-2 transition duration-300 hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white px-2 py-1 transition duration-300 hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </>
        )}
        {model === "teachers" && (
          <>
            <td className="border px-4 py-2">{item.teacherId}</td>
            <td className="border px-4 py-2">{item.name}</td>
            <td className="border px-4 py-2">{item.contactDetails.phone}</td>
            <td className="border px-4 py-2">{item.contactDetails.email}</td>
            <td>
              <button
                onClick={() => navigate(`/edit-teacher/${item.teacherId}`)}
                className="bg-yellow-500 text-white px-2 py-1 mr-2 transition duration-300 hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.teacherId)}
                className="bg-red-500 text-white px-2 py-1 transition duration-300 hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </>
        )}
      </tr>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 to-blue-400 flex items-center justify-center pt-20 pb-20 px-4">
      <div className="p-5 mx-5 my-10 bg-white rounded-lg shadow-lg">
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name"
            className="border px-4 py-2 mr-2 rounded-lg"
          />
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="border px-4 py-2 mr-2 rounded-lg"
          >
            <option value="name">Name</option>
            {model === "students" && <option value="dob">Date of Birth</option>}
            {model === "teachers" && <option value="phone">Phone</option>}
          </select>
          <button
            onClick={() => setSortOrder("asc")}
            className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-lg transition duration-300 hover:bg-blue-600"
          >
            Asc
          </button>
          <button
            onClick={() => setSortOrder("desc")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg transition duration-300 hover:bg-blue-600"
          >
            Desc
          </button>
        </div>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">{renderTableHeader()}</thead>
          <tbody className="divide-y divide-gray-300">
            {renderTableData()}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="bg-gray-300 text-black px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="mx-4 text-lg">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="bg-gray-300 text-black px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <button
            onClick={() => navigate("/add-" + model)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-green-600"
          >
            Add {model.charAt(0).toUpperCase() + model.slice(1)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;

