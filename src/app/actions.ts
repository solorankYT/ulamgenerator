'use server';

import { Dish } from '@/types/dish';
import { ref, push, set } from 'firebase/database';
import { database } from '@/lib/firebase';

function cleanObject(obj: any): any {
  if (Array.isArray(obj)) return obj.map(cleanObject);
  if (obj !== null && typeof obj === 'object') {
    const cleaned: any = {};
    for (const key in obj) {
      if (obj[key] !== undefined) {
        cleaned[key] = cleanObject(obj[key]);
      }
    }
    return cleaned;
  }
  return obj;
}

export async function addDish(prevState: any, dish: Dish) {
  try {
    if (!dish.name || !dish.description) {
      return { error: "Name and description are required", success: false };
    }

    const dishesRef = ref(database, 'dishes');
    const newDishRef = push(dishesRef);

    const cleanedDish = cleanObject({
      ...dish,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    await set(newDishRef, cleanedDish);
    return { success: true, id: newDishRef.key, error: null };
  } catch (error) {
    console.error("Error adding dish:", error);
    return { error: "Failed to add dish", success: false };
  }
}