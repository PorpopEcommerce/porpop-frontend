// Spinner.tsx
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-[700px] p-10">
      <div className="w-16 h-16 border-4 border-t-transparent border-[#729245] border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
