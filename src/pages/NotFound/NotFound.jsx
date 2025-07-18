import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-base-200">
      <h1 className="text-7xl font-bold text-red-600">404</h1>
      <p className="text-2xl mt-4 mb-6">Oops! Page Not Found</p>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;