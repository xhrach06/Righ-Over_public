/* Author: Michal Ondrejka
Login: xondre15 */

// Importing React and FC (Functional Component) from React
import React, { FC, useState, useEffect } from "react";

// Interface representing the structure of an ingredient
interface MyIngredient {
  id?: number;
  IngredientName: string;
  unit: string;
  ammount: number;
}

// Interface representing the properties that the component receives
interface Props {
  recipe_id: number;
  ingredient_name: string;
  show: boolean;
  onClose: () => void;
}

// Functional Component for the Ingredient Form Popup
const IngredientFormPopup: FC<Props> = ({
  show,
  onClose,
  ingredient_name,
  recipe_id,
}) => {
  // State to manage form data for the ingredient
  const [formData, setFormData] = useState<MyIngredient>({
    IngredientName: "",
    unit: "",
    ammount: 0,
  });

  // useEffect to update the ingredient name when it changes
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      IngredientName: ingredient_name,
    }));
  }, [ingredient_name]);

  // If 'show' is false, do not render anything (hide the popup)
  if (!show) {
    return null;
  }

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // API URL for adding an ingredient to a recipe
      const apiUrl = `http://127.0.0.1:8000/api/recipe/${recipe_id}/add_ingredient/${ingredient_name}`;

      // Sending a POST request to add the ingredient
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredientName: formData.IngredientName,
          unit: formData.unit,
          amount: formData.ammount,
        }),
      });

      // Checking if the request was successful
      if (response.ok) {
        console.log("Ingredient added successfully");
        onClose(); // Closing the popup
      } else {
        console.error("Failed to add ingredient");
      }
    } catch (error) {
      console.error("An error occurred while adding the ingredient:", error);
    }
  };

  // Function to handle changes in form input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // JSX structure for rendering the Ingredient Form Popup
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="heading">
          <h2>Add Ingredient</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Ingredient Name:
            <input
              type="text"
              name="IngredientName"
              value={formData.IngredientName}
              readOnly
            />
          </label>
          <br />
          <label>
            Unit:
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Amount:
            <input
              type="number"
              name="ammount"
              value={formData.ammount}
              onChange={handleChange}
            />
          </label>
          <br />
          <div className="buttons">
            <button type="submit">Add</button>
            <button onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Exporting the IngredientFormPopup component as the default export
export default IngredientFormPopup;
