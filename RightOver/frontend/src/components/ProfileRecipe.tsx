/* Author: Michal Ondrejka
Login: xondre15 */

// Importing Fragment from React for creating a wrapper without a DOM element
import { Fragment } from "react";

// Importing Link for navigation and styling for the ProfileRecipe component
import { Link } from "react-router-dom";
import "./style/ProfilePage.css";

// Interface for the Tool object
interface Tool {
  id: number;
  name: string;
}

// Interface for the Ingredient object
interface Ingredient {
  quantity: number;
  units: string;
  ingredient: {
    id: number;
    name: string;
    category: string;
  };
}

// Interface for the Step object
interface Step {
  id: number;
  title: string;
  detail: string;
  index: number;
}

// Interface for the Recipe object
interface Recipe {
  id: number;
  name: string;
  shortDescription: string;
  difficulty: string;
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

// Interface for the component props
interface Props {
  recipe: Recipe;
  onDelete: (recipeId: number) => void;
}

// Component representing a recipe in the user's profile
function ProfileRecipe(props: Props) {
  // Function to get the path for the NutriScore image based on the score
  const getNutriScoreImagePath = (score: number) =>
    `/static/nutriScore${score}.png`;

  // Function to get the path for the EcoScore image based on the score
  const getEcoScoreImagePath = (score: number) =>
    `/static/ecoScore${score}.png`;

  // Event handler for the delete button
  const handleDelete = () => {
    props.onDelete(props.recipe.id);
  };

  // JSX structure for the profile recipe display
  return (
    <Fragment>
      <div className="profile-recipe">
        <div className="container">
          <Link to={`/recipe/${props.recipe.id}`} className="recipe-link">
            <div className="row custom-row">
              {/* Column for the main image */}
              <div className="col-3 custom-column align-items-start">
                <div className="main-img-container">
                  {/* Main image with a placeholder source */}
                  <img
                    className="main-img"
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Food"
                  />
                </div>
              </div>

              {/* Column for recipe name and description */}
              <div className="col-4 custom-column align-items-start">
                <h1 className="profile-recipe-name">{props.recipe.name}</h1>
                <p className="profile-description">
                  {props.recipe.shortDescription}
                </p>
              </div>

              {/* Column for time, difficulty, and scores */}
              <div className="col-2 custom-column align-items-start">
                {/* Time to prepare */}
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
                  <span className="recipe-info">
                    {props.recipe.timeToPrepare} min
                  </span>
                </p>

                {/* Difficulty level */}
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
                  <span className="recipe-info">{props.recipe.difficulty}</span>
                </p>

                {/* NutriScore */}
                <p>
                  <img
                    className="score-img"
                    src={getNutriScoreImagePath(props.recipe.nutriScore)}
                    alt={`NutriScore ${props.recipe.nutriScore}`}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </p>

                {/* EcoScore */}
                <p>
                  <img
                    className="score-img"
                    src={getEcoScoreImagePath(props.recipe.ecoScore)}
                    alt={`EcoScore ${props.recipe.nutriScore}`}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </p>
              </div>

              {/* Column for edit and delete buttons */}
              <div className="col-2 custom-column align-items-start last-col">
                {/* Edit recipe button */}
                <Link
                  to={`/edit_recipe/${props.recipe.id}`}
                  className="edit-recipe-button btn"
                >
                  Edit
                </Link>

                {/* Delete recipe button */}
                <Link
                  to={`/profile`}
                  className="edit-recipe-button btn"
                  onClick={handleDelete}
                >
                  Delete
                </Link>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

// Exporting the ProfileRecipe component as the default export
export default ProfileRecipe;
