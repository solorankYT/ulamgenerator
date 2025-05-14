import { ref, get, query, orderByChild, equalTo, Query } from "firebase/database";
import { database } from "@/lib/firebase";
import { Dish, ApiResponse, DishCategories } from "@/types/dish";

export const getRandomDishByCategories = async (
  selectedCategories: Partial<DishCategories>
): Promise<ApiResponse<Dish>> => {
  try {
    const dishesRef = ref(database, 'dishes');
    let currentQuery: Query = dishesRef;
    
    for (const [categoryType, categoryValue] of Object.entries(selectedCategories)) {
      if (categoryValue) {
        currentQuery = query(
          currentQuery,
          orderByChild(`categories/${categoryType}`),
          equalTo(categoryValue)
        );
      }
    }
    
    const snapshot = await get(currentQuery);
    
    if (snapshot.exists()) {
      const dishes: Record<string, Dish> = snapshot.val();
      const dishIds = Object.keys(dishes);
      
      if (dishIds.length === 0) {
        return { status: 404, error: "No dishes match the selected categories" };
      }
      
      const randomIndex = Math.floor(Math.random() * dishIds.length);
      const dish = {
        ...dishes[dishIds[randomIndex]],
        id: dishIds[randomIndex]
      };
      
      return { status: 200, data: dish };
    }
    
    return { status: 404, error: "No dishes found" };
  } catch (error) {
    console.error("Error fetching dishes:", error);
    return { 
      status: 500, 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
  }
};