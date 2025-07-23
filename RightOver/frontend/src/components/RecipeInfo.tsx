/* Author: Dominik Truchly
Login: xtruch01 */

// Importing necessary modules and components
import { Fragment } from "react";
import "./style/RecipePage.css";

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
}

// Define the props interface for this component
interface Props {
  recipe: Recipe;
}

// Function for rendering the RecipeInfo component
function RecipeInfo(props: Props) {
  // Destructuring the recipe object from props
  const { recipe } = props;

  // Function to get the path for the NutriScore image
  const getNutriScoreImagePath = (score: number) =>
    `/static/nutriScore${score}.png`;
  
  // Function to get the path for the EcoScore image
  const getEcoScoreImagePath = (score: number) =>
    `/static/ecoScore${score}.png`;

  // Rendering the RecipeInfo component
  return (
    <Fragment>
      <div className="recipe-name">{recipe.name}</div>
      <div className="recipe-image">
        {/* Displaying the main recipe image */}
        <img
          className="main-img"
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt={recipe.name}
        />
      </div>
      <div className="info-container">
        {/* Displaying the difficulty level */}
        <div className="left-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-activity"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2"
            />
          </svg>{" "}
          {recipe.difficulty}
        </div>
        {/* Displaying the time to prepare */}
        <div className="right-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-clock-fill"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"
            />
          </svg>{" "}
          {recipe.timeToPrepare} minutes
        </div>
      </div>
      <div className="info-container">
        <div className="left-info">
          <img
            className="score-img"
            src={getNutriScoreImagePath(recipe.nutriScore)}
            alt={`NutriScore ${recipe.nutriScore}`}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        {/* Displaying the time to prepare */}
        <div className="right-info">
          <img
            className="score-img"
            src={getEcoScoreImagePath(recipe.ecoScore)}
            alt={`EcoSore ${recipe.ecoScore}`}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>
      <hr />
      {/* Displaying the short recipe description */}
      <div className="recipe-description">{recipe.shortDescription}</div>
      <hr />
      {/* Displaying the list of ingredients */}
      <div className="ingredients">
        <h2>Ingredients:</h2>
        <div>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient">
              {ingredient.quantity} {ingredient.units} of{" "}
              {ingredient.ingredient.name}
            </div>
          ))}
        </div>
      </div>
    {/* Displaying NutriScore and EcoScore images */}
      <div className="nutritional-values">
        <h2>Nutritional Values for 100g</h2>
        <table className="nutritional-table">
          <tbody>
            {recipe.energy !== null && (
              <tr>
                <td>Energy</td>
                <td>{recipe.energy} kcal</td>
              </tr>
            )}
            {recipe.fats !== null && (
              <tr>
                <td>Fats</td>
                <td>{recipe.fats} g</td>
              </tr>
            )}
            {recipe.carbohydrates !== null && (
              <tr>
                <td>Carbohydrates</td>
                <td>{recipe.carbohydrates} g</td>
              </tr>
            )}
            {recipe.sugars !== null && (
              <tr>
                <td>Sugars</td>
                <td>{recipe.sugars} g</td>
              </tr>
            )}
            {recipe.protein !== null && (
              <tr>
                <td>Protein</td>
                <td>{recipe.protein} g</td>
              </tr>
            )}
            {recipe.salt !== null && (
              <tr>
                <td>Salt</td>
                <td>{recipe.salt} g</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

// Exporting the RecipeInfo component as default export
export default RecipeInfo;
