import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        onSearch(query); // Call parent-provided search function
      }
    }, 400); // Debounce delay

    return () => clearTimeout(delayDebounce);
  }, [query, onSearch]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="search-container position-relative">
            <div className="d-flex align-items-center w-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="search-icon feather feather-search"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>

              <input
                className="form-control search-input ps-5"
                type="search"
                placeholder="Search anything..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
