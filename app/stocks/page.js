"use client";
import { useEffect, useState, useRef } from "react";

// User: Add your stock data here
// Example:
// const SEED_SHOP = [
//   { name: "Carrot", odds: 1 },
//   ...
// ];
const SEED_SHOP = [
  { name: "Carrot", odds: 1, rarity: "Common" },
  { name: "Strawberry", odds: 1, rarity: "Common" },
  { name: "Blueberry", odds: 1, rarity: "Uncommon" },
  { name: "Tomato", odds: 1, rarity: "Rare" },
  { name: "Cauliflower", odds: 3, rarity: "Rare" },
  { name: "Watermelon", odds: 6, rarity: "Legendary" },
  { name: "Rafflesia", odds: 10, rarity: "Legendary" },
  { name: "Green Apple", odds: 20, rarity: "Legendary" },
  { name: "Avocado", odds: 40, rarity: "Legendary" },
  { name: "Banana", odds: 40, rarity: "Legendary" },
  { name: "Pineapple", odds: 40, rarity: "Mythical" },
  { name: "Kiwi", odds: 40, rarity: "Mythical" },
  { name: "Bell Pepper", odds: 40, rarity: "Mythical" },
  { name: "Prickly Pear", odds: 133, rarity: "Mythical" },
  { name: "Loquat", odds: 200, rarity: "Divine" },
  { name: "Feijoa", odds: 600, rarity: "Divine" },
  { name: "Pitcher Plant", odds: 2000, rarity: "Divine" },
  { name: "Sugar Apple", odds: 10000, rarity: "Prismatic" },
];
const GEAR_SHOP = [];
const EGG_STOCK = [];

// Helper to determine if an item is in stock based on odds (e.g., 1 in 3)
function isInStock(odds) {
  if (!odds || odds <= 1) return true;
  return Math.floor(Math.random() * odds) === 0;
}

function getStockWithStatus(items) {
  return items.map(item => ({
    ...item,
    inStock: isInStock(item.odds)
  }));
}

const REFRESH_INTERVAL = 5 ; // 5 minutes in seconds

export default function StockPage() {
  const [seedStock, setSeedStock] = useState([]);
  const [gearStock, setGearStock] = useState([]);
  const [eggStock, setEggStock] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(REFRESH_INTERVAL);
  const timerRef = useRef();

  // Function to refresh all stocks
  const refreshStock = () => {
    setSeedStock(getStockWithStatus(SEED_SHOP));
    setGearStock(getStockWithStatus(GEAR_SHOP));
    setEggStock(getStockWithStatus(EGG_STOCK));
    setSecondsLeft(REFRESH_INTERVAL);
  };

  // Countdown and auto-refresh logic
  useEffect(() => {
    refreshStock();
    timerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          refreshStock();
          return REFRESH_INTERVAL;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line
  }, []);

  // Helper to format countdown
  function formatTime(secs) {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  // Helper to render a stock table
  function StockTable({ title, items }) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3 text-green-800">{title}</h2>
        {items.length === 0 ? (
          <p className="text-gray-500 italic">No items. Add your data in the code.</p>
        ) : (
          <table className="w-full text-left border rounded overflow-hidden">
            <thead>
              <tr className="bg-green-100 text-green-900">
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Odds</th>
                <th className="py-2 px-3">In Stock?</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item.name || idx} className="border-b last:border-b-0">
                  <td className="py-2 px-3 font-medium">{item.name}</td>
                  <td className="py-2 px-3">{item.odds ? `1 in ${item.odds}` : '-'}</td>
                  <td className="py-2 px-3">
                    {item.inStock ? (
                      <span className="text-green-700 font-bold">Yes</span>
                    ) : (
                      <span className="text-red-500 font-bold">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-green-900 flex items-center gap-2">
        <span role="img" aria-label="shop">🛒</span> Shop Stock Inventory
      </h1>
      <div className="mb-4 flex items-center gap-4">
        <span className="text-green-800 font-semibold">Next refresh in: <span className="font-mono">{formatTime(secondsLeft)}</span></span>
        <button
          className="ml-2 px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
          onClick={refreshStock}
        >
          Refresh Stock
        </button>
      </div>
      <StockTable title="Seed Shop Stock" items={seedStock} />
      <StockTable title="Gear Shop Stock" items={gearStock} />
      <StockTable title="Egg Stock" items={eggStock} />
      <p className="mt-8 text-sm text-gray-500">Add your shop data in the code at the top of this file.</p>
    </div>
  );
} 