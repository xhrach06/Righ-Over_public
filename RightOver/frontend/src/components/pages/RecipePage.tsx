/* Author: Dominik Truchly
Login: xtruch01 */

// Importing necessary modules and components
import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import RecipeInfo from "../RecipeInfo";
import RecipeStep from "../RecipeStep";
import NavBar from "../NavBar";
import "../style/RecipePage.css";

// Define interfaces for types used in this component
interface Tool {
  id: number;
  name: string;
}

interface Ingredient {
  quantity: number;
  units: string;
  ingredient: {
    id: number;
    name: string;
    category: string;
  };
}

interface Step {
  id: number;
  title: string;
  detail: string;
  index: number;
}

interface Recipe {
  id: number;
  name: string;
  shortDescription: string;
  difficulty: number;
  timeToPrepare: number;
  ecoScore: number;
  nutriScore: number;
  energy: number;
  fats: number;
  carbohydrates: number;
  sugars: number;
  protein: number;
  salt: number;
  tools: Tool[];
  ingredients: Ingredient[];
  steps: Step[];
}

// Function for rendering the RecipePage component
function RecipePage() {
  // Using React Router to get the recipe_id from the URL
  const { recipe_id } = useParams();
   // State variable for managing recipe data
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  // Fetch recipe data from API when the component mounts or when recipe_id changes
  useEffect(() => {
    if (recipe_id) {
      const id = parseInt(recipe_id, 10);

      fetch(`http://127.0.0.1:8000/api/recipe/${id}`)
        .then((response) => response.json())
        .then((data: Recipe) => {
          setRecipe(data);
        });
    }
  }, [recipe_id]); 

  // Rendering the RecipePage component
  return (
    <Fragment>
      {/* Render the navigation bar */}
      <NavBar />
      <div className="recipe">
        {/* Left column displays detailed recipe information */}
        <div className="left-col">
          {recipe && <RecipeInfo recipe={recipe} />}
        </div>
        {/* Right column displays recipe video and steps */}
        <div className="right-col">
          <div className="recipe-video">
            <video width="auto" height="auto" controls>
              <source src="/static/videoRecipe.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          {/* Display recipe steps using RecipeStep component */}
          <div className="recipe-steps">
            {recipe?.steps.map((step) => (
              <RecipeStep
                key={step.id}
                index={step.index}
                title={step.title}
                detail={step.detail}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

// Exporting the RecipePage component as the default export
export default RecipePage;
