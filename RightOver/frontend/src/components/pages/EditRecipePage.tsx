/* Author: Dominik Truchly
Login: xtruch01 */

// Import necessary modules and components
import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import EditRecipeInfo from "../EditRecipeInfo";
import EditRecipeStep from "../EditRecipeStep";
import NavBar from "../NavBar";
import "../style/EditRecipePage.css";

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
  videoUrl: string;
}

// Function for rendering the EditRecipePage component
function EditRecipePage() {
  // Get recipe ID from URL
  const { recipe_id } = useParams();
  // Define state variables for recipe data and video file
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const videoInputRef = React.createRef<HTMLInputElement>();

  // Fetch recipe data from API
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

  // Video file change handler
  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

// Function for deleting the video file
  const handleDeleteVideo = () => {
    setVideoFile(null);
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  // Function for adding a new step to the recipe
  const handleAddStep = () => {
   
    const newStepData = {
      title: "Set title",
      detail: "Set step detail",
    };
    // Making a POST request to create a new step for the recipe
    fetch(`http://127.0.0.1:8000/api/create_step/${recipe_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStepData),
    })
      .then((response) => response.json())
      .then((createdStep) => {
        setRecipe((prevRecipe) => {
          if (prevRecipe) {
            return {
              ...prevRecipe,
              steps: [...prevRecipe.steps, createdStep],
            };
          }
          return null;
        });
      })
      .catch((error) => {
        console.error("Error creating new step:", error);
      });
  };

  // Function for deleting a step from the recipe
  const handleStepDelete = (index: number) => {
    setRecipe((prevRecipe) => {
      // Updating the local state by removing the step with the specified index
      if (prevRecipe) {
        const updatedSteps = prevRecipe.steps.filter(
          (step) => step.index !== index
        );
      // Updating the indexes of the remaining steps
        const updatedStepsWithIndexes = updatedSteps.map((step, i) => ({
          ...step,
          index: i + 1, 
        }));

        return {
          ...prevRecipe,
          steps: updatedStepsWithIndexes,
        };
      }
      return null;
    });
  };

  // Function for updating the recipe data
  useEffect(() => {
    if (recipe_id) {
      // Fetching updated recipe data from the API
      fetch(`http://127.0.0.1:8000/api/recipe/${recipe_id}`)
        .then((response) => response.json())
        .then((updatedRecipe: Recipe) => {
          // Updating the local state with the fetched recipe data
          setRecipe(updatedRecipe);
        })
        .catch((error) => {
          console.error("Error fetching updated recipe:", error);
        });
    }
  }, [recipe_id]);
  // Rendering the EditRecipePage component
  return (
    <Fragment>
      {/* Render the navigation bar */}
      <NavBar />
      <div className="recipe">
        {/* Left column displays recipe information */}
        <div className="left-col">
          {recipe && <EditRecipeInfo recipe={recipe} />}
        </div>
         {/* Right column displays video, steps, and step buttons */}
        <div className="right-col">
          <div className="recipe-video">
            {videoFile ? (
              <div className="video-preview">
                <video controls>
                  <source
                    src={URL.createObjectURL(videoFile)}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                {/* Button to delete the uploaded video */}
                <button
                  onClick={handleDeleteVideo}
                  className="delete-button btn"
                >
                  Delete Video
                </button>
              </div>
            ) : (
              <div className="input-container">
                <input
                  ref={videoInputRef}
                  id="video-input"
                  className="input-file"
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                />
              </div>
            )}
          </div>
          {/* Display recipe steps and provide functionality to add new steps */}
          <div className="recipe-steps">
            {recipe?.steps.map((step) => (
              <EditRecipeStep
                key={step.id}
                index={step.index}
                title={step.title}
                detail={step.detail}
                recipe_id={recipe.id}
                onDelete={handleStepDelete} 
              />
            ))}
          </div>
           {/* Button to add a new step to the recipe */}
          <div className="step-button-container">
            <div onClick={handleAddStep} className="step-button btn">
              Add Step
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
// Exporting the EditRecipePage component as the default export
export default EditRecipePage;
