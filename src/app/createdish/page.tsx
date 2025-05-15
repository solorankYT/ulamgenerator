"use client";

import React, { useActionState, useState } from "react";
import { addDish } from "@/app/actions";
import { Dish } from "@/types/dish";
import { startTransition } from "react";

    const INITIAL_DISH_STATE: Dish ={
        name: "",
        description: "",
        prepTime:{
            hourValue: 0,
            minuteValue: 0
        },
        cookTime:{
            hourValue: 0,
            minuteValue: 0
        },
        servings: 0,
        difficulty: "easy",
        imageUrl: "",
        instructions: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        dietary: {
            vegetarian: false,
            vegan: false,
            glutenFree: false,
        },
        categories: {
            cuisine: "",
            mealType: "",
            cookingTime: "",
        },
        ingredients: []
    }


export default function CreateDish() {
    const [dish, setDish] = useState<Dish>({
        name: "",
        description: "",
        prepTime:{
            hourValue: 0,
            minuteValue: 0
        },
        cookTime:{
            hourValue: 0,
            minuteValue: 0
        },
        servings: 0,
        difficulty: "easy",
        imageUrl: "",
        instructions: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        dietary: {
            vegetarian: false,
            vegan: false,
            glutenFree: false,
        },
        categories: {
            cuisine: "",
            mealType: "",
            cookingTime: "",
        },
        ingredients: []
    });


    const [state, action, pending] = useActionState(addDish, null);

    const addInstruction = () => {
        setDish(prev => ({
            ...prev,
            instructions: [
                ...prev.instructions,
                { number: prev.instructions.length + 1, title: "", description: "" }
            ]
        }));
    };

    const addIngredient = () => {
        setDish(prev => ({
            ...prev,
            ingredients: [
                ...prev.ingredients,
                { name: "", quantity: 0, unit: "" }
            ]
        }));
    };

    const handleTimeChange = (timeType: "prepTime" | "cookTime", field: "hourValue" | "minuteValue", value: number) => {
        setDish(prev => ({
            ...prev,
            [timeType]: {
                ...prev[timeType],
                [field]: value
            }
        }));
    }
    
   const resetForm = () => {
    if (confirm("Are you sure you want to reset the form? All entered data will be lost.")) {
        setDish(INITIAL_DISH_STATE);
    }
    };

    const handleChange = (field: keyof Dish, value: unknown) => {
        setDish(prev => ({ ...prev, [field]: value }));
    };

        const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(() => {
            action(dish)
        });
        };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Create a New Dish</h1>
         
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Dish Name"
                        value={dish.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={dish.imageUrl}
                        onChange={(e) => handleChange("imageUrl", e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <textarea
                    placeholder="Description"
                    value={dish.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                    rows={3}
                />

                {/* Times and Servings */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <p>Prep time</p>

                    <p>Hour</p>
                    <input
                        type="number"
                        value={dish.prepTime.hourValue}
                        onChange={(e) => handleTimeChange("prepTime", "hourValue", Number(e.target.value))}
                        className="w-full p-2 border rounded"
                        min={0}
                    />

                    <p>Minute</p>
                    <input
                        type="number"
                        value={dish.prepTime.minuteValue}
                        onChange={(e) => handleTimeChange("prepTime", "minuteValue", Number(e.target.value))}
                        className="w-full p-2 border rounded"
                        min={0}
                    />


                    <p>Cook time</p>
                    <p>Hour</p>
                    <input
                        type="number"
                        value={dish.cookTime.hourValue}
                        onChange={(e) => handleTimeChange("cookTime", "hourValue", Number(e.target.value))}
                        className="w-full p-2 border rounded"
                        min={0}
                    />
                    <p>Minute</p>
                    <input
                        type="number"
                        value ={dish.cookTime.minuteValue}
                        onChange={(e) => handleTimeChange("cookTime", "hourValue", Number(e.target.value))}
                        className="w-full p-2 border rounded"
                        min={0}
                    />


                    <p>Servings</p> 
                    <input
                        type="number"
                        placeholder="Servings"
                        value={dish.servings}
                        onChange={(e) => handleChange("servings", Number(e.target.value))}
                        className="w-full p-2 border rounded"
                        min={1}
                        required
                    />
                </div>

                {/* Difficulty */}
                <h3 className="font-bold">Difficulty</h3>
                <select
                    value={dish.difficulty}
                    onChange={(e) => handleChange("difficulty", e.target.value as Dish["difficulty"])}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                {/* Instructions */}
                <div className="space-y-2">
                    <h3 className="font-semibold">Instructions</h3>
                    {dish.instructions.map((instr, idx) => (
                        <div key={idx} className="space-y-2 p-3 border rounded">
                            <input
                                type="text"
                                placeholder="Title"
                                value={instr.title}
                                onChange={(e) => {
                                    const newInstructions = [...dish.instructions];
                                    newInstructions[idx].title = e.target.value;
                                    setDish({ ...dish, instructions: newInstructions });
                                }}
                                className="w-full p-2 border rounded"
                                required
                            />
                            <textarea
                                placeholder="Description"
                                value={instr.description}
                                onChange={(e) => {
                                    const newInstructions = [...dish.instructions];
                                    newInstructions[idx].description = e.target.value;
                                    setDish({ ...dish, instructions: newInstructions });
                                }}
                                className="w-full p-2 border rounded"
                                rows={2}
                                required
                            />
                        </div>
                    ))}
                    <button 
                        type="button" 
                        onClick={addInstruction}
                        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                    >
                        Add Instruction
                    </button>
                </div>

                {/* Ingredients */}
                <div className="space-y-2">
                    <h3 className="font-semibold">Ingredients</h3>
                    {dish.ingredients.map((ingr, idx) => (
                        <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 border rounded">
                            <input
                                type="text"
                                placeholder="Name"
                                value={ingr.name}
                                onChange={(e) => {
                                    const newIngredients = [...dish.ingredients];
                                    newIngredients[idx].name = e.target.value;
                                    setDish({ ...dish, ingredients: newIngredients });
                                }}
                                className="p-2 border rounded"
                                required
                            />
                           
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={ingr.quantity}
                                onChange={(e) => {
                                    const newIngredients = [...dish.ingredients];
                                    newIngredients[idx].quantity = Number(e.target.value);
                                    setDish({ ...dish, ingredients: newIngredients });
                                }}
                                className="p-2 border rounded"
                                min={0}
                                step="0.1"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Unit"
                                value={ingr.unit}
                                onChange={(e) => {
                                    const newIngredients = [...dish.ingredients];
                                    newIngredients[idx].unit = e.target.value;
                                    setDish({ ...dish, ingredients: newIngredients });
                                }}
                                className="p-2 border rounded"
                                required
                            />
                        </div>
                    ))}
                    <button 
                        type="button" 
                        onClick={addIngredient}
                        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                    >
                        Add Ingredient
                    </button>
                </div>

                {/* Dietary Options */}
                <div className="space-y-2">
                    <h3 className="font-semibold">Dietary Options</h3>
                    <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={dish.dietary.vegetarian}
                                onChange={(e) => setDish(prev => ({
                                    ...prev,
                                    dietary: { ...prev.dietary, vegetarian: e.target.checked }
                                }))}
                                className="h-4 w-4"
                            />
                            <span>Vegetarian</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={dish.dietary.vegan}
                                onChange={(e) => setDish(prev => ({
                                    ...prev,
                                    dietary: { ...prev.dietary, vegan: e.target.checked }
                                }))}
                                className="h-4 w-4"
                            />
                            <span>Vegan</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={dish.dietary.glutenFree}
                                onChange={(e) => setDish(prev => ({
                                    ...prev,
                                    dietary: { ...prev.dietary, glutenFree: e.target.checked }
                                }))}
                                className="h-4 w-4"
                            />
                            <span>Gluten Free</span>
                        </label>
                    </div>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                    <h3 className="font-semibold">Categories</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(dish.categories).map(([key, value]) => (
                            <input
                                key={key}
                                type="text"
                                placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                value={value || ""}
                                onChange={(e) =>
                                    setDish(prev => ({
                                        ...prev,
                                        categories: { ...prev.categories, [key]: e.target.value },
                                    }))
                                }
                                className="w-full p-2 border rounded"
                            />
                        ))}
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={pending} 
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {pending ? "Creating..." : "Create Dish"}
                </button>

                <button 
                    type="button" 
                    onClick={resetForm}
                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                >
                    Reset Form
                </button>
                {state?.success && <div className="text-green-500 mb-4">Dish created successfully!</div>}
                {state?.error && <div className="text-red-500 mb-4">{state.error}</div>}
                 
            </form>
        </div>
    );
}