"use client";
import { useState } from "react";
import { getRandomDishByCategories } from "@/services/dishes.service";
import { Dish, DishCategories, CategoryType } from "@/types/dish";
import { Button } from "@/components/ui/button";

const categoryOptions: CategoryType[] = [
  {
    label: "Cuisine",
    options: [
      { value: "italian", label: "Italian" },
      { value: "mexican", label: "Mexican" },
      { value: "indian", label: "Indian" },
    ],
  },
  {
    label: "Meal Type",
    options: [
      { value: "breakfast", label: "Breakfast" },
      { value: "lunch", label: "Lunch" },
      { value: "dinner", label: "Dinner" },
    ],
  },
  // Add more categories as needed
];

export default function CategoryPage() {
  const [selectedCategories, setSelectedCategories] = useState<Partial<DishCategories>>({});
  const [randomDish, setRandomDish] = useState<Dish | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCategoryChange = (categoryType: keyof DishCategories, value: string) => {
    setSelectedCategories(prev => ({
      ...prev,
      [categoryType]: value || undefined
    }));
  };

  const handleGenerateDish = async () => {
    setIsLoading(true);
    setError(null);
    
    const result = await getRandomDishByCategories(selectedCategories);
    
    if (result.data) {
      setRandomDish(result.data);
    } else {
      setError(result.error || "Failed to generate dish");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Generate Random Dish</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {categoryOptions.map((category) => (
          <div key={category.label}>
            <h2 className="font-semibold mb-2">{category.label}</h2>
            <select
              onChange={(e) => 
                handleCategoryChange(
                  category.label.toLowerCase() as keyof DishCategories, 
                  e.target.value
                )
              }
              className="w-full p-2 border rounded"
              value={selectedCategories[category.label.toLowerCase() as keyof DishCategories] || ""}
            >
              <option value="">Any</option>
              {category.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      
      <Button
        onClick={handleGenerateDish}
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate Random Dish"}
      </Button>
      
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {randomDish && (
        <div className="mt-8 p-4 border rounded">
          <h2 className="text-xl font-bold">{randomDish.name}</h2>
          <p className="text-gray-600">{randomDish.description}</p>
          <div className="mt-4">
            <h3 className="font-semibold">Ingredients:</h3>
            <ul className="list-disc pl-5">
              {Object.values(randomDish.ingredients).map((ingredient, index) => (
                <li key={index}>
                  {ingredient.quantity} {ingredient.unit} {ingredient.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}