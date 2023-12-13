// Loader.js
import React from 'react';
import RingLoader from 'react-spinners/RingLoader';

const Loader = () => {
  return (
    <div className="loader-container">
        <RingLoader color="#36d7b7" />
    </div>
  );
};

export default Loader;
