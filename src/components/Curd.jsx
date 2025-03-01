import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Curd = () => {
  const [users, setUsers] = useState([]);
  const [userDetails, setUserDetails] = useState({
    id: uuidv4(),
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState([]);
  const [btnChange, setBtnChange] = useState("Add");

  //get data from input fiels and also add
  const InputFunction = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };
  //validate inputt field
  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const { name, email, phone } = userDetails;

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please provie all fields / valid Data");
      return false;
    }

    if (!emailRegex.test(email)) {
      setError("Please provide a valid email");
      return false;
    }

    if (!phoneRegex.test(phone)) {
      setError("Please provide a valid phone number");
      return false;
    }

    setError("");
    return true;
  };
  // adding data to an array
  const addFunction = (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    setUsers((prev) => [...prev, userDetails]);

    setUserDetails({
      id: uuidv4(),
      name: "",
      email: "",
      phone: "",
    });
    setError("");
  };

  //editing data set to input field
  const editBtn = (userData) => {
    setUserDetails(userData);
    setBtnChange("Update");
  };
  //deleteing data
  const deleteBtn = (index) => {
    setUsers((prev) => prev.filter((i) => i.id !== index));
  };

  const cancelFunction = () => {
    setBtnChange("Add");
    setUserDetails({
      id: uuidv4(),
      name: "",
      email: "",
      phone: "",
    });
  };
  //updatind data
  const updateFunction = () => {
    if (!validateInputs()) return;
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === userDetails.id) {
          return userDetails;
        }
        return user;
      })
    );
    cancelFunction();
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md rounded-lg bg-white p-5">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">
          CRUD Operations
        </h1>
        <input
          type="text"
          value={userDetails.name}
          name="name"
          placeholder="Enter Name"
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none mb-6"
          onChange={InputFunction}
        />
        <input
          type="email"
          name="email"
          value={userDetails.email}
          placeholder="Enter Email"
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none mb-6"
          onChange={InputFunction}
        />
        <input
          type="number"
          name="phone"
          value={userDetails.phone}
          placeholder="Enter 10 Digit Phone Number"
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none mb-6"
          onChange={InputFunction}
        />
        <div className="text-center">
          {btnChange === "Add" ? (
            <button
              className="bg-purple-700 hover:bg-blue-700 text-white py-3 px-6 rounded-lg cursor-pointer text-center"
              onClick={addFunction}
            >
              Add
            </button>
          ) : (
            <div className="flex gap-2 justify-center">
              <button
                className="bg-purple-700 hover:bg-blue-700 text-white py-3 px-6 rounded-lg cursor-pointer text-center"
                onClick={updateFunction}
              >
                Update
              </button>
              <button
                className="bg-blue-700 text-white py-3 px-6 rounded-lg cursor-pointer text-center"
                onClick={cancelFunction}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className="text-center py-4">
          <span className="text-red-600 font-semibold text-md">{error}</span>
        </div>
      </div>
      <div className="w-full max-w-lg rounded-lg mt-10">
        {/* mapping user array  */}
        {users.length > 0 && (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left text-purple-700">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-purple-700">
                  Email
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-purple-700">
                  Phone
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-purple-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr ket={index}>
                    {" "}
                    <td className="border border-gray-300 px-4 py-2 text-white">
                      {user.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-white">
                      {user.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-white">
                      {user.phone}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-white">
                      <div className="flex gap-2">
                        <button
                          onClick={() => editBtn(user)}
                          className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:opacity-80 transition duration-300 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteBtn(user.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded-lg hover:opacity-80 transition duration-300 cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Curd;
