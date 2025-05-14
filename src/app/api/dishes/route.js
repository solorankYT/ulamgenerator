import { getRandomDishByCategories } from "@/services/dishes.service";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const categories = Object.fromEntries(searchParams.entries());
  
  try {
    const dish = await getRandomDishByCategories(categories);
    return NextResponse.json(dish);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch dish" },
      { status: 500 }
    );
  }
}