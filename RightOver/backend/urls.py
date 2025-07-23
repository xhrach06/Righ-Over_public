# Author: Matej Hrachovec, Michal Ondrejka, Dominik Truchly
#Login: xhrach06, xondre15, xtruch01
from django.urls import path
from .views import *

urlpatterns = [
    path('short_recipes', ShortRecipesDetail.as_view()),
    path('all_ingredients', AllIngredientsAPIView.as_view()),
    path('recipe/<int:recipe_id>/', RecipeDetailView.as_view()),
    path('user_recipes/', UserRecipeListView.as_view()),
    path('create_recipe/', CreateRecipeView),
    path('edit_recipe/<int:recipe_id>', RecipeUpdateView),
    path('delete_recipe/<int:recipe_id>/', DeleteRecipeView),
    path('add_my_ingredient/<int:user_id>', AddMyIngredientView),
    path('delete_my_ingredient/<int:my_ingredient_id>/<int:user_id>/', DeleteMyIngredientView),
    path('edit_my_ingredient/<int:my_ingredient_id>/<int:user_id>/', EditMyIngredientView),
    path('get_all_my_ingredients/<int:user_id>', GetAllMyIngredientsView),
    path('create_step/<int:recipe_id>', CreateStepView),
    path('recipe/<int:recipe_id>/update_step/<int:step_index>', UpdateStepView),
    path('recipe/<int:recipe_id>/delete_step/<int:step_index>', DeleteStepView),
    path('recipe/<int:recipe_id>/add_ingredient/<str:ingredient_name>', AddIngredientView),
    path('recipe/<int:recipe_id>/delete_ingredient/<int:ingredient_id>', DeleteIngredientView),
    path('add_calendar_recipe', AddCalendarRecipeView),
    path('remove_calendar_recipe/<int:calendar_recipe_id>/', RemoveCalendarRecipeView),
    path('get_all_calendar_recipes/<int:user_id>', GetAllCalendarRecipesView),
]