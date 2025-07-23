# Author: Matej Hrachovec, Michal Ondrejka, Dominik Truchly
#Login: xhrach06, xondre15, xtruch01

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

INGREDIENT_CATEGORY = [
    ("meat", "Meat"),
    ("grains", "Grains"),
    ("vegetables", "Vegetables"),
    ("fruit", "Fruit"),
    ("spices", "Spices"),
    ("alcohol", "Alcohol"),
    ("dairy", "Dairy"),
    ("other", "Other"),
]

DIFFICULTY = [
    ("easy", "Easy"),
    ("medium", "Medium"),
    ("hard", "Hard"),
]

UNITS = [
    ("g", "G"),
    ("kg", "Kg"),
    ("l", "L"),
    ("dcl", "Dcl"),
    ("ks", "Ks"),
]

class Tool(models.Model):
    name = models.CharField(max_length=20)

class User(models.Model):
    name = models.CharField(max_length=20, default="Ignác")

    tools = models.ManyToManyField(Tool, related_name='users')

class Ingredient(models.Model):
    name = models.CharField(max_length=20, unique=True)
    category = models.CharField(max_length=20, choices=INGREDIENT_CATEGORY)

class Recipe(models.Model):
    name = models.CharField(max_length=20, unique=True)
    shortDescription = models.CharField(max_length=200)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY)
    timeToPrepare = models.IntegerField()
    ecoScore = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])
    nutriScore = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])
    energy = models.IntegerField(null=True, blank=True)
    fats = models.IntegerField(null=True, blank=True)
    carbohydrates = models.IntegerField(null=True, blank=True)
    sugars = models.IntegerField(null=True, blank=True)
    protein = models.IntegerField(null=True, blank=True)
    salt = models.IntegerField(null=True, blank=True)
    tools = models.ManyToManyField(Tool, related_name='recipes', blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipes', null=True, blank=True)


class Step(models.Model):
    title = models.CharField(max_length=20, default="Unnamed Recipe")
    detail = models.CharField(max_length=200)
    index = models.IntegerField()

    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)

class RecipeIngredient(models.Model):
    quantity = models.IntegerField()
    units = models.CharField(max_length=20, choices=UNITS)

    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='recipe_ingredients')
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE, related_name='recipe_ingredients')

class UserIngredient(models.Model):
    IngredientName = models.CharField(null=True, blank=True, max_length=64)
    ammount = models.IntegerField(null=True, blank=True)
    unit = models.CharField(null = True, max_length=20, choices=UNITS)
    expiration = models.DateTimeField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_ingredients', default=1)


class CalendarRecipe(models.Model):
    recipeName = models.CharField(null=True, blank=True, max_length=64)
    recipeID = models.IntegerField(null=True, blank=True)
    userId = models.IntegerField(null=True, blank=True)
    date = models.DateTimeField(null=True, blank=True)