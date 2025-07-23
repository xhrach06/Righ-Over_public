import random
from django.core.management.base import BaseCommand
from backend.models import Ingredient, Tool, Recipe, RecipeIngredient, User
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Seed the database with basic data'

    def handle(self, *args, **options):
        self.stdout.write("Seeding the database with basic data...")

        # Define your ingredient categories
        INGREDIENT_CATEGORY = [
            ('category1', 'Category 1'),
            ('category2', 'Category 2'),
            # Add more categories as needed
        ]

        # Define your difficulty choices
        DIFFICULTY = [
            ('Easy', 'Easy'),
            ('Medium', 'Medium'),
            ('Hard', 'Hard'),
        ]

        # Define your units choices
        UNITS = [
            ('g', 'Grams'),
            ('ml', 'Milliliters'),
            # Add more units as needed
        ]

        # Function to create ingredients
        def create_ingredients():
            ingredients = []
            for i in range(1, 51):
                while True:
                    name = f'Ing_{i}'
                    category = random.choice(INGREDIENT_CATEGORY)[0]

                    # Check if the name already exists
                    if not Ingredient.objects.filter(name=name).exists():
                        ingredient = Ingredient(name=name, category=category)
                        ingredient.save()
                        ingredients.append(ingredient)
                        self.stdout.write(f'Ingredient {name} created successfully.')
                        break  # Exit the loop if the ingredient is created successfully
                    else:
                        i += 1  # Increment i and try again with a new name

            return ingredients

        # Function to create tools
        def create_tools():
            tools = []
            for i in range(1, 6):
                name = f'Tool_{i}'
                tool = Tool(name=name)
                tool.save()
                tools.append(tool)
                self.stdout.write(f'Tool {name} created successfully.')
            return tools

        # Function to create sample user
        def create_sample_user():
            user = User(name="Matej")
            user.save()
            return user

        # Function to create recipes
        def create_sample_recipes(ingredients, tools, user):
            # Create a sample user
            
            recipes = []
            for i in range(1, 6):
                recipe = Recipe.objects.create(
                    name=f'Recipe_{i}',
                    shortDescription=f'Short description for Recipe {i}',
                    difficulty=random.choice(DIFFICULTY)[0],
                    timeToPrepare=random.randint(10, 120),
                    ecoScore=random.randint(1, 5),
                    nutriScore=random.randint(1, 5),
                    energy=random.randint(100, 1000),
                    fats=random.randint(5, 50),
                    carbohydrates=random.randint(20, 100),
                    sugars=random.randint(0, 20),
                    protein=random.randint(5, 30),
                    salt=random.randint(0, 10),
                    user=user
                )

                # Add random tools to the recipe
                recipe.tools.set(random.sample(tools, random.randint(1, 3)))

                # Add random ingredients with quantities and units to the recipe
                for _ in range(3):
                    ingredient = random.choice(ingredients)
                    quantity = random.randint(50, 500)
                    units = random.choice(UNITS)[0]
                    RecipeIngredient.objects.create(
                        recipe=recipe,
                        ingredient=ingredient,
                        quantity=quantity,
                        units=units
                    )

                recipes.append(recipe)
                self.stdout.write(f'Recipe {recipe.name} created successfully.')
            return recipes

        # Call the functions to create hardcoded data
        ingredients = create_ingredients()
        tools = create_tools()
        user = create_sample_user()
        create_sample_recipes(ingredients, tools, user)

        self.stdout.write(self.style.SUCCESS('Data seeding complete.'))
