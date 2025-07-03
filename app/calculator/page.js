"use client";
import { useState } from "react";

const FRUITS = [
  { name: "Apple", basePrice: 120, variant: 1.1, mutation: 0.05 },
  { name: "Orange", basePrice: 100, variant: 1.2, mutation: 0.08 },
  { name: "Banana", basePrice: 80, variant: 1.05, mutation: 0.03 },
];

export default function FruitValueCalculator() {
  const [basePrice, setBasePrice] = useState(120);
  const [variant, setVariant] = useState(1.1);
  const [mutation, setMutation] = useState(0.05);
  const [result, setResult] = useState(null);

  const handleFruitChange = (e) => {
    const fruit = FRUITS.find(f => f.name === e.target.value);
    if (fruit) {
      setBasePrice(fruit.basePrice);
      setVariant(fruit.variant);
      setMutation(fruit.mutation);
      setResult(null);
    }
  };

  const calculate = () => {
    const value = basePrice * variant * (1 + mutation);
    setResult(value);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-orange-900 flex items-center gap-2">
        <span role="img" aria-label="fruit">🍊</span> Fruit Value Calculator
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-6 border border-orange-200">
        <div className="mb-4">
          <label className="block mb-1 font-medium text-orange-800">Choose Fruit</label>
          <select
            className="border rounded px-3 py-2 w-full bg-orange-50"
            onChange={handleFruitChange}
            value={FRUITS.find(f => f.basePrice === basePrice && f.variant === variant && f.mutation === mutation)?.name || FRUITS[0].name}
          >
            {FRUITS.map(fruit => (
              <option key={fruit.name} value={fruit.name}>{fruit.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-orange-800">Base Price</label>
          <input
            type="number"
            className="border rounded px-3 py-2 w-full"
            value={basePrice}
            onChange={e => setBasePrice(Number(e.target.value))}
            min={0}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-orange-800">Variant</label>
          <input
            type="number"
            className="border rounded px-3 py-2 w-full"
            value={variant}
            onChange={e => setVariant(Number(e.target.value))}
            step={0.01}
            min={0}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-orange-800">Mutation Multiplier</label>
          <input
            type="number"
            className="border rounded px-3 py-2 w-full"
            value={mutation}
            onChange={e => setMutation(Number(e.target.value))}
            step={0.01}
            min={0}
          />
        </div>
        <button
          className="bg-orange-600 text-white px-6 py-2 rounded shadow hover:bg-orange-700 transition"
          onClick={calculate}
        >
          Calculate
        </button>
        {result !== null && (
          <div className="mt-6 p-4 bg-orange-100 rounded text-orange-900 font-bold text-lg">
            Fruit Value: ${result.toFixed(2)}
          </div>
        )}
      </div>
      <p className="mt-4 text-sm text-orange-700">Formula: <span className="font-mono">Fruit Value = Base Price * Variant * (1 + Mutation Multiplier)</span></p>
    </div>
  );
} 