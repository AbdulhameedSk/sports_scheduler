import { motion } from "framer-motion";

export const Sport = ({ sname, sdesc, maxplayers, email }) => {
  return (
    <motion.div 
      className="bg-white shadow-md rounded-lg p-4 m-4 flex flex-col items-center justify-center transition-all duration-500 ease-in-out transform hover:scale-110 hover:bg-blue-100"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-2">{sname}</h2>
      <p className="text-gray-600">{sdesc}</p>
      <p className="text-gray-600">Maximum Players: {maxplayers}</p>
      <p className="text-gray-600">Contact: {email}</p>
    </motion.div>
  );
};