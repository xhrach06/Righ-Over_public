/* Author: Matej Hrachovec
Login: xhrach06 */
// Import necessary modules and components
import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../NavBar";
import Calendar from "react-calendar";
import "../style/CalendarPage.css";
import CalendarRecipePopUp from "../CalendarRecipePopUp";
import CalendarRecipe from "../CalendarRecipe";
import CategoryCard from "../CalendarCategoryCard";

// Define interfaces for Ingredient, Recipe, and CalendarRecipe
interface Ingredient {
  quantity: number;
  units: string;
  ingredient: {
    id: number;
    name: string;
    category: string;
  };
}

interface Recipe {
  id: number;
  name: string;
  shortDescription: string;
  difficulty: number;
  timeToPrepare: number;
  ecoScore: number;
  nutriScore: number;
  ingredients: Ingredient[];
}

interface CalendarRecipe {
  id: number;
  recipeName: string;
  recipeID: number;
  userId: number;
  date: Date;
}

// Define the CalendarPage functional component
function CalendarPage() {
  // State variables
  const [forceUpdate, setForceUpdate] = useState<boolean>(false);
  const [popUpIsVisible, setPopUpVisible] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [clickedRecipes, setClickedRecipes] = useState<
    Record<string, CalendarRecipe[]>
  >({});

  // Handle click on a calendar day
  const onClickDay = (value?: Date) => {
    setSelectedDay(value || null);
    setPopUpVisible(!!value);
  };

  // Utility function to introduce delay
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Handle click on a recipe to add it to the calendar
  const onRecipeClick = async (recipe: Recipe) => {
    // Ensure a day is selected
    if (selectedDay) {
      // Adjust the selected day
      selectedDay.setDate(selectedDay.getDate() + 1);
      selectedDay.setHours(selectedDay.getHours() - 1);

      // Create a CalendarRecipe object
      const calendarRecipe: CalendarRecipe = {
        id: recipe.id,
        recipeName: recipe.name,
        recipeID: recipe.id,
        userId: 1,
        date: selectedDay,
      };

      // Update the clicked recipes state
      setClickedRecipes((prevClickedRecipes) => {
        const dateISOString = selectedDay.toISOString();
        const existingRecipes = prevClickedRecipes[dateISOString] || [];
        return {
          ...prevClickedRecipes,
          [dateISOString]: [...existingRecipes, calendarRecipe],
        };
      });

      try {
        // Send a request to add the recipe to the calendar
        const response = await fetch(
          "http://127.0.0.1:8000/api/add_calendar_recipe",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(calendarRecipe),
          }
        );

        // Handle response
        if (!response.ok) {
          console.error(
            "Failed to add recipe to calendar. Server returned:",
            response.status,
            response.statusText
          );
          return;
        }

        console.log("Recipe added to calendar successfully:", response.json());
      } catch (error) {
        console.error("Error while adding recipe:", error);
      }
    }

    // Close the recipe pop-up, fetch data, and introduce a delay
    setPopUpVisible(!popUpIsVisible);
    fetchData();
    await delay(1000);
  };

  // Handle click to remove a recipe from the calendar
  const handleItemClickRemove = async (date: string, recipeName: string) => {
    try {
      // Retrieve recipes for the selected date
      const recipesForDate = clickedRecipes[date];
      const recipeToRemove = recipesForDate.find(
        (recipe) => recipe.recipeName === recipeName
      );

      if (!recipeToRemove) {
        return;
      }

      // Send a request to remove the recipe from the calendar
      const response = await fetch(
        `http://127.0.0.1:8000/api/remove_calendar_recipe/${recipeToRemove.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(recipeToRemove),
        }
      );

      // Handle response
      if (!response.ok) {
        // Update state and log error if removal fails
        setClickedRecipes((prevClickedRecipes) => {
          const updatedRecipes = recipesForDate.filter(
            (recipe) => recipe.recipeName !== recipeName
          );

          if (updatedRecipes.length === 0) {
            const { [date]: removedDate, ...remainingRecipes } =
              prevClickedRecipes;
            return remainingRecipes;
          }

          return {
            ...prevClickedRecipes,
            [date]: updatedRecipes,
          };
        });

        console.error(
          "Failed to remove recipe from calendar. Server returned:",
          response.status,
          response.statusText
        );
        return;
      }

      console.log("Recipe removed successfully:", response.json());

      // Update state after successful removal
      setClickedRecipes((prevClickedRecipes) => {
        const updatedRecipes = recipesForDate.filter(
          (recipe) => recipe.recipeName !== recipeName
        );

        if (updatedRecipes.length === 0) {
          const { [date]: removedDate, ...remainingRecipes } =
            prevClickedRecipes;
          return remainingRecipes;
        }

        return {
          ...prevClickedRecipes,
          [date]: updatedRecipes,
        };
      });
    } catch (error: any) {
      console.error("Error removing recipe:", error.message);

      // Handle error and update state
      const recipesForDate = clickedRecipes[date];
      const recipeToRemove = recipesForDate.find(
        (recipe) => recipe.recipeName === recipeName
      );

      setClickedRecipes((prevClickedRecipes) => {
        const updatedRecipes = recipesForDate.filter(
          (recipe) => recipe.recipeName !== recipeName
        );

        if (updatedRecipes.length === 0) {
          const { [date]: removedDate, ...remainingRecipes } =
            prevClickedRecipes;
          return remainingRecipes;
        }

        return {
          ...prevClickedRecipes,
          [date]: updatedRecipes,
        };
      });
    }
  };
  // fetching data from database
  const fetchData = async () => {
    try {
      console.log("fetching calendar recipes...");
      const response = await fetch(
        "http://127.0.0.1:8000/api/get_all_calendar_recipes/1"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const calendarRecipes = data.data;
      const initialClickedRecipes: Record<string, CalendarRecipe[]> = {};
      const today = new Date();

      calendarRecipes.forEach((recipe: CalendarRecipe) => {
        const dateObject = new Date(recipe.date);
        dateObject.setHours(dateObject.getHours() + 1);
        const dateISOString = dateObject.toISOString();

        if (today <= dateObject) {
          initialClickedRecipes[dateISOString] =
            initialClickedRecipes[dateISOString] || [];

          initialClickedRecipes[dateISOString].push({
            ...recipe,
            date: dateObject,
          });
        }
      });

      setClickedRecipes(initialClickedRecipes);
    } catch (error) {
      console.error("Error fetching calendar recipes:", error);
    }
  };
  //initial fetch
  useEffect(() => {
    fetchData();
  }, []);
  // custom tiles for styling
  const tileClassName = ({ date }: any) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentDate = new Date(date);
    const currentDate2 = new Date(currentDate.setHours(23, 0, 0, 0));
    currentDate.setHours(0, 0, 0, 0);
    const dateISOString = currentDate.toISOString();

    let className = "";

    if (currentDate.toISOString() === today.toISOString()) {
      className = "today-day";
    } else if (currentDate > today) {
      className = "future-day";
    } else {
      className = "past-day";
    }
    const dateISOString2 = currentDate2.toISOString();
    const recipesForDay = clickedRecipes[dateISOString2] || [];
    if (recipesForDay.length > 0) {
      className += " has-recipe";
    }

    return className;
  };

  return (
    <div className="calendar-page">
      <NavBar />
      <CalendarRecipePopUp
        isVisible={popUpIsVisible}
        setIsVisible={() => setPopUpVisible(false)}
        onRecipeClick={onRecipeClick}
      />
      <div className="main">
        <div className="calendar-main">
          <div className="heading">
            <h2>Pick a day!</h2>
          </div>
          <Calendar
            className="main-calendar"
            onClickDay={onClickDay}
            tileClassName={tileClassName}
          />
        </div>
        <div className="devider" />
        <div className="my-recipes">
          <div className="heading">
            <h2>My Recipes</h2>
          </div>
          <div className="recipes">
            {Object.entries(clickedRecipes)
              .sort(
                ([dateA], [dateB]) =>
                  new Date(dateA).getTime() - new Date(dateB).getTime()
              )
              .map(([date, recipes]) => (
                <CategoryCard
                  key={date}
                  CategoryName={date}
                  Ingredients={recipes.map((recipe) => recipe.recipeName)}
                  onRecipeClick={handleItemClickRemove}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
