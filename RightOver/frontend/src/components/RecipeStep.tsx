/* Author: Dominik Truchly
Login: xtruch01 */

// Importing necessary modules and components
import { Fragment } from "react";
import "./style/RecipePage.css";

// Define interface for the props used in this component
interface Props {
  title: string;
  detail: string;
  index: number;
}

// Function for rendering the RecipeStep component
function RecipeStep(props: Props) {
  return (
    <Fragment>
      {/* Container for displaying the recipe step */}
      <div className="step-container">
           {/* Displaying the step image */}
        <div className="step-image">
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/delish-210419-carne-asada-torta-01-portrait-jg-1620136948.jpg"
            alt="hamburger"
          />
        </div>
        {/* Displaying the step information */}
        <div className="step-info">
           {/* Displaying the step header with index and title */}
          <div className="step-header">
            <span className="step-index">{props.index}</span>
            <span className="step-title">{props.title}</span>
          </div>
          {/* Displaying the step body with detail */}
          <div className="step-body">
            <h3>{props.detail}</h3>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default RecipeStep;
