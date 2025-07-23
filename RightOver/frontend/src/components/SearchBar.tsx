/* 
  Author: Matej Hrachovec
  Login: xhrach06 
*/

import React from "react";
import { Form } from "react-bootstrap";

// Define the props for the SearchBar component
interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

// Define the SearchBar functional component
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  // Render the SearchBar component
  return (
    <Form>
      <Form.Control
        type="text"
        placeholder="Search..."
        onChange={handleSearchChange}
      />
    </Form>
  );
};

// Export the SearchBar component
export default SearchBar;
