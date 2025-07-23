/* 
  Author: Matej Hrachovec
  Login: xhrach06
*/

// Import necessary modules and components
import { Fragment, useState, useEffect } from "react";
import NavBar from "../NavBar";
import CategoryCard from "../CategoryCard";
import SearchBar from "../SearchBar";
import MyIngredientForm from "../MyIngredientForm";
import MyIngredientCard from "../MyIngredientCard";
import "../style/AddIngredient.css";
import "../style/PantryPage.css";

// Define the structure of an Ingredient
interface Ingredient {
  id: number;
  name: string;
  category: string;
}

// Define the structure of a MyIngredient
interface MyIngredient {
  id?: number;
  IngredientName: string;
  expiration: Date;
  unit: string;
  ammount: number;
}

// Define the properties for the PantryPage component
function PantryPage() {
  // Set the CSRF token in the cookie
  document.cookie = "csrftoken=NWGxHvzEHIBma1UcsoiQ82ofLcB3ZTpc";

  // State variables
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>(
    []
  );
  const [submittedIngredients, setSubmittedIngredients] = useState<
    MyIngredient[]
  >([]);
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(
    null
  );

  // Group ingredients by category
  const groupedIngredients: Record<string, string[]> = {};
  filteredIngredients.forEach((ingredient) => {
    const { category, name } = ingredient;

    if (!groupedIngredients[category]) {
      groupedIngredients[category] = [];
    }

    groupedIngredients[category].push(name);
  });

  // Fetch all ingredients and user's submitted ingredients on component mount
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/all_ingredients")
      .then((response) => response.json())
      .then((data: Ingredient[]) => {
        setIngredients(data);
        setFilteredIngredients(data);
      })
      .catch((error) => console.error("Error fetching data:", error));

    console.log("Fetching user ingredients...");
    fetch("http://127.0.0.1:8000/api/get_all_my_ingredients/1")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setSubmittedIngredients(data.data);
      })
      .catch((error) => {
        console.error("Error fetching user's ingredients:", error);
      });
  }, []);

  // Handle click on an ingredient to add
  const handleItemClickAdd = (item: string) => {
    setSelectedIngredient(item);
  };

  // Handle search bar input change
  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    const filtered = ingredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredIngredients(filtered);
  };

  // Handle closing the ingredient form pop-up
  const handleClosePopup = () => {
    setSelectedIngredient(null);
  };

  // Handle form submission for adding a new ingredient
  const handleFormSubmit = async (
    formData: MyIngredient,
    event: React.FormEvent
  ) => {
    setSubmittedIngredients((prevIngredients) => [
      ...prevIngredients,
      formData,
    ]);

    try {
      event.preventDefault();
      const response = await fetch(
        "http://127.0.0.1:8000/api/add_my_ingredient/1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        console.error(
          "Failed to add ingredient. Server returned:",
          response.status,
          response.statusText
        );
        return;
      }

      console.log("Ingredient added successfully:", response.json());
    } catch (error) {
      console.error("Error while adding ingredient:", error);
    }

    // Close the pop-up after form submission
    handleClosePopup();
  };

  // Render the PantryPage component
  return (
    <Fragment>
      <NavBar />
      <div className="whole-page">
        <div className="top">
          <div className="container text-center pantry-page">
            <div className="row">
              <div className="col-md-5">
                <div className="my-ingredients">
                  <div className="my-ingredient-list">
                    {/* Render MyIngredientCard component */}
                    <MyIngredientCard
                      myIngredients={submittedIngredients}
                      setMyIngredients={setSubmittedIngredients}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="add-ingredient">
                  <div className="heading">
                    <h2>Add Ingredient</h2>
                  </div>
                  <div className="searchbar">
                    {/* Render SearchBar component */}
                    <SearchBar onSearch={handleSearchChange} />
                  </div>
                  <div className="categories">
                    {Object.entries(groupedIngredients).map(
                      ([category, ingredientNames]) => (
                        /* Render CategoryCard component */
                        <CategoryCard
                          key={category}
                          CategoryName={category}
                          Ingredients={ingredientNames}
                          onItemClick={handleItemClickAdd}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Render MyIngredientForm component if an ingredient is selected */}
        {selectedIngredient && (
          <MyIngredientForm
            isVisible={true}
            onClose={handleClosePopup}
            onFormSubmit={handleFormSubmit}
            IngredientName={selectedIngredient}
          />
        )}
      </div>
    </Fragment>
  );
}

// Export the PantryPage component
export default PantryPage;
