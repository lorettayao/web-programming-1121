import { useState } from 'react';
import { string } from 'zod';

// A custom hook that encapsulates the search logic
export function useSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSearchResults = async (term:any) => {
    setIsLoading(true);
    try {
      // Update the endpoint as required, for example '/api/search'
      
      const response = await fetch("/api/tweets", {
        method: "GET",
        
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (event:any) => {
    event.preventDefault();
    if (searchTerm.trim() !== '') {
      fetchSearchResults(searchTerm);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isLoading,
    error,
    handleSearch
  };
}
