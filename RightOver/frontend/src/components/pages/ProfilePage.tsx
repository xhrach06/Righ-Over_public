/* Author: Michal Ondrejka
Login: xondre15 */

// Importing necessary dependencies from React and components
import { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import ProfileInfo from "../ProfileInfo";
import ProfileRecipe from "../ProfileRecipe";
import SearchBar from "../SearchBar";
import "../style/ProfilePage.css";

// Interfaces for defining the data structures used in the component
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

interface SuccessMessage {
  type: "success";
  message: string;
}

// Main function component for the Profile Page
function ProfilePage() {
  // State variables for managing user recipes, success and error messages, and search term
  const [userRecipes, setUserRecipes] = useState<Recipe[] | null>(null);
  const [successMessage, setSuccessMessage] = useState<SuccessMessage | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Retrieving CSRF token from cookie and getting navigation function from react-router-dom
  const csrftoken = getCookie("csrftoken");
  const navigate = useNavigate();

  // Handler for updating the search term
  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  // Filtering recipes based on the search term
  const filteredRecipes =
    userRecipes &&
    userRecipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Function to extract CSRF token from cookies
  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  }

  // useEffect hook to fetch user recipes when the component mounts
  useEffect(() => {
    fetchRecipes();
  }, []);

  // Function to fetch user recipes from the API
  const fetchRecipes = () => {
    fetch(`http://127.0.0.1:8000/api/user_recipes/`)
      .then((response) => response.json())
      .then((data: Recipe[]) => {
        setUserRecipes(data);
      });
  };

  // Function to handle the creation of a new recipe
  const handleClick = async () => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (csrftoken) {
      headers["X-CSRFToken"] = csrftoken;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/create_recipe/", {
        method: "POST",
        mode: "cors",
        headers: headers,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data);
        setErrorMessage(null);

        // Redirecting to the edit page for the newly created recipe
        if (data.recipe_id !== -1) navigate(`/edit_recipe/${data.recipe_id}`);
      } else {
        setErrorMessage(data.error);
        setSuccessMessage(null);
      }

      // Refreshing the list of user recipes
      fetchRecipes();
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("An error occurred while creating the recipe.");
      setSuccessMessage(null);
    }
  };

  // Function to handle the deletion of a recipe
  const handleDelete = async (recipeId: number) => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (csrftoken) {
      headers["X-CSRFToken"] = csrftoken;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/delete_recipe/${recipeId}/`,
        {
          method: "DELETE",
          mode: "cors",
          headers: headers,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data);
        setErrorMessage(null);
      } else {
        setErrorMessage(data.error);
        setSuccessMessage(null);
      }

      // Refreshing the list of user recipes
      fetchRecipes();
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("An error occurred while deleting the recipe.");
      setSuccessMessage(null);
    }
  };

  // JSX structure for rendering the Profile Page
  return (
    <Fragment>
      <NavBar />
      <div className="profile">
        <div className="left-col">
          <ProfileInfo />
        </div>
        <div className="right-col">
          <div className="recipe-filter">
            <div className="search-bar">
              {/* Rendering the SearchBar component */}
              <SearchBar onSearch={handleSearchChange} />
            </div>
            {/* Button for creating a new recipe */}
            <div className="create-recipe-button btn" onClick={handleClick}>
              New recipe
            </div>
          </div>
          {/* Displaying success and error messages if present */}
          {successMessage && (
            <div
              className={`alert ${
                successMessage.type === "success"
                  ? "alert-success"
                  : "alert-warning"
              } custom-message`}
              role="alert"
            >
              {successMessage.message}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger custom-message" role="alert">
              {errorMessage}
            </div>
          )}
          {/* Displaying user recipes using the ProfileRecipe component */}
          <div className="profile-recipes">
            {filteredRecipes &&
              filteredRecipes.map((recipe) => (
                <ProfileRecipe
                  key={recipe.id}
                  recipe={recipe}
                  onDelete={() => handleDelete(recipe.id)}
                />
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

// Exporting the ProfilePage component as the default export
export default ProfilePage;
