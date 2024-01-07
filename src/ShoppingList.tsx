import React from 'react';
import { SelectedRecipe } from './RecipeSelector';

interface Ingredient {
  name: string;
  quantity: string;
}

interface RecipeIngredients {
  [key: string]: Ingredient[];
}

interface ShoppingListProps {
  selectedRecipes: SelectedRecipe[];
  recipeIngredients: RecipeIngredients;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ selectedRecipes, recipeIngredients }) => {
  const totalIngredients = selectedRecipes.reduce((acc, recipe) => {
    const ingredients = recipeIngredients[recipe.name];
    ingredients.forEach(ingredient => {
      if (acc[ingredient.name]) {
        acc[ingredient.name] += recipe.count + ' ' + ingredient.quantity;
      } else {
        acc[ingredient.name] = recipe.count + ' ' + ingredient.quantity;
      }
    });
    return acc;
  }, {} as { [key: string]: string });

  return (
    <div>
      <h2>Total Ingredients</h2>
      <ul>
        {Object.entries(totalIngredients).map(([ingredient, count]) => (
          <li key={ingredient}>{ingredient}: {count}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;

