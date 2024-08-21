import React from 'react';
import '../css/pageerror.css';

const Error404 = () => {
  return (
    <div className="error-404">
      <div className="error-container">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default Error404;
