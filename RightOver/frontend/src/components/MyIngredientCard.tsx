/* Author: Matej Hrachovec
Login: xhrach06 */
import { useState, useEffect } from "react";
import MyIngredientRow from "./MyIngredientRow";
import "./style/MyIngredientCard.css";

// Define the structure of a MyIngredient
interface MyIngredient {
  id?: number;
  IngredientName: string;
  expiration: Date;
  unit: string;
  ammount: number;
}

// Define the properties for the MyIngredientCard component
interface Props {
  myIngredients: MyIngredient[];
  setMyIngredients: React.Dispatch<React.SetStateAction<MyIngredient[]>>;
}

// Define the MyIngredientCard functional component
function MyIngredientCard({ myIngredients, setMyIngredients }: Props) {
  const handleEdit = (editedIngredient: MyIngredient) => {
    console.log("Edited ingredient:", editedIngredient);
  };
  // Handle deletion of an ingredient
  const handleDelete = async (deletedIngredient: MyIngredient) => {
    try {
      // Send a DELETE request to the server
      console.log("Deleting ingredient with ID:", deletedIngredient.id);

      const response = await fetch(
        `http://127.0.0.1:8000/api/delete_my_ingredient/${deletedIngredient.id}/1`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(deletedIngredient),
        }
      );
      // Check if the deletion was successful
      if (!response.ok) {
        throw new Error("Failed to delete ingredient");
      }

      console.log("Ingredient deleted successfully ", response.body);
    } catch (error: any) {
      console.error("Error deleting ingredient:", error.message);
    }

    // Update the state to remove the deleted ingredient
    console.log("Deleted ingredient:", deletedIngredient);
    setMyIngredients((prevMyIngredients) =>
      prevMyIngredients.filter(
        (ingredient) =>
          ingredient.IngredientName !== deletedIngredient.IngredientName
      )
    );
  };

  return (
    <div className="my-ingredient-card">
      <div className="heading">
        <h2>My Ingredients</h2>
      </div>
      {myIngredients.map((ingredient, index) => (
        <MyIngredientRow
          key={ingredient.id}
          ingredient={ingredient}
          onDelete={() => handleDelete(ingredient)}
        />
      ))}
    </div>
  );
}

export default MyIngredientCard;
