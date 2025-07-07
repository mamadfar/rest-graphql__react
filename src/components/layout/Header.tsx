import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="bg-white p-4 shadow-md rounded-lg mb-6 flex space-x-4">
        <Link
          to="/projects"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Projects
        </Link>
        <Link
          to="/users"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Users
        </Link>
      </nav>
    </header>
  );
};

export default Header;
