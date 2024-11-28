import React from 'react';

const StatusIndicator = ({ message }) => {
  return (
    message && (
      <div className="absolute top-4 left-4 text-white text-sm md:text-base bg-black p-2 rounded">
        {message}
      </div>
    )
  );
};

export default StatusIndicator;

