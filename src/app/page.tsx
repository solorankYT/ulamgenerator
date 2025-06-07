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
      { value: "filipino", label: "Filipino" },
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
    setRandomDish(null);
    
    try {
      const result = await getRandomDishByCategories(selectedCategories);
      
      if (result.data) {
        setRandomDish(result.data);
      } else {
        setError(result.error || "Failed to generate dish");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">What Should I Cook Today?</h1>
          <p className="text-xl text-gray-600">Discover delicious recipes based on your preferences</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {categoryOptions.map((category) => (
              <div key={category.label} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {category.label}
                </label>
                <select
                  onChange={(e) => 
                    handleCategoryChange(
                      category.label.toLowerCase() as keyof DishCategories, 
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  value={selectedCategories[category.label.toLowerCase() as keyof DishCategories] || ""}
                >
                  <option value="">Any {category.label}</option>
                  {category.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Button
              onClick={handleGenerateDish}
              disabled={isLoading}
              className="px-8 py-3 text-lg font-medium rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                "Generate Random Dish"
              )}
            </Button>
          </div>
        </div>
        
        {error && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="font-medium">Error</p>
                <p>{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {randomDish && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-1/3 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center mb-4 shadow-inner">
                    {randomDish.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={randomDish.imageUrl} alt={randomDish.name} className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <svg className="w-16 h-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2m-4-8a2 2 0 100 4 2 2 0 000-4zM6.5 12.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm15-1.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      </svg>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">{randomDish.name}</h2>
                  <p className="text-gray-600 mt-2">{randomDish.description}</p>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="text-xs font-medium text-gray-500">Prep Time</p>
                      <p className="font-semibold">
                        {randomDish.prepTime.hourValue > 0 && `${randomDish.prepTime.hourValue}h`} 
                        {randomDish.prepTime.hourValue > 0 && randomDish.prepTime.minuteValue > 0 && ' '}
                        {randomDish.prepTime.minuteValue > 0 && `${randomDish.prepTime.minuteValue}m`}
                        {randomDish.prepTime.hourValue === 0 && randomDish.prepTime.minuteValue === 0 && 'N/A'}
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="text-xs font-medium text-gray-500">Cook Time</p>
                      <p className="font-semibold">
                        {randomDish.cookTime.hourValue > 0 && `${randomDish.cookTime.hourValue}h`} 
                        {randomDish.cookTime.hourValue > 0 && randomDish.cookTime.minuteValue > 0 && ' '}
                        {randomDish.cookTime.minuteValue > 0 && `${randomDish.cookTime.minuteValue}m`}
                        {randomDish.cookTime.hourValue === 0 && randomDish.cookTime.minuteValue === 0 && 'N/A'}
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="text-xs font-medium text-gray-500">Servings</p>
                      <p className="font-semibold">{randomDish.servings || 'N/A'}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="text-xs font-medium text-gray-500">Difficulty</p>
                      <p className="font-semibold capitalize">{randomDish.difficulty || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 md:w-2/3">
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Ingredients</h3>
                  <ul className="space-y-2">
                    {Object.values(randomDish.ingredients).map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-gray-700">
                          <span className="font-medium">{ingredient.quantity} {ingredient.unit}</span> {ingredient.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Instructions</h3>
                  <ol className="space-y-6">
                    {Object.values(randomDish.instructions).map((instruction, index) => (
                      <li key={index} className="flex">
                        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-600 text-white text-lg font-bold mr-4 flex-shrink-0">
                          {instruction.number}
                        </span>
                        <div>
                          <h4 className="font-semibold text-gray-800">{instruction.title}</h4>
                          <p className="text-gray-600 mt-1">{instruction.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}