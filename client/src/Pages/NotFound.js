// src/Pages/NotFound.jsx

import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <h1 className="display-1 fw-bold">404</h1>
      <h3 className="mb-4">Page Not Found</h3>
      <p className="text-muted mb-4 text-center">The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn btn-primary">Go Back Home</Link>
    </div>
  );
};

export default NotFound;
