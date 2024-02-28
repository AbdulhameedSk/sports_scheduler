import { useEffect, useState } from "react";
import axios from "axios";
import { Sport } from "../components/Sport";

const SportsList = () => {
  const [sports, setSports] = useState([]);
  const getSports = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/admin/all-sports"
      );
      setSports(response.data.sports);
    } catch (error) {
      console.error("Error fetching sports:", error);
    }
  };
  useEffect(() => {
    getSports();
  }, []);

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-4">Sports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sports.map((sport) => (
          <Sport key={sport.sportid} sname={sport.sname} sdesc={sport.sdesc} />
        ))}
      </div>
    </div>
  );
};
export default SportsList;
