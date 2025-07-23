/* Author: Michal Ondrejka
Login: xondre15 */

// Importing necessary dependencies from React and other components
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import CategoryCard from "./CategoryCard";
import "./style/EditRecipePage.css";
import "./Ingredient"; // Importing an "Ingredient" module (assuming it's part of the project)

// Interface for defining the structure of an ingredient
interface Ingredient {
  id: number;
  name: string;
  category: string;
}

// Interface for defining the props that the component receives
interface Props {
  ingredientHandle: (name: string) => void;
}

// Main function component for adding ingredients to a recipe
function AddIngredientToRecipe(props: Props) {
  // State variables to manage the list of all ingredients, search term, and filtered ingredients
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>(
    []
  );

  // useEffect hook to fetch all ingredients when the component mounts
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/all_ingredients")
      .then((response) => response.json())
      .then((data: Ingredient[]) => {
        setIngredients(data);
        setFilteredIngredients(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handler for updating the search term and filtering ingredients based on the search term
  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const filtered = ingredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredIngredients(filtered);
  };

  // Object to group ingredients by category
  const groupedIngredients: Record<string, string[]> = {};

  ingredients.forEach((ingredient) => {
    if (!groupedIngredients[ingredient.category]) {
      groupedIngredients[ingredient.category] = [];
    }
    groupedIngredients[ingredient.category].push(ingredient.name);
  });

  // Handler for adding an ingredient to the recipe
  const handleItemClickAdd = (item: string) => {
    props.ingredientHandle(item);
  };

  // JSX structure for rendering the component
  return (
    <div className="add-ingredient">
      <div className="add-ingredient">
        <div className="heading">
          <h2>Add Ingredient</h2>
        </div>
        {/* Search bar for filtering ingredients */}
        <div className="searchbar">
          <SearchBar onSearch={handleSearchChange} />
        </div>
        {/* Displaying ingredients grouped by category using CategoryCard component */}
        <div className="categories">
          {Object.entries(groupedIngredients).map(
            ([category, ingredientNames]) => (
              <CategoryCard
                key={category}
                CategoryName={category}
                Ingredients={ingredientNames}
                onItemClick={handleItemClickAdd}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

// Exporting the AddIngredientToRecipe component as the default export
export default AddIngredientToRecipe;
