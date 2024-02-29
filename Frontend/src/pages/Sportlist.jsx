import { useEffect, useState } from "react";
import axios from "axios";
import { Sport } from "../components/Sport";
import { useNavigate } from "react-router-dom";  
const Sportslist = () => {
  const [sports, setSports] = useState([]);
const navigate = useNavigate();
  const getSports = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/admin/all-sports`
      );
      if (data?.success) {
        setSports(data?.sports);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getSports();
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="text-3xl font-bold mb-4">Sports</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sports.map((sport) => (
            <Sport
              key={sport.sportid}
              sname={sport.sname}
              sdesc={sport.sdesc}
              maxplayers={sport.maxplayers}
              email={sport.users.email}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " onClick={()=>navigate('/add-sport')}>
          Add a new sport
        </button>
      </div>
    </>
  );
};

export default Sportslist;
