/* Author: Michal Ondrejka
Login: xondre15 */

// Importing the Functional Component (FC) type from React
import { FC } from "react";
import AddIngredientToRecipe from "./AddIngredientToRecipe";

// Interface for defining the props that the component receives
interface Props {
  show: boolean; // Indicates whether the popup should be displayed
  onClose: () => void; // Function to close the popup
  ingredientHandle: (name: string) => void; // Function to handle adding an ingredient
}

// Functional Component for the Add Ingredient to Recipe Popup
const AddIngredientToRecipePopup: FC<Props> = ({
  show,
  onClose,
  ingredientHandle,
}) => {
  // If 'show' is false, don't render anything (hide the popup)
  if (!show) {
    return null;
  }

  // JSX structure for rendering the popup
  return (
    <div className="popup">
      <div className="popup-inner">
        {/* Close button to hide the popup */}
        <div className="close-button-container">
          <button
            className="close-button btn"
            onClick={onClose}
            style={{ width: "100px" }}
          >
            Close
          </button>
        </div>
        {/* Rendering the AddIngredientToRecipe component inside the popup */}
        <AddIngredientToRecipe ingredientHandle={ingredientHandle} />
      </div>
    </div>
  );
};

// Exporting the AddIngredientToRecipePopup component as the default export
export default AddIngredientToRecipePopup;
