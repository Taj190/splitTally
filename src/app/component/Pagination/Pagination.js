import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-between items-center w-full mt-4">
    <button
      className={`px-4 py-2 border rounded-lg ${
        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300 dark:hover:bg-gray-600'
      }`}
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Prev
    </button>
  
    <span className="text-gray-900 dark:text-white">
      Page {currentPage} of {totalPages}
    </span>
  
    <button
      className={`px-4 py-2 border rounded-lg ${
        currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300 dark:hover:bg-gray-600'
      }`}
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
  
  );
};

export default Pagination;
