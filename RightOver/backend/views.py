from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt


# Author: Dominik Truchly
# login: xtruch01
class ShortRecipesDetail(generics.ListAPIView):
    queryset = Recipe.objects.all()
    serializer_class = ShortRecipeSerializer

# Author: Dominik Truchly
# login: xtruch01
class RecipeDetailView(APIView):
    def get(self, request, recipe_id):
        try:
            recipe = Recipe.objects.get(pk=recipe_id)
        except Recipe.DoesNotExist:
            return Response({'error': 'Recipe not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = RecipeSerializer(recipe)
        return Response(serializer.data)

# Author: Dominik Truchly
# login: xtruch01
class AllIngredientsAPIView(APIView):
    def get(self, request, format=None):
        ingredients = Ingredient.objects.all()
        serializer = IngredientSerializer(ingredients, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Author: Michal Ondrejka
# login: xondre15
class UserRecipeListView(generics.ListAPIView):
    serializer_class = RecipeSerializer

    def get_queryset(self):
        user = User.objects.filter().first()  

        new_recipe = Recipe.objects.filter(user=user, name="New Recipe").first()
        other_recipes = Recipe.objects.filter(user=user).exclude(name="New Recipe")

        if new_recipe:
            queryset = [new_recipe] + list(other_recipes)
        else:
            queryset = list(other_recipes)

        return queryset


# Author: Michal Ondrejka
# login: xondre15
@csrf_exempt
def CreateRecipeView(request):
    if Recipe.objects.filter(name="New Recipe").exists():
        return JsonResponse({'message': 'Empty recipe already exists, edit the existing one in order to create new', 'type': 'warning', 'recipe_id': -1})
    else:
        if User.objects.filter().exists():
            user = User.objects.filter().first()
        else:
            user = User.objects.create()
            user.save()
        empty_recipe = Recipe.objects.create(
                user=user,
                name="New Recipe",
                shortDescription="New empty recipe description",
                difficulty=DIFFICULTY[0][0],  
                timeToPrepare=0,  
                ecoScore=1,
                nutriScore=1,
            )
        
        empty_recipe.save()
        return JsonResponse({'message': 'Empty recipe created successfully, you can now edit it', 'type': 'success', 'recipe_id': empty_recipe.id})


# Author: Michal Ondrejka, Dominik Truchly
# login: xondre15, xtruch01
@csrf_exempt
def RecipeUpdateView(request, recipe_id):
    if Recipe.objects.filter(id=recipe_id).exists():
        recipe = Recipe.objects.filter(id=recipe_id).first()
        data = json.loads(request.body)
        recipe.name = data.get('name', recipe.name)
        recipe.shortDescription = data.get('shortDescription', recipe.shortDescription)
        difficulty = data.get('difficulty', recipe.difficulty)
        if difficulty in ["easy", "medium", "hard"]:
            recipe.difficulty = difficulty
        recipe.timeToPrepare = data.get('timeToPrepare', recipe.timeToPrepare)
        recipe.ecoScore = data.get('ecoScore', recipe.ecoScore)
        recipe.nutriScore = data.get('nutriScore', recipe.nutriScore)

        recipe.energy = data.get('energy', recipe.energy)
        recipe.fats = data.get('fats', recipe.fats)
        recipe.carbohydrates = data.get('carbohydrates', recipe.carbohydrates)
        recipe.sugars = data.get('sugars', recipe.sugars)
        recipe.protein = data.get('protein', recipe.protein)
        recipe.salt = data.get('salt', recipe.salt)

        recipe.save()
        return JsonResponse({'message': 'Recipe updated successfully'})
    else:
        return JsonResponse({'message': 'Recipe with such id does not exist'})


# Author: Michal Ondrejka
# login: xondre15
@csrf_exempt
def DeleteRecipeView(request, recipe_id):
    try:
        recipe = Recipe.objects.get(id=recipe_id)
        recipe.delete()
        return JsonResponse({'message': 'Recipe deleted successfully'})
    except Recipe.DoesNotExist:
        return JsonResponse({'error': 'Recipe not found'}, status=404)

# Author: Matej Hrachovec
#Login: xhrach06 
@csrf_exempt
def AddMyIngredientView(request, user_id):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('IngredientName')
        ammount = data.get('ammount')
        unit = data.get('unit')
        expiration = data.get('expiration')

        try:
            user = User.objects.get(id=user_id)
            user_ingredient = UserIngredient.objects.create(
                IngredientName=name,
                user=user,
                ammount=ammount,
                unit=unit,
                expiration=expiration
            )
            user_ingredient.save()

            serializer = UserIngredientSerializer(user_ingredient)
            return JsonResponse({'message': 'MyIngredient added successfully', 'data': serializer.data}, status=201)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

# Author: Matej Hrachovec
#Login: xhrach06 
@csrf_exempt
def DeleteMyIngredientView(request, my_ingredient_id, user_id):
    if request.method == 'DELETE':
        try:
            user_ingredient = UserIngredient.objects.get(id=my_ingredient_id, user_id=user_id)
            user_ingredient.delete()
            return JsonResponse({'message': 'MyIngredient deleted successfully'}, status=200)
        except UserIngredient.DoesNotExist:
            return JsonResponse({'error': 'MyIngredient not found'}, status=404)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

# Author: Matej Hrachovec
#Login: xhrach06 
@csrf_exempt
def EditMyIngredientView(request, my_ingredient_id, user_id):
    if request.method == 'PUT':
        try:
            user_ingredient = UserIngredient.objects.get(id=my_ingredient_id, user_id=user_id)
            data = json.loads(request.body)
            user_ingredient.IngredientName = data.get('IngredientName', user_ingredient.IngredientName)
            user_ingredient.ammount = data.get('quantity', user_ingredient.ammount)
            user_ingredient.unit = data.get('unit', user_ingredient.unit)
            user_ingredient.expiration = data.get('expiration', user_ingredient.expiration)
            user_ingredient.save()
            serializer = UserIngredientSerializer(user_ingredient)
            return JsonResponse({'message': 'MyIngredient updated successfully', 'data': serializer.data}, status=200)
        except UserIngredient.DoesNotExist:
            return JsonResponse({'error': 'MyIngredient not found'}, status=404)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

# Author: Matej Hrachovec
#Login: xhrach06 
@csrf_exempt
def GetAllMyIngredientsView(request, user_id):
    if request.method == 'GET':
        try:
            user = User.objects.get(id=user_id)
            user_ingredients = UserIngredient.objects.filter(user=user)
            serializer = UserIngredientSerializer(user_ingredients, many=True)
            return JsonResponse({'data': serializer.data}, status=200)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

# Author: Dominik Truchly
#Login: xtruch01 
@csrf_exempt
def CreateStepView(request, recipe_id):
    if request.method == "POST":
        if Recipe.objects.filter(id=recipe_id).exists():
            data = json.loads(request.body)
            title = data.get('title', "Set title")
            detail = data.get('detail', "Set step detail")
            query = Step.objects.filter(recipe_id=recipe_id)
            if query.exists():
                largest_index = query.order_by('-index').first().index + 1
            else:
                largest_index = 1
            recipe = Recipe.objects.filter(id=recipe_id).first()
            new_step = Step.objects.create(title=title, detail=detail, index=largest_index, recipe=recipe)
            new_step.save()

            response_data = {
                'message': 'Recipe succesfully added',
                'id': new_step.id,
                'title': new_step.title,
                'detail': new_step.detail,
                'index': new_step.index,
            }

            return JsonResponse(response_data, status=201)
        else:
            return JsonResponse({'error': 'Recipe does not exist'}, status=405)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

# Author: Dominik Truchly
#Login: xtruch01 
@csrf_exempt
def UpdateStepView(request, recipe_id, step_index):
    if request.method == "PUT":
        query = Step.objects.filter(recipe_id=recipe_id, index=step_index)
        if query.exists():
            step = query.first()
            data = json.loads(request.body)
            title = data.get('title', '')
            detail = data.get('detail', '')
            step.title = title
            step.detail = detail
            step.save()
            return JsonResponse({'message': 'Step succesfully updated'}, status=200)
        else:
            return JsonResponse({'error': 'Step does not exist'}, status=405)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

# Author: Dominik Truchly
#Login: xtruch01 
@csrf_exempt
def DeleteStepView(request, recipe_id, step_index):
    if request.method == "DELETE":
        query = Step.objects.filter(recipe_id=recipe_id, index=step_index)
        if query.exists():
            query.first().delete()
            remaining_steps = Step.objects.filter(recipe_id=recipe_id, index__gt=step_index) 
            for step in remaining_steps:
                step.index -= 1
                step.save()
            return JsonResponse({'message': 'Step deleted succesfully'}, status=200)
        else:
            return JsonResponse({'error': 'Step does not exist'}, status=405)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

# Author: Michal Ondrejka
#Login: xondre15 
@csrf_exempt
def AddIngredientView(request, recipe_id, ingredient_name):
    if request.method == "POST":
        recipe_query = Recipe.objects.filter(id=recipe_id)
        ingredient_query = Ingredient.objects.filter(name=ingredient_name)
        if recipe_query.exists() and ingredient_query.exists():
            recipe = recipe_query.first()
            ingredient = ingredient_query.first()
            data = json.loads(request.body)
            unit = data.get('unit', '')
            amount = data.get('amount', 0)

            if unit not in dict(UNITS):
                return JsonResponse({'error': 'Invalid unit'}, status=400)

            recipe_ingredient, created = RecipeIngredient.objects.get_or_create(
                recipe=recipe,
                ingredient=ingredient,
                defaults={'quantity': amount, 'units': unit}
            )
            
            if not created:
                recipe_ingredient.quantity = amount
                recipe_ingredient.units = unit
                recipe_ingredient.save()

            return JsonResponse({'message': 'Ingredient added to recipe succesfully'}, status=200)
        else:
            return JsonResponse({'error': 'Recipe or ingredient does not exist'}, status=405)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

# Author: Michal Ondrejka
#Login: xondre15 
@csrf_exempt
def DeleteIngredientView(request, recipe_id, ingredient_id):
    recipe_query = Recipe.objects.filter(id=recipe_id)
    ingredient_query = Ingredient.objects.filter(id=ingredient_id)
    if recipe_query.exists() and ingredient_query.exists():
        recipe = recipe_query.first()
        ingredient = ingredient_query.first()

        recipe_ingredient_query = RecipeIngredient.objects.filter(recipe=recipe, ingredient=ingredient)
        
        if recipe_ingredient_query.exists():
            recipe_ingredient_query.delete()
            return JsonResponse({'message': 'Ingredient deleted from recipe successfully'}, status=200)
        else:
            return JsonResponse({'error': 'Ingredient not found in recipe'}, status=404)
    else:
        return JsonResponse({'error': 'Recipe or ingredient does not exist'}, status=405)

# Author: Matej Hrachovec
#Login: xhrach06 
@csrf_exempt
def AddCalendarRecipeView(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        recipeName = data.get('recipeName')
        recipeID = data.get('recipeID')
        userId = data.get('userId')
        date = data.get('date')
        try:
            calendarRecipe = CalendarRecipe.objects.create(
                recipeName = recipeName,
                recipeID = recipeID,
                userId = userId,
                date = date
            )
            calendarRecipe.save()
            serializer = CalendarRecipeSerializer(calendarRecipe)
            return JsonResponse({'message':'calendar recipe added','data':serializer.data},status = 200)
        except:
            return JsonResponse({'error':'cant add calendar recipe'},status=405)

# Author: Matej Hrachovec
#Login: xhrach06 
@csrf_exempt
def RemoveCalendarRecipeView(request, calendar_recipe_id):
    try:
        calendar_recipe = CalendarRecipe.objects.get(id=calendar_recipe_id)
        calendar_recipe.delete()
        return JsonResponse({'message': 'Calendar recipe deleted successfully'}, status=200)
    except CalendarRecipe.DoesNotExist:
        return JsonResponse({'error': 'Calendar recipe not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': f'Error deleting calendar recipe: {str(e)}'}, status=405)

# Author: Matej Hrachovec
#Login: xhrach06 
@csrf_exempt
def GetAllCalendarRecipesView(request, user_id):
    if request.method == 'GET':
        try:
            user = User.objects.get(id=user_id)
            calendar_recipes = CalendarRecipe.objects.filter(userId=user_id)
            serializer = CalendarRecipeSerializer(calendar_recipes, many=True)
            return JsonResponse({'data': serializer.data}, status=200)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)