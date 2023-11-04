import { useState } from 'react';
import { Search } from "lucide-react";
import { useSearch } from '@/hooks/useSearch';
export default function SearchBar() {
    const {
      searchTerm,
      setSearchTerm,
      searchResults,
      isLoading,
      error,
      handleSearch
    } = useSearch();
  
    const handleInputChange = (event:any) => {
      setSearchTerm(event.target.value);
    };
  
    // Render your component UI here
    return (
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          placeholder="搜尋想參加的活動"
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
        <button type="submit" className="p-2 ml-2 bg-blue-500 text-white rounded-lg">
          <Search size={20} strokeWidth={2} />
        </button>
        {/* Display loading indicator */}
        {isLoading && <div>Loading...</div>}
        {/* Display error message */}
        {error && <div>Error: {error}</div>}
        {/* Display search results */}
        {/* Here you can map over searchResults to display them */}
      </form>
    );
  }