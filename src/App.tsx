import { useState } from 'react'
import './App.css'
import RecipeSelector, { SelectedRecipe } from './RecipeSelector'
import ShoppingList from './ShoppingList'

function App() {
  const [selectedRecipes, setSelectedRecipes] = useState<SelectedRecipe[]>([])
  const initialRecipes = [
    {name: "Pizza"},
    {name: "Pasta"},
    {name: "Burger"}
  ]
  const recipeIngredients = {
    "Pizza": [{name: "Käse", quantity: "Gramm"}, {name: "Tomatensauce", quantity: "Tassen"}, {name: "Brot", quantity: "Scheiben"}],
    "Pasta": [{name: "Nudeln", quantity: "Gramm"}, {name: "Tomatensauce", quantity: "Tassen"}],
    "Burger": [{name: "Brötchen", quantity: "Stücke"}, {name: "Fleischklops", quantity: "Gramm"}, {name: "Salat", quantity: "Blätter"}, {name: "Tomate", quantity: "Scheiben"}]
  }

  return (
    <>
      <RecipeSelector initialRecipes={initialRecipes} selectedRecipes={selectedRecipes} setSelectedRecipes={setSelectedRecipes} />
      <ShoppingList selectedRecipes={selectedRecipes} recipeIngredients={recipeIngredients} />
    </>
  )
}

export default App
