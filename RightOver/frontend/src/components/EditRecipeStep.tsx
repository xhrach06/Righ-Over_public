/* Author: Dominik Truchly
Login: xtruch01 */

// Importing necessary modules and components
import React, { Fragment, useState } from "react";
import "./style/RecipePage.css";

// Define interface for the props used in this component
interface Props {
  recipe_id: number;
  title: string;
  detail: string;
  index: number;
  onDelete: (index: number) => void; 
}

// Function for rendering the RecipeStep component
function EditRecipeStep(props: Props) {
  // State variables for managing input values and image file
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedDetail, setEditedDetail] = useState(props.detail);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imageInputRef = React.createRef<HTMLInputElement>();

  // Handle image change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };
  // Handle image deletion
  const handleDeleteImage = () => {
    setImageFile(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  // Handle title and detail change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setEditedTitle(newTitle);
    updateRecipeStep({ title: newTitle, detail: editedDetail });
  };

  const handleDetailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDetail = e.target.value;
    setEditedDetail(newDetail);
    updateRecipeStep({ title: editedTitle, detail: newDetail });
  };

  // Update recipe step
  const updateRecipeStep = async (updatedStep: {
    title: string;
    detail: string;
  }) => {
    try {
      // Send PUT request to update step
      const response = await fetch(
        `/api/recipe/${props.recipe_id}/update_step/${props.index}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedStep),
        }
      );

      // Throw error if response is not OK
      if (!response.ok) {
        throw new Error("Failed to update step");
      }

      // Handle success if needed
    } catch (error: any) {
      console.error("Error updating step:", error.message);
      // Handle error if needed
    }
  };

  // Handle delete click
  const handleDeleteClick = async () => {
    try {
      const response = await fetch(
        `/api/recipe/${props.recipe_id}/delete_step/${props.index}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete step");
      }
      props.onDelete(props.index);
    } catch (error: any) {
      console.error("Error deleting step:", error.message);
    }
  };

  // Render recipe step component
  return (
    <Fragment>
      <div className="step-container">
        {/* Left column contains step image and information */}
        <div className="left-col">
          <div className="step-image">
            {imageFile ? (
              <div className="image-preview">
                <div className="image-container"><img src={URL.createObjectURL(imageFile)} alt="step image" /></div>
                <button
                  onClick={handleDeleteImage}
                  className="delete-button btn"
                >
                  Delete Image
                </button>
              </div>
            ) : (
              /* If no image, display input for uploading an image */
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
          <div className="step-info">
            <div className="step-header">
              {/* Display step index and provide input for editing the title */}
              <span className="step-index">{props.index}</span>
              <input
                type="text"
                value={editedTitle}
                onChange={handleTitleChange}
                className="step-title-input"
              />
            </div>
            {/* Provide textarea for editing step detail */}
            <div className="step-body">
              <textarea
                value={editedDetail}
                onChange={handleDetailChange}
                className="step-detail-input"
              />
            </div>
          </div>
        </div>
          {/* Right column contains delete button */}
        <div className="right-col">
          <div className="delete-button-container">
            <button onClick={handleDeleteClick} className="step-button btn">
              Delete
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
// Exporting the EditRecipeStep component as the default export
export default EditRecipeStep;
