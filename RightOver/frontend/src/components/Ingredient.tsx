/* Author: Matej Hrachovec
Login: xhrach06 */
import "./style/Ingredient.css";
import { Fragment } from "react";

interface Props {
  IngredientName: string;
  onClick?: () => void;
  onRecipeClick?: () => void;
}

function Ingredient({ IngredientName, onClick, onRecipeClick }: Props) {
  const handleClick = () => {
    if (onClick) {
      console.log(":on click");
      onClick();
    } else if (onRecipeClick) {
      console.log("RECIPE");
      onRecipeClick();
    }
  };

  return (
    <Fragment>
      <div className="background" onClick={() => handleClick && handleClick()}>
        <h3>{IngredientName}</h3>
      </div>
    </Fragment>
  );
}

export default Ingredient;
