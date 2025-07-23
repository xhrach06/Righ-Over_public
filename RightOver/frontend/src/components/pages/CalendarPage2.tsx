/* Author: Matej Hrachovec
Login: xhrach06 */

import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../NavBar";
import Calendar from "react-calendar";
import "../style/CalendarPage.css";
import CalendarRecipePopUp from "../CalendarRecipePopUp";
import CalendarRecipe from "../CalendarRecipe";
import CategoryCard from "../CategoryCard";

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

function CalendarPage() {
  const [forceUpdate, setForceUpdate] = useState<boolean>(false);
  const [popUpIsVisible, setPopUpVisible] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [clickedRecipes, setClickedRecipes] = useState<
    Record<string, CalendarRecipe[]>
  >({});

  const onClickDay = (value?: Date) => {
    setSelectedDay(value || null);
    setPopUpVisible(!!value);
  };

  const onRecipeClick = async (recipe: Recipe) => {
    if (selectedDay) {
      const calendarRecipe: CalendarRecipe = {
        id: recipe.id,
        recipeName: recipe.name,
        recipeID: recipe.id,
        userId: 1, 
        date: selectedDay,
      };
      try {
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
        if (!response.ok) {
          console.error(
            "Failed to add recipe to calendar. Server returned:",
            response.status,
            response.statusText
          );
          return;
        }
        console.log("recipe to calendar added successfully:", response.json());
      } catch (error) {
        console.error("Error while adding recipe:", error);
      }

      setClickedRecipes((prevClickedRecipes) => {
        const dateISOString = selectedDay.toISOString();
        const existingRecipes = prevClickedRecipes[dateISOString] || [];
        console.log("on recipe click", dateISOString);
        return {
          ...prevClickedRecipes,
          [dateISOString]: [...existingRecipes, calendarRecipe],
        };
      });
    }
    setPopUpVisible(!popUpIsVisible);
  };

  useEffect(() => {
    console.log("fetching calendar recipes...");
    fetch("http://127.0.0.1:8000/api/get_all_calendar_recipes/1")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const calendarRecipes = data.data;
        const initialClickedRecipes: Record<string, CalendarRecipe[]> = {};
        calendarRecipes.forEach((recipe: CalendarRecipe) => {
          const dateObject = new Date(recipe.date);
          const dateISOString = dateObject.toISOString();

          if (!initialClickedRecipes[dateISOString]) {
            initialClickedRecipes[dateISOString] = [];
          }

          initialClickedRecipes[dateISOString].push({
            ...recipe,
            date: dateObject,
          });
        });
        setClickedRecipes(initialClickedRecipes);
        const dateArray = Object.keys(initialClickedRecipes);
        dateArray.forEach((date) => {
          const ddate = new Date(date);
        });
      })
      .catch((error) => {
        console.error("Error fetching user's ingredients:", error);
      });
  }, [forceUpdate]);

  const tileClassName = ({ date }: any) => {
    const modifiedDate = new Date(date);
    modifiedDate.setHours(23, 0, 0, 0);

    return modifiedDate.toISOString();
  };

  const tileContentRenderer = ({ date }: any) => {
    const dateISOString = date.toISOString();
    const recipesForDay = clickedRecipes[dateISOString];

    return (
      <div className={`${dateISOString} tile-content`}>
        {recipesForDay &&
          recipesForDay.map((recipe, index) => (
            <div key={index} style={{ fontSize: "12px", textAlign: "center" }}>
              {recipe.recipeName}
            </div>
          ))}
      </div>
    );
  };

  useEffect(() => {
    console.log(clickedRecipes);
  });

  return (
    <div className="calendar-page">
      <NavBar />
      <CalendarRecipePopUp
        isVisible={popUpIsVisible}
        setIsVisible={() => setPopUpVisible(false)}
        onRecipeClick={onRecipeClick}
      />
      <div className="calendar-main">
        <Calendar
          className="main-calendar"
          onClickDay={onClickDay}
          tileContent={tileContentRenderer}
          tileClassName={tileClassName}
        />
      </div>
      <div className="recipes">
        {Object.entries(clickedRecipes).map(([date, recipes]) => (
          <CategoryCard
            key={date}
            CategoryName={date}
            Ingredients={recipes.map((recipe) => recipe.recipeName)}
          />
        ))}
      </div>
    </div>
  );
}

export default CalendarPage;

