/* Author: Matej Hrachovec
Login: xhrach06 */
// Import necessary modules and components
import { Fragment, useState } from "react";
import Ingredient from "./CalendarIngredient";
import "./style/CategoryCard.css";

// Define the properties for the CategoryCard component
interface Props {
  CategoryName: string;
  Ingredients: string[];
  onItemClick?: (item: string) => void;
  onRecipeClick?: (recipe: string, category: string) => void;
}

// Function to render rows of ingredients
function renderIngredients(
  ingredients: string[],
  onItemClick?: (item: string) => void,
  onRecipeClick?: (recipe: string, category: string) => void
) {
  const ingredientsRows = [];
  const itemsPerRow = 5;

  for (let i = 0; i < ingredients.length; i += itemsPerRow) {
    const rowIngredients = ingredients.slice(i, i + itemsPerRow);

    ingredientsRows.push(
      <div key={i} className="row row-cols-5">
        {rowIngredients.map((ingredient, index) => (
          <div className="ingredient-in-category" key={index}>
            <Ingredient
              IngredientName={ingredient}
              onClick={() => onItemClick && onItemClick(ingredient)}
              onRecipeClick={() =>
                onRecipeClick && onRecipeClick(ingredient, ingredients[0])
              }
            />
          </div>
        ))}
      </div>
    );
  }
  return ingredientsRows;
}

// Define the CategoryCard functional component
function CategoryCard({
  CategoryName,
  Ingredients,
  onItemClick,
  onRecipeClick,
}: Props) {
  // State variable for expansion state
  const [isExpanded, setIsExpanded] = useState(false);

  // Handle click on a recipe
  const handleRecipeClick = (ingredient: string) => {
    onRecipeClick && onRecipeClick(CategoryName, ingredient);
  };

  // Toggle expansion state
  const toggleRows = () => {
    setIsExpanded(!isExpanded);
  };

  // Format date for display
  let formattedDate: string;
  onRecipeClick
    ? (formattedDate = new Date(CategoryName).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }))
    : (formattedDate = CategoryName);

  // Render the CategoryCard component
  return (
    <Fragment>
      <div
        className={`CategoryCard ${isExpanded ? "expanded" : ""}`}
        id={CategoryName}
      >
        <div className="container text-center">
          <div
            className="row justify-content-center category-name"
            onClick={toggleRows}
          >
            <h2>{formattedDate}</h2>
          </div>
          <div className={`col ${isExpanded ? "expanded" : ""}`}>
            {renderIngredients(Ingredients, onItemClick, handleRecipeClick)}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

// Export the CategoryCard component
export default CategoryCard;
