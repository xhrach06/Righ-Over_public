/* Author: Matej Hrachovec
Login: xhrach06 */
import "./style/Ingredient.css";
import { Fragment } from "react";

// Define the properties for the Ingredient component
interface Props {
  IngredientName: string;
  onClick?: () => void;
  onRecipeClick?: () => void;
}

// Define the Ingredient functional component
function Ingredient({ IngredientName, onClick, onRecipeClick }: Props) {
  // Define the click handler function
  const handleClick = () => {
    // Check if onRecipeClick is provided, then call onRecipeClick
    if (onRecipeClick) {
      console.log("Clicked onRecipeClick");
      onRecipeClick();
    }
    // If onRecipeClick is not provided, check if onClick is provided, then call onClick
    else if (onClick) {
      console.log("Clicked onClick");
      onClick();
    }
  };

  // Render the Ingredient component
  return (
    <Fragment>
      <div className="background" onClick={() => handleClick && handleClick()}>
        <h3>{IngredientName}</h3>
      </div>
    </Fragment>
  );
}

// Export the Ingredient component
export default Ingredient;
