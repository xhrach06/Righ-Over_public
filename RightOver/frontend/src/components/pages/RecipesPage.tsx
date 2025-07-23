/* Author: Dominik Truchly
Login: xtruch01 */

// Importing necessary modules and components
import { useState, useEffect, Fragment } from "react";
import ShortRecipe from "../ShortRecipe";
import NavBar from "../NavBar";

// Define interfaces for types used in this component
interface Ingredient {
  quantity: number;
  units: string;
  ingredient: {
    id: number;
    name: string;
    category: string;
  };
}

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

// Function for rendering the HomePage component
function HomePage() {
  // State variable for managing recipe data
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Fetch short recipe data from API when the component mounts
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/short_recipes")
      .then((response) => response.json())
      .then((data: Recipe[]) => setRecipes(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []); 

  // Rendering the HomePage component
  return (
    <Fragment>
      <NavBar />
      {recipes.map((recipe) => (
        <ShortRecipe recipe={recipe} key={recipe.id} />
      ))}
    </Fragment>
  );
}

// Exporting the HomePage component as the default export
export default HomePage;
