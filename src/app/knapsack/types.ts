export type Knapsack = {
  capacity: number;
  items: Item[];
};

export type Item = {
  id: string;
  name: string;
  weight: number;
  value: number;
};

export type Action =
  | { type: "SET_CAPACITY"; payload: number }
  | { type: "ADD_ITEM"; payload: Item }
  | { type: "DELETE_ITEM"; payload: string };
