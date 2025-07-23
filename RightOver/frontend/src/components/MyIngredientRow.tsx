/* Author: Matej Hrachovec
Login: xhrach06 */
import React, { useState } from "react";
import "./style/MyIngredientRow.css";
import MyIngredientForm from "./MyIngredientForm";

interface MyIngredient {
  id?: number;
  IngredientName: string;
  expiration: Date;
  unit: string;
  ammount: number;
}

interface Props {
  ingredient: MyIngredient;
  onDelete: () => void;
}

function MyIngredientRow({ ingredient, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    onDelete();
  };

  const handleCloseForm = () => {
    setIsEditing(false);
  };

  const handleFormSubmit = async (formData: MyIngredient) => {
    // Update the original ingredient with the submitted data
    ingredient.IngredientName = formData.IngredientName;
    ingredient.ammount = formData.ammount;
    ingredient.unit = formData.unit;
    ingredient.expiration = formData.expiration;
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/edit_my_ingredient/${ingredient.id}/1/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        console.error(
          "Failed to edit ingredient. Server returned:",
          response.status,
          response.statusText
        );
        return;
      }

      console.log("Ingredient edited successfully:", response.json());
    } catch (error) {
      console.error("Error editing ingredient:", error);
    }
    handleCloseForm();
  };

  return (
    <div className="my-ingredient-row">
      <div className="my-ingredient-info">
        <ul>
          <li>{ingredient.IngredientName}</li>
          <li>
            {ingredient.ammount} {ingredient.unit}
          </li>
          <li>
            {ingredient.expiration instanceof Date
              ? ingredient.expiration.toDateString()
              : ingredient.expiration}
          </li>
        </ul>
      </div>
      <div className="buttons">
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
      {isEditing && (
        <MyIngredientForm
          isVisible={true}
          onClose={handleCloseForm}
          onFormSubmit={handleFormSubmit}
          IngredientName={ingredient.IngredientName}
          initialData={ingredient}
        />
      )}
    </div>
  );
}

export default MyIngredientRow;
