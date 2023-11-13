import { Item, Knapsack } from "./types";
import clone from "lodash.clone";

/**
 * Solves the Knapsack Problem using the Simulated Annealing algorithm.
 * It tries to maximize the total value of items in the knapsack while
 * ensuring the total weight does not exceed the capacity.
 */
export const solve = (
  initialState: Knapsack,
  initialTemp: number = 10000,
  minTemp: number = 1,
  interval: number = 100
) => {
  // Check if there is at least one item that can fit into the knapsack
  if (
    !initialState.items.some(
      (item) => (item?.weight || 0) <= initialState.capacity
    ) ||
    initialState.items.length === 0
  ) {
    throw new Error("Uh Oh! No items can fit into the knapsack");
  }

  let currentSolution = clone(initialState);
  let bestSolution = clone(currentSolution);
  let temperature = initialTemp;

  let i = 0;
  while (true) {
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

    if (i % interval === 0) {
      const value = objectiveFunction(currentSolution);
      console.log(
        "iteration:",
        i,
        "value:",
        value,
        "temperature:",
        temperature
      );
    }

    if (temperature <= minTemp) {
      break;
    }
    i++;
  }

  console.log("Iterations:", i);

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
  const items = [...knapsack.items];
  const randomIndex = Math.floor(Math.random() * items.length);
  if (items[randomIndex] === null) {
    items[randomIndex] = availableItems[randomIndex];
  } else {
    items[randomIndex] = null;
  }

  return { ...knapsack, items: items };
};

// Calculate total value, return 0 or a negative value if weight exceeds capacity
const objectiveFunction = (knapsack: Knapsack): number => {
  const { totalWeight, totalValue } = calculateTotal(knapsack.items);

  return totalWeight <= knapsack.capacity ? totalValue : 0;
};

const calculateTotal = (items: Item[]) => {
  const totalWeight = items.reduce((sum, item) => sum + (item?.weight || 0), 0);
  const totalValue = items.reduce((sum, item) => sum + (item?.value || 0), 0);

  return { totalWeight, totalValue };
};
