/* Author: Matej Hrachovec
Login: xhrach06 */
import { Link } from "react-router-dom";
import { Fragment } from "react";
import "./style/Home.css";

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

interface Props {
  recipe: Recipe;
  onClick?: (recipe: Recipe) => void;
}

function CalendarRecipe({ recipe, onClick }: Props) {
  const handleClick = (recipe: Recipe) => {
    if (onClick) {
      onClick(recipe);
    }
  };

  const getNutriScoreImagePath = (score: number) =>
    `/static/nutriScore${score}.png`;
  const getEcoScoreImagePath = (score: number) =>
    `/static/nutriScore${score}.png`;
  const mainIngredients = recipe.ingredients.slice(0, 4);

  return (
    <div className="calendar-recipe" onClick={() => handleClick(recipe)}>
      <div className="short-recipe">
        <div className="container">
          <div className="row custom-row">
            <div className="col-3 custom-column align-items-start">
              <img
                className="main-img"
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Food"
              />
            </div>
            <div className="col-4 custom-column align-items-start">
              <h1 className="short-recipe-name">{recipe.name}</h1>
              <p className="short-description">{recipe.shortDescription}</p>
            </div>
            <div className="col-2 custom-column align-items-start">
              <p>
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
                </svg>
                <span className="recipe-info">{recipe.timeToPrepare} min</span>
              </p>
              <p>
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
                </svg>
                <span className="recipe-info">{recipe.difficulty}</span>
              </p>
              <p>
                <img
                  className="score-img"
                  src={getNutriScoreImagePath(recipe.nutriScore)}
                  alt={`NutriScore ${recipe.nutriScore}`}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </p>
              <p>
                <img
                  className="score-img"
                  src={getEcoScoreImagePath(recipe.ecoScore)}
                  alt={`EcoScore ${recipe.nutriScore}`}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </p>
            </div>
            <div className="col-2 custom-column align-items-start">
              <h4>Main ingredients:</h4>
              <div className="ingredients">
                {mainIngredients.map((ingredient, index) => (
                  <p key={index} className="ingredient">
                    {ingredient.ingredient.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarRecipe;
