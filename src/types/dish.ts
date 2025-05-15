export type Ingredient = {
  name: string;
  quantity: number;
  unit: string;
};

export type Instruction ={
  number: number;
  title: string;
  description: string;
}
export type CookingTime = {
  hourValue: number;
  minuteValue: number;
}

export type PrepTime = {
  hourValue: number;
  minuteValue: number;
}

export type DishCategories = {
  cuisine?: string;
  mealType?: string;
  cookingTime?: string;
};

export type DietaryCategories = {
  vegetarian?: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
};

export type Dish = {
  id?: string;
  name: string;
  description: string;
  prepTime: PrepTime;
  cookTime: CookingTime;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  imageUrl: string;
  instructions: Instruction[];
  createdAt: number;
  updatedAt: number;
  dietary: DietaryCategories;
  categories: DishCategories;
  ingredients: Ingredient[];
};

export type CategoryType = {
  label: string;
  options: {
    value: string;
    label: string;
  }[];
};

export type ApiResponse<T> = {
  data?: T;
  error?: string;
  status: number;
};