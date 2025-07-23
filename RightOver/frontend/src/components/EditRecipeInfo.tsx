/* Author: Michal Ondrejka
Login: xondre15 */

// Importing necessary dependencies from React
import React, { Fragment, useState, useEffect, ChangeEvent } from "react";

// Importing component dependencies
import "./style/EditRecipePage.css";
import AddIngredientToRecipePopUp from "./AddIngredientToRecipePopUp";
import IngredientFormPopUp from "./IngredientFormPopUp";

// Interface definitions for tool, ingredient, and recipe
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
  // Add other properties as needed
}

// Props interface for the EditRecipeInfo component
interface Props {
  recipe: Recipe;
}

// Main function component for editing recipe information
function EditRecipeInfo(props: Props) {
  // Options for nutriScore and ecoScore dropdowns
  const nutriScoreOptions = ["choose", "A", "B", "C", "D", "E"];
  const ecoScoreOptions = ["choose", "A", "B", "C", "D", "E"];

  // Destructuring the recipe from props
  const { recipe: initialRecipe } = props;

  // State variables to manage the edited recipe data
  const [recipe, setRecipe] = useState<Recipe>(initialRecipe);
  const [editedName, setEditedName] = useState(recipe.name);
  const [editedDifficulty, setEditedDifficulty] = useState<string>(
    recipe.difficulty
  );
  const [editedTimeToPrepare, setEditedTimeToPrepare] = useState(
    recipe.timeToPrepare
  );
  const [editedEcoScore, setEditedEcoScore] = useState(recipe.ecoScore);
  const [editedNutriScore, setEditedNutriScore] = useState(recipe.nutriScore);
  const [editedDescription, setEditedDescription] = useState(
    recipe.shortDescription
  );
  const [editedEnergy, setEditedEnergy] = useState<string | number>(
    recipe.energy !== null ? recipe.energy : ""
  );
  const [editedFats, setEditedFats] = useState<string | number>(
    recipe.fats !== null ? recipe.fats : ""
  );
  const [editedCarbohydrates, setEditedCarbohydrates] = useState<
    string | number
  >(recipe.carbohydrates !== null ? recipe.carbohydrates : "");
  const [editedSugars, setEditedSugars] = useState<string | number>(
    recipe.sugars !== null ? recipe.sugars : ""
  );
  const [editedProtein, setEditedProtein] = useState<string | number>(
    recipe.protein !== null ? recipe.protein : ""
  );
  const [editedSalt, setEditedSalt] = useState<string | number>(
    recipe.salt !== null ? recipe.salt : ""
  );
  const [showAddIngredientPopup, setShowAddIngredientPopup] = useState(false);
  const [showIngredientFormPopup, setShowIngredientFormPopup] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imageInputRef = React.createRef<HTMLInputElement>();

  // Handler for handling the change of the image file
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  // Handler for deleting the selected image file
  const handleDeleteImage = () => {
    setImageFile(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  // Handler for changing the recipe name
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditedName(event.target.value);
  };

  // Handler for changing the recipe difficulty
  const handleDifficultyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setEditedDifficulty(selectedValue);
  };

  // Handler for changing the recipe preparation time
  const handleTimeToPrepareChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);

    if (!isNaN(newValue) && newValue > 0) {
      setEditedTimeToPrepare(newValue);
    }
  };

  // Handler for changing the recipe nutriScore
  const handleNutriScoreChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const newValue = nutriScoreOptions.indexOf(selectedValue);

    setEditedNutriScore(newValue);
  };

  // Handler for changing the recipe ecoScore
  const handleEcoScoreChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const newValue = ecoScoreOptions.indexOf(selectedValue);

    setEditedEcoScore(newValue);
  };

  // Handler for changing the recipe description
  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedDescription(event.target.value);
  };

  // Handler for changing the recipe energy value
  const handleEnergyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue =
      event.target.value.trim() === ""
        ? ""
        : validateNumberInput(event.target.value);
    setEditedEnergy(newValue);
  };

  // Handler for changing the recipe fats value
  const handleFatsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue =
      event.target.value.trim() === ""
        ? ""
        : validateNumberInput(event.target.value);
    setEditedFats(newValue);
  };

  // Handler for changing the recipe carbohydrates value
  const handleCarbohydratesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue =
      event.target.value.trim() === ""
        ? ""
        : validateNumberInput(event.target.value);
    setEditedCarbohydrates(newValue);
  };

  // Handler for changing the recipe sugars value
  const handleSugarsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue =
      event.target.value.trim() === ""
        ? ""
        : validateNumberInput(event.target.value);
    setEditedSugars(newValue);
  };

  // Handler for changing the recipe protein value
  const handleProteinChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue =
      event.target.value.trim() === ""
        ? ""
        : validateNumberInput(event.target.value);
    setEditedProtein(newValue);
  };

  // Handler for changing the recipe salt value
  const handleSaltChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue =
      event.target.value.trim() === ""
        ? ""
        : validateNumberInput(event.target.value);
    setEditedSalt(newValue);
  };

  // Function to validate numeric input and return a number or an empty string
  const validateNumberInput = (input: string): number | string => {
    const parsedValue = parseFloat(input);
    return isNaN(parsedValue) || parsedValue < 0 ? "" : parsedValue;
  };

  // Handler for opening the Add Ingredient popup
  const handleAddIngredientClick = () => {
    setShowAddIngredientPopup(true);
  };

  // Handler for closing popups and updating the recipe
  const handleClosePopup = () => {
    setShowAddIngredientPopup(false);
    setShowIngredientFormPopup(false);
    updateRecipe();
  };

  // Handler for selecting an ingredient from the popup
  const handleIngredientSelect = (ingredient_name: string) => {
    setSelectedIngredient(ingredient_name);
    setShowAddIngredientPopup(false);
    setShowIngredientFormPopup(true);
  };

  // Handler for deleting an ingredient from the recipe
  const handleDeleteIngredient = async (index: number) => {
    const ingredientId = recipe.ingredients[index].ingredient.id;
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients.splice(index, 1);

    try {
      setRecipe({
        ...recipe,
        ingredients: updatedIngredients,
      });
      const apiUrl = `http://127.0.0.1:8000/api/recipe/${recipe.id}/delete_ingredient/${ingredientId}`;
      await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": document.cookie.split("=")[1],
        },
      });
    } catch (error) {
      console.error("Error deleting ingredient:", error);
    }
  };

  // Function to update the recipe data from the server
  const updateRecipe = () => {
    if (recipe.id) {
      const id = recipe.id;

      fetch(`http://127.0.0.1:8000/api/recipe/${id}`)
        .then((response) => response.json())
        .then((data: Recipe) => {
          setRecipe(data);
        });
    }
  };

  // Effect hook for updating the recipe data on changes
  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/api/edit_recipe/${recipe.id}`;

    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": document.cookie.split("=")[1],
      },
      body: JSON.stringify({
        name: editedName,
        difficulty: editedDifficulty,
        timeToPrepare: editedTimeToPrepare,
        ecoScore: editedEcoScore,
        nutriScore: editedNutriScore,
        shortDescription: editedDescription,
        energy: parseFloat(editedEnergy as string),
        fats: parseFloat(editedFats as string),
        carbohydrates: parseFloat(editedCarbohydrates as string),
        sugars: parseFloat(editedSugars as string),
        protein: parseFloat(editedProtein as string),
        salt: parseFloat(editedSalt as string),
      }),
    }).then((response) => response.json());
  }, [
    editedName,
    editedDifficulty,
    editedTimeToPrepare,
    editedEcoScore,
    editedNutriScore,
    editedDescription,
    editedEnergy,
    editedFats,
    editedCarbohydrates,
    editedSugars,
    editedProtein,
    editedSalt,
    recipe.id,
    selectedIngredient,
  ]);

  // JSX structure for rendering the edit recipe form
  return (
    <Fragment>
      <div className="recipe-name">
        <input type="text" value={editedName} onChange={handleNameChange} />
      </div>
      <div className="recipe-image">
        {imageFile ? (
          <div className="image-preview">
            <img src={URL.createObjectURL(imageFile)} alt="step image" />
            <button onClick={handleDeleteImage} className="delete-button btn">
              Delete Image
            </button>
          </div>
        ) : (
          <div className="input-container">
            <input
              id="image-input"
              className="input-file"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        )}
      </div>
      <div className="edit-info-container">
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
          </svg>
          <select
            value={editedDifficulty}
            onChange={handleDifficultyChange}
            style={{
              paddingLeft: "10px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            <option value={"easy"}>easy</option>
            <option value={"medium"}>medium</option>
            <option value={"hard"}>hard</option>
          </select>
        </div>
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
          </svg>
          <input
            type="number"
            value={editedTimeToPrepare}
            onChange={handleTimeToPrepareChange}
            style={{
              width: "75px",
              paddingLeft: "10px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          />
          min
        </div>
      </div>
      <div className="edit-info-container">
        <div className="left-info">
          <span style={{ fontSize: "1rem" }}>Nutri Score: </span>
          <select
            value={nutriScoreOptions[editedNutriScore]}
            onChange={handleNutriScoreChange}
          >
            {nutriScoreOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="right-info">
          <span style={{ fontSize: "1rem" }}>Eco Score: </span>
          <select
            value={ecoScoreOptions[editedEcoScore]}
            onChange={handleEcoScoreChange}
          >
            {ecoScoreOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <hr />
      <div className="recipe-description">
        <textarea
          value={editedDescription}
          onChange={handleDescriptionChange}
          rows={4}
          style={{ width: "100%", minHeight: "100px" }}
        />
      </div>
      <hr />
      <div className="ingredients">
        <h2>Ingredients:</h2>
        <div
          onClick={handleAddIngredientClick}
          className="add-ingredient-button btn"
        >
          Add Ingredient
        </div>
        <AddIngredientToRecipePopUp
          show={showAddIngredientPopup}
          onClose={handleClosePopup}
          ingredientHandle={(ingredient_name: string) =>
            handleIngredientSelect(ingredient_name)
          }
        />
        <IngredientFormPopUp
          recipe_id={recipe.id}
          ingredient_name={selectedIngredient}
          show={showIngredientFormPopup}
          onClose={handleClosePopup}
        />

        <div>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient">
              <span>
                {ingredient.quantity} {ingredient.units} of{" "}
                {ingredient.ingredient.name}
              </span>
              <div
                onClick={() => handleDeleteIngredient(index)}
                className="btn"
                style={{ color: "red", fontSize: "1rem" }}
              >
                X
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="nutritional-values">
        <h2>Nutritional Values for 100g</h2>
        <table className="nutritional-table">
          <tbody>
            <tr>
              <td>Energy</td>
              <td>
                <input
                  type="number"
                  value={editedEnergy}
                  onChange={handleEnergyChange}
                />{" "}
                kcal
              </td>
            </tr>
            <tr>
              <td>Fats</td>
              <td>
                <input
                  type="number"
                  value={editedFats}
                  onChange={handleFatsChange}
                />{" "}
                g
              </td>
            </tr>
            <tr>
              <td>Carbohydrates</td>
              <td>
                <input
                  type="number"
                  value={editedCarbohydrates}
                  onChange={handleCarbohydratesChange}
                />{" "}
                g
              </td>
            </tr>
            <tr>
              <td>Sugars</td>
              <td>
                <input
                  type="number"
                  value={editedSugars}
                  onChange={handleSugarsChange}
                />{" "}
                g
              </td>
            </tr>
            <tr>
              <td>Protein</td>
              <td>
                <input
                  type="number"
                  value={editedProtein}
                  onChange={handleProteinChange}
                />{" "}
                g
              </td>
            </tr>
            <tr>
              <td>Salt</td>
              <td>
                <input
                  type="number"
                  value={editedSalt}
                  onChange={handleSaltChange}
                />{" "}
                g
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default EditRecipeInfo;
