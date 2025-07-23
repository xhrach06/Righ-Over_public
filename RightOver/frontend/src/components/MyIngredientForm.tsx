/* 
  Author: Matej Hrachovec
  Login: xhrach06
*/

import React, { useState, useEffect } from "react";
import "./style/MyIngredientForm.css";

interface MyIngredient {
  id?: number;
  IngredientName: string;
  expiration: Date;
  unit: string;
  ammount: number;
}

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onFormSubmit: (formData: MyIngredient, event: React.FormEvent) => void;
  IngredientName: string;
  initialData?: MyIngredient;
}

const MyIngredientForm = ({
  isVisible,
  onClose,
  onFormSubmit,
  IngredientName,
  initialData,
}: Props) => {
  // State to manage form data
  const [formData, setFormData] = useState<MyIngredient>({
    IngredientName,
    expiration: new Date(),
    unit: "",
    ammount: 0,
  });

  // Update form data when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData((prevData) => ({
        ...prevData,
        ...initialData,
        expiration: new Date(initialData.expiration),
      }));
    }
  }, [initialData]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle date input change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const dateValue = /^\d{4}-\d{2}-\d{2}$/.test(value)
      ? new Date(value)
      : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: dateValue,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    onFormSubmit(formData, e);
    onClose();
  };

  // Render the MyIngredientForm component
  return isVisible ? (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="heading">
          <h2>Edit Ingredient</h2>
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
            Expiration Date:
            <input
              type="date"
              name="expiration"
              value={formData.expiration.toISOString().split("T")[0]}
              onChange={handleDateChange}
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
            <button type="submit">Submit</button>
            <button onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default MyIngredientForm;
