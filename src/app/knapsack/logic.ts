import { Item, Knapsack } from "./types";
import clone from "lodash.clone";

/**
 * Solves the Knapsack Problem using the Simulated Annealing algorithm.
 * It tries to maximize the total value of items in the knapsack while
 * ensuring the total weight does not exceed the capacity.
 */
export const solve = (
  initialState: Knapsack,
  iterMax: number = 1000,
  initialTemp: number = 10000
) => {
  // Check if there is at least one item that can fit into the knapsack
  if (
    !initialState.items.some((item) => item.weight <= initialState.capacity) ||
    initialState.items.length === 0
  ) {
    throw new Error("Uh Oh! No items can fit into the knapsack");
  }

  let currentSolution = clone(initialState);
  let bestSolution = clone(currentSolution);
  let temperature = initialTemp;

  for (let i = 0; i < iterMax; i++) {
    temperature *= 0.99; // Cooling schedule: reduce temperature by 1% each iteration

    const newSolution = randomSuccessor(currentSolution, initialState.items);
    const deltaE =
      objectiveFunction(newSolution) - objectiveFunction(currentSolution);

    if (deltaE > 0) {
      currentSolution = newSolution;
      if (
        objectiveFunction(bestSolution) < objectiveFunction(currentSolution)
      ) {
        bestSolution = clone(currentSolution);
      }
    } else if (Math.exp(-deltaE / temperature) > Math.random()) {
      currentSolution = newSolution;
    }
  }

  const { totalValue, totalWeight } = calculateTotal(bestSolution.items);
  const result = {
    value: totalValue,
    weight: totalWeight,
    items: bestSolution.items,
  };

  console.log("Best solution found:", result);
  return result;
};

// Return a knapsack configuration with one item changed
const randomSuccessor = (
  knapsack: Knapsack,
  availableItems: Item[]
): Knapsack => {
  const items = knapsack.items;
  let newItemSet = new Set(items);

  // Randomly add or remove an item
  const changeType = Math.random() < 0.5 ? "remove" : "add";
  if (changeType === "remove" && newItemSet.size > 0) {
    const itemsArray = Array.from(newItemSet);
    newItemSet.delete(
      itemsArray[Math.floor(Math.random() * itemsArray.length)]
    );
  } else {
    // Filter out the items already in the knapsack
    const itemsNotInKnapsack = availableItems.filter(
      (item) => !newItemSet.has(item)
    );

    if (itemsNotInKnapsack.length > 0) {
      const itemToAdd =
        itemsNotInKnapsack[
          Math.floor(Math.random() * itemsNotInKnapsack.length)
        ];
      newItemSet.add(itemToAdd);
    }
  }

  return { ...knapsack, items: Array.from(newItemSet) };
};

// Calculate total value, return 0 or a negative value if weight exceeds capacity
const objectiveFunction = (knapsack: Knapsack): number => {
  const { totalWeight, totalValue } = calculateTotal(knapsack.items);

  return totalWeight <= knapsack.capacity ? totalValue : 0;
};

const calculateTotal = (items: Item[]) => {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  const totalValue = items.reduce((sum, item) => sum + item.value, 0);

  return { totalWeight, totalValue };
};
