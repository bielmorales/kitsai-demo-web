import React from "react";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
  onRefresh: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  lastPage,
  onPageChange,
  onRefresh,
}) => {
  return (
    <div className="flex justify-center items-center space-x-4 my-4">
      <button
        className={`px-4 py-2 rounded-lg shadow ${
          currentPage <= 1
            ? "text-gray-400 bg-gray-200 cursor-not-allowed"
            : "text-white bg-blue-500 hover:bg-blue-600"
        } transition duration-300 ease-in-out`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Prev
      </button>

      <span className="font-semibold text-blue-500">
        Page {currentPage} of {lastPage}
      </span>

      <button
        className={`px-4 py-2 rounded-lg shadow ${
          currentPage >= lastPage
            ? "text-gray-400 bg-gray-200 cursor-not-allowed"
            : "text-white bg-blue-500 hover:bg-blue-600"
        } transition duration-300 ease-in-out`}
        onClick={() => currentPage < lastPage && onPageChange(currentPage + 1)}
        disabled={currentPage >= lastPage}
      >
        Next
      </button>

      <button
        onClick={onRefresh}
        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition duration-150 ease-in-out"
        aria-label="Refresh List"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </button>
    </div>
  );
};
