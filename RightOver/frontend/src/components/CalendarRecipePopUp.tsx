/* 
  Author: Matej Hrachovec
  Login: xhrach06
*/

// Import necessary modules and components
import React, { useState, useEffect } from "react";
import CalendarRecipe from "./CalendarRecipe";
import { Button } from "react-bootstrap";

// Define the structure of an Ingredient
interface Ingredient {
  quantity: number;
  units: string;
  ingredient: {
    id: number;
    name: string;
    category: string;
  };
}

// Define the structure of a Recipe
interface Recipe {
  id: number;
  name: string;
  shortDescription: string;
  difficulty: number;
  timeToPrepare: number;
  ecoScore: number;
  nutriScore: number;
  ingredients: Ingredient[];
}

// Define the properties for the CalendarRecipePopUp component
interface Props {
  isVisible: Boolean;
  setIsVisible: () => void;
  onRecipeClick?: (recipe: Recipe) => void;
}

// Define the CalendarRecipePopUp functional component
function CalendarRecipePopUp({
  isVisible,
  setIsVisible,
  onRecipeClick,
}: Props) {
  // State variables
  const [recipeIsVisible, setRecipeVisible] = useState<Boolean>();
  const [userRecipes, setUserRecipes] = useState<Recipe[] | null>(null);

  // Function to get the path for the NutriScore image
  const getNutriScoreImagePath = (score: number) =>
    `/static/nutriScore${score}.png`;

  // Function to get the path for the EcoScore image
  const getEcoScoreImagePath = (score: number) =>
    `/static/nutriScore${score}.png`;

  // Function to close the pop-up
  const closePopUp = () => setIsVisible();

  // Handle click on a recipe
  const handleRecipeClick = (recipe: Recipe) => {
    if (onRecipeClick) {
      onRecipeClick(recipe);
    }
  };

  // Fetch user recipes data on component mount
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user_recipes/`)
      .then((response) => response.json())
      .then((data: Recipe[]) => {
        setUserRecipes(data);
      });
  }, []);

  // Render the CalendarRecipePopUp component
  return isVisible ? (
    <div className="calendar-pop-up">
      <div className="button">
        <button onClick={closePopUp}> CLOSE </button>
      </div>
      <div className="popup-content">
        <div className="recipes">
          {userRecipes &&
            userRecipes.map((recipe) => (
              <CalendarRecipe
                key={recipe.id}
                recipe={recipe}
                onClick={() => handleRecipeClick(recipe)}
              />
            ))}
        </div>
      </div>
    </div>
  ) : null;
}

// Export the CalendarRecipePopUp component
export default CalendarRecipePopUp;
