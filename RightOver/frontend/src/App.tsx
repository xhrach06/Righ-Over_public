/* Author: Matej Hrachovec
Login: xhrach06 */
import { Routes, Route } from "react-router-dom";
import PantryPage from "./components/pages/PantryPage";
import CalendarPage from "./components/pages/CalendarPage";
import RecipePage from "./components/pages/RecipePage";
import RecipesPage from "./components/pages/RecipesPage";
import ProfilePage from "./components/pages/ProfilePage";
import EditRecipePage from "./components/pages/EditRecipePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RecipesPage />} />
        <Route path="/pantry" element={<PantryPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/recipe/:recipe_id" element={<RecipePage />} />
        <Route path="/edit_recipe/:recipe_id" element={<EditRecipePage />} />
      </Routes>
    </>
  );
}

export default App;
