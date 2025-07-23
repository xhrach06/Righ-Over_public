# Author:  Michal Ondrejka
#Login:  xondre15

from django.contrib import admin
from .models import Tool, User, Ingredient, Recipe, Step, RecipeIngredient, UserIngredient

@admin.register(Tool)
class ToolAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'difficulty', 'timeToPrepare', 'ecoScore', 'nutriScore')
    list_filter = ('difficulty', 'user')

@admin.register(Step)
class StepAdmin(admin.ModelAdmin):
    list_display = ('title', 'recipe', 'index')

@admin.register(RecipeIngredient)
class RecipeIngredientAdmin(admin.ModelAdmin):
    list_display = ('quantity', 'units', 'recipe', 'ingredient')

@admin.register(UserIngredient)
class UserIngredientAdmin(admin.ModelAdmin):
    list_display = ('ammount', 'unit', 'expiration', 'user')
