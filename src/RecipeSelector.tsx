import React, { useState } from "react";

interface Recipe {
  name: string;
}

export interface SelectedRecipe extends Recipe {
  count: number;
}

interface RecipeSelectorProps {
  initialRecipes: Recipe[];
  selectedRecipes: SelectedRecipe[];
  setSelectedRecipes: (recipes: SelectedRecipe[]) => void;
}

const RecipeSelector: React.FC<RecipeSelectorProps> = ({ initialRecipes, selectedRecipes, setSelectedRecipes }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");


  const handleSelect = (recipe: Recipe, double: boolean = false) => {
    const existingRecipe = selectedRecipes.find((r) => r.name === recipe.name);
    if (existingRecipe) {
      setSelectedRecipes(
        selectedRecipes.map((r) =>
          r.name === recipe.name ? { ...r, count: r.count + (double ? 2 : 1) } : r
        )
      );
    } else {
      setSelectedRecipes([
        ...selectedRecipes,
        { ...recipe, count: double ? 2 : 1 },
      ]);
    }
  };

  const handleDeselect = (recipe: Recipe) => {
    const existingRecipe = selectedRecipes.find((r) => r.name === recipe.name);
    if (existingRecipe && existingRecipe.count > 1) {
      setSelectedRecipes(
        selectedRecipes.map((r) =>
          r.name === recipe.name ? { ...r, count: r.count - 1 } : r
        )
      );
    } else {
      setSelectedRecipes(selectedRecipes.filter((r) => r.name !== recipe.name));
    }
  };

  const handleRemove = (recipe: Recipe) => {
    setSelectedRecipes(selectedRecipes.filter((r) => r.name !== recipe.name));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecipes = initialRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search recipes..."
        style={{ height: "40px", fontSize: "20px" }}
      />
      <ul>
        {filteredRecipes.map((recipe) => (
          <li key={recipe.name}>
            {recipe.name}
            <button onClick={() => handleSelect(recipe)}>+</button>
            <button onClick={() => handleSelect(recipe, true)}>++</button>
            <button onClick={() => handleDeselect(recipe)}>-</button>
          </li>
        ))}
      </ul>
      <h2>Selected Recipes</h2>
      <ul>
        {selectedRecipes.map((recipe) => (
          <li key={recipe.name}>
            {recipe.name} (x{recipe.count})
            <button onClick={() => handleRemove(recipe)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeSelector;
