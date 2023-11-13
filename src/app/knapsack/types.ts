export type Knapsack = {
  capacity: number;
  items: Item[];
};

export type Item = {
  id: string;
  name: string;
  weight: number;
  value: number;
} | null;

export type Action =
  | { type: "SET_CAPACITY"; payload: number }
  | { type: "ADD_ITEM"; payload: Item }
  | { type: "DELETE_ITEM"; payload?: string };

export type Solution = {
  value: number;
  weight: number;
  items: Item[];
  metadata: Metadata;
};

export type Metadata = {
  temperature: TemperatureIterationSeries[];
  value: ValueIterationSeries[];
};

export type TemperatureIteration = {
  iteration: number;
  temperature: number;
};

export type TemperatureIterationSeries = {
  label: string;
  data: TemperatureIteration[];
};

export type ValueIteration = {
  iteration: number;
  value: number;
};

export type ValueIterationSeries = {
  label: string;
  data: ValueIteration[];
};
