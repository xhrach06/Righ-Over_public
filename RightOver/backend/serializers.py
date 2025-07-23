# Author: Matej Hrachovec, Michal Ondrejka, Dominik Truchly
#Login: xhrach06, xondre15, xtruch01
from rest_framework import serializers
from .models import *

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('id', 'name', 'category')

class RecipeIngredientSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer()

    class Meta:
        model = RecipeIngredient
        fields = ('quantity', 'units', 'ingredient')

class ToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tool
        fields = ('id', 'name')

class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = ('title', 'detail', 'index')

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = RecipeIngredientSerializer(many=True, source='recipe_ingredients.all')
    steps = StepSerializer(many=True, source='step_set.all')  
    tools = ToolSerializer(many=True)

    class Meta:
        model = Recipe
        fields = [
            'id', 'name', 'shortDescription', 'difficulty', 'timeToPrepare', 'ecoScore', 'nutriScore',
            'energy', 'fats', 'carbohydrates', 'sugars', 'protein', 'salt', 'ingredients', 'steps', 'tools'
        ]

class ShortRecipeSerializer(serializers.ModelSerializer):
    ingredients = RecipeIngredientSerializer(many=True, source='recipe_ingredients.all')

    class Meta:
        model = Recipe
        fields = [
            'id', 'name', 'shortDescription', 'difficulty', 'timeToPrepare', 'ecoScore', 'nutriScore',
            'ingredients'
        ]
        
class UserIngredientSerializer(serializers.ModelSerializer):
    expiration = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S")

    class Meta:
        model = UserIngredient
        fields = ['IngredientName', 'id', 'ammount', 'unit', 'expiration']

class CalendarRecipeSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S")

    class Meta:
        model = CalendarRecipe
        fields = ['id','recipeName','recipeID','userId','date']