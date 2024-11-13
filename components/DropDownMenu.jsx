"use client";
import { useState } from "react";

const DropDownMenu = ({ allUsers, onUserSelect }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Track search input state

  // Seach Input
  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Select Username from dropdown menu
  const handleUserSelect = (username) => {
    onUserSelect(username);
  };

  // Filter usernames based on letters
  const filteredUsernames = allUsers.filter((item) =>
    item.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="flex items-center justify-center">
      <div className="flex justify-center relative bottom-2 group">
        <button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
          <span className="mr-2 font-extrabold">Find Users</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 3a5 5 0 11-5 5 5 5 0 015-5zm0 1a4 4 0 100 8 4 4 0 000-8zm6.293 9.293a1 1 0 011.414 0l3 3a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="absolute top-9 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
          <input
            type="text"
            id="search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchInput}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md mb-2"
          />

          <div className="max-h-80 overflow-y-auto no-scrollbar">
            {filteredUsernames.map((username) => (
              <div
                key={username}
                onClick={() => handleUserSelect(username)}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
              >
                {username}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropDownMenu;
