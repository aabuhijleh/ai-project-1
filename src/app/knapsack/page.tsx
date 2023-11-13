"use client";

import { useReducer, useState } from "react";
import { getColumns } from "./constants/columns";
import { DataTable } from "./components/data-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Calculator } from "lucide-react";
import { DEFAULT_ITEMS } from "./constants/data";
import { Knapsack, Action, Solution } from "./types";
import { solve } from "./logic";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { TemperatureChart, ValueChart } from "./components/charts";

const INITIAL_STATE: Knapsack = {
  capacity: 100,
  items: DEFAULT_ITEMS,
};

const knapsackReducer = (state: Knapsack, action: Action): Knapsack => {
  switch (action.type) {
    case "SET_CAPACITY":
      return { ...state, capacity: action.payload };
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item?.id !== action.payload),
      };
    default:
      return state;
  }
};

export default function Knapsack() {
  const [knapsack, dispatch] = useReducer(knapsackReducer, INITIAL_STATE);
  const [solution, setSolution] = useState<Solution | null>(null);
  const { toast } = useToast();

  const handleCapacityChanged = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const capacity = formData.get("capacity") as string;
    dispatch({ type: "SET_CAPACITY", payload: parseInt(capacity, 10) || 0 });
    form.reset();
  };

  const handleItemAdded = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const weight = formData.get("weight") as string;
    const value = formData.get("value") as string;
    const newItem = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      weight: parseInt(weight, 10) || 0,
      value: parseInt(value, 10) || 0,
    };
    dispatch({ type: "ADD_ITEM", payload: newItem });
    form.reset();
  };

  const handleItemDeleted = (id?: string) => {
    dispatch({ type: "DELETE_ITEM", payload: id });
  };

  const handleSolve = () => {
    try {
      const solution = solve(knapsack);
      setSolution(solution);
    } catch (error) {
      toast({
        title: (error as Error).message,
        description: "Please adjust capacity or items",
        variant: "destructive",
        duration: 5000,
      });
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-14">
      <div className="lg:w-[800px]">
        <h1 className="text-4xl mb-12 font-semibold">Knapsack</h1>

        <div className="max-w-xs mb-6">
          <form onSubmit={handleCapacityChanged}>
            <h2 className="text-xl mb-2">
              Capacity:{" "}
              <span className="text-green-400">{knapsack.capacity}</span>
            </h2>
            <Input
              name="capacity"
              type="number"
              placeholder="Capacity"
              min={1}
              required
            />
          </form>
        </div>

        <div className="mb-6">
          <h2 className="text-xl mb-2">Items</h2>
          <form className="flex gap-2 mb-2" onSubmit={handleItemAdded}>
            <Input name="name" type="text" placeholder="Name" required />
            <Input
              name="weight"
              type="number"
              placeholder="Weight"
              min={1}
              required
            />
            <Input
              name="value"
              type="number"
              placeholder="Value"
              min={1}
              required
            />
            <Button variant="default">
              <Plus className="h-4 w-4" />
            </Button>
          </form>
          <DataTable
            columns={getColumns({
              onRowDeleted: handleItemDeleted,
            })}
            data={knapsack.items}
          />
        </div>

        <div className="flex justify-center">
          <Button className="flex gap-2" size="lg" onClick={handleSolve}>
            <Calculator size={16} /> Solve
          </Button>
        </div>

        {solution && (
          <div>
            <div className="mt-6 p-6 border border-slate-700 bg-slate-800/30 rounded-xl">
              <p className="mb-4 text-xl">
                Total Value:{" "}
                <span className="text-green-400">{solution.value}</span>
              </p>
              <p className="mb-4 text-xl">
                Total Weight:{" "}
                <span className="text-green-400">{solution.weight}</span>
              </p>
              <p className="mb-4 text-xl">
                Selected Items:{" "}
                <span className="text-green-400">{solution.items.length}</span>
              </p>

              <DataTable
                className="mb-4"
                columns={getColumns({ includeActions: false })}
                data={solution.items}
              />

              <div className="flex flex-col items-center justify-center">
                <h3 className="text-xl mb-2">Temperature</h3>
                <TemperatureChart data={solution.metadata.temperature} />
              </div>

              <div className="flex flex-col items-center justify-center">
                <h3 className="text-xl mb-2">Value</h3>
                <ValueChart data={solution.metadata.value} />
              </div>
            </div>
          </div>
        )}
      </div>

      <Toaster />
    </main>
  );
}
