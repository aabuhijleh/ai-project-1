import { Item, Knapsack, Metadata, Solution } from "./types";
import clone from "lodash.clone";

/**
 * Solves the Knapsack Problem using the Simulated Annealing algorithm.
 * It tries to maximize the total value of items in the knapsack while
 * ensuring the total weight does not exceed the capacity.
 */
export const solve = (
  initialState: Knapsack,
  initialTemp: number = 1000,
  minTemp: number = 0.01,
  alpha: number = 0.99,
  interval: number = 50
): Solution => {
  validateInput(initialState);

  let currentSolution = clone(initialState);
  let bestSolution = clone(currentSolution);
  let temperature = initialTemp;

  const metadata: Metadata = {
    temperature: [{ label: "Temperature", data: [] }],
    value: [{ label: "Value", data: [] }],
  };

  let i = 0;
  while (true) {
    temperature *= alpha; // Cooling schedule: reduce temperature each iteration

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
    } else if (Math.exp(deltaE / temperature) > Math.random()) {
      currentSolution = newSolution;
    }

    if (i % interval === 0) {
      const value = objectiveFunction(currentSolution);
      metadata.temperature[0].data.push({ iteration: i, temperature });
      metadata.value[0].data.push({ iteration: i, value });
    }

    if (temperature <= minTemp) {
      break;
    }
    i++;
  }

  const { totalValue, totalWeight } = calculateTotal(bestSolution.items);
  const result = {
    value: totalValue,
    weight: totalWeight,
    items: bestSolution.items.filter(Boolean),
    metadata,
  };

  return result;
};

// Check if there is at least one item that can fit into the knapsack
const validateInput = (knapsack: Knapsack) => {
  if (
    knapsack.capacity <= 0 ||
    knapsack.items.length === 0 ||
    !knapsack.items.some(
      (item) => (item?.weight || Infinity) <= knapsack.capacity
    )
  ) {
    throw new Error("Uh Oh! No items can fit into the knapsack");
  }
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
