// Base types for your data models
export type Ingredient = {
  name: string;
  quantity: number;
  unit: string;
};

export type DishCategories = {
  cuisine?: string;
  mealType?: string;
  dietary?: string;
  cookingTime?: string;
};

export type Dish = {
  name: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  imageUrl: string;
  instructions: string;
  createdAt: number;
  updatedAt: number;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  categories: DishCategories;
  ingredients: Record<string, Ingredient>;
};

// For your category selector
export type CategoryType = {
  label: string;
  options: {
    value: string;
    label: string;
  }[];
};

// For API responses
export type ApiResponse<T> = {
  data?: T;
  error?: string;
  status: number;
};