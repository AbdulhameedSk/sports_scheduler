const selectSport=()=>{
  
}
export const Sport = ({ sname, sdesc, }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold mb-2">{sname}</h2>
        <p className="text-gray-600">{sdesc}</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={selectSport}>
          GO
        </button>
      </div>
    );
  };
      