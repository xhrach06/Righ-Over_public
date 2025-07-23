/* Author: Matej Hrachovec
Login: xhrach06 */

import { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import "./style/AddIngredient.css";
import SearchBar from "./SearchBar";
import "./Ingredient";

interface Ingredient {
  id: number;
  name: string;
  category: string;
}

type AddIngredientProps = {
  onItemClick: (item: string) => void;
  selectedItems: string[];
  displayOnly?: boolean;
};

function groupIngredientsByCategory(ingredients: Ingredient[]) {
  const groupedIngredients: Record<string, string[]> = {};

  ingredients.forEach((ingredient) => {
    const { category, name } = ingredient;

    if (!groupedIngredients[category]) {
      groupedIngredients[category] = [];
    }

    groupedIngredients[category].push(name);
  });

  return groupedIngredients;
}

function AddIngredient({
  onItemClick,
  selectedItems,
  displayOnly,
}: AddIngredientProps) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleItemClick = (item: string) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>(
    []
  );

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/all_ingredients")
      .then((response) => response.json())
      .then((data: Ingredient[]) => {
        setIngredients(data);
        setFilteredIngredients(data); 
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const groupedIngredients = groupIngredientsByCategory(filteredIngredients);

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);

    const filtered = ingredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredIngredients(filtered);
  };

  return (
    <div className="add-ingredient">
      <div className="heading">
        <h2>Add Ingredient</h2>
      </div>
      <div className="searchbar">
        <SearchBar onSearch={handleSearchChange} />
      </div>
      <div className="categories">
        {Object.entries(groupedIngredients).map(
          ([category, ingredientNames]) => (
            <CategoryCard
              key={category}
              CategoryName={category}
              Ingredients={ingredientNames}
            />
          )
        )}
      </div>
    </div>
  );
}

export default AddIngredient;
