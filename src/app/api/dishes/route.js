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

export async function POST(request) {
  const dish = await request.json();
 
  const response = await fetch(
    "https://ulamgen-default-rtdb.asia-southeast1.firebasedatabase.app/dishes.json",
    {
      method: "POST",
      body: JSON.stringify(dish),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to add dish" },
      { status: 500 }
    );
  }

  const data = await response.json();
  return NextResponse.json({id: data.name, ...dish}, { status: 201 });
}