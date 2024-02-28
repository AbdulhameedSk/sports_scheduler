const Header = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">Sports-Schedular</h1>
        <nav className="space-x-4">
          <button className="hover:text-gray-300 transition duration-300">
            Games
          </button>
          <button className="hover:text-gray-300 transition duration-300">
            My Games
          </button>
          <button className="hover:text-gray-300 transition duration-300">
            Create Game
          </button>
          <button className="hover:text-gray-300 transition duration-300">
            Sign Up
          </button>
          <button className="hover:text-gray-300 transition duration-300">
            Sign In
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-400">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
