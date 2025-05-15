'use server';

import { Dish } from '@/types/dish';
import { ref, push, set } from 'firebase/database';
import { database } from '@/lib/firebase';

function cleanObject(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(cleanObject);
  if (obj !== null && typeof obj === 'object') {
    const cleaned: Record<string, unknown> = {};
    for (const key in obj as Record<string, unknown>) {
      if ((obj as Record<string, unknown>)[key] !== undefined) {
        cleaned[key] = cleanObject((obj as Record<string, unknown>)[key]);
      }
    }
    return cleaned;
  }
  return obj;
}

export async function addDish(prevState: unknown, dish: Dish) {
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