import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Createsport = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    sname: "",
    sdesc: "",
    maxplayers: 1,
    created_by: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/admin/create-sports",
        inputs
      );
      if (data?.success) {
        alert("Sport created successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue =
      name === "created_by" || name === "maxplayers" ? parseInt(value) : value;
    setInputs((prevState) => ({
      ...prevState,
      [name]: numericValue,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="container mx-auto w-1/2 mt-8 p-4 bg-white shadow-md rounded-md"
    >
      <h2 className="text-2xl font-bold mb-4">Create a New Sport</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block">Sport Name:</label>
          <input
            type="text"
            name="sname"
            value={inputs.sname}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-full shadow-md"
          />
        </div>
        <div className="mb-4">
          <label className="block">Description:</label>
          <textarea
            name="sdesc"
            value={inputs.sdesc}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-full shadow-md"
          />
        </div>
        <div className="mb-4">
          <label className="block">Max Players:</label>
          <input
            type="number"
            name="maxplayers"
            value={inputs.maxplayers}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-full shadow-md"
          />
        </div>
        <div className="mb-4">
          <label className="block">Id:</label>
          <input
            type="number"
            name="created_by"
            value={inputs.created_by}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-full shadow-md"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Sport
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Createsport;
