"use client";

import { useState } from "react";
import { Item, getColumns } from "./columns";
import { DataTable } from "./data-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Calculator } from "lucide-react";
import { DEFAULT_ITEMS } from "./data";

export default function Knapsack() {
  const [capacity, setCapacity] = useState(0);
  const [items, setItems] = useState<Item[]>(DEFAULT_ITEMS);

  const handleCapacityChanged = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const capacity = formData.get("capacity") as string;
    setCapacity(parseInt(capacity, 10) || 0);
    form.reset();
  };

  const handleItemAdded = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const weight = formData.get("weight") as string;
    const value = formData.get("value") as string;
    setItems((items) => [
      ...items,
      {
        id: Math.random().toString(36).substring(2, 9),
        name,
        weight: parseInt(weight, 10) || 0,
        value: parseInt(value, 10) || 0,
      },
    ]);
    form.reset();
  };

  const handleItemDeleted = (id: string) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-14">
      <div className="lg:w-[800px]">
        <h1 className="text-4xl mb-12">Knapsack</h1>

        <div className="max-w-xs mb-6">
          <form onSubmit={handleCapacityChanged}>
            <h2 className="text-xl mb-2">
              Capacity: <span className="text-green-400">{capacity}</span>
            </h2>
            <Input name="capacity" type="number" placeholder="Capacity" />
          </form>
        </div>

        <div className="mb-6">
          <h2 className="text-xl mb-2">Items</h2>
          <form className="flex gap-2 mb-2" onSubmit={handleItemAdded}>
            <Input name="name" type="text" placeholder="Name" />
            <Input name="weight" type="number" placeholder="Weight" />
            <Input name="value" type="number" placeholder="Value" />
            <Button variant="default">
              <Plus className="h-4 w-4" />
            </Button>
          </form>
          <DataTable
            columns={getColumns({
              onRowDeleted: handleItemDeleted,
            })}
            data={items}
          />
        </div>

        <div className="flex justify-center">
          <Button className="flex gap-2" size="lg">
            <Calculator size={16} /> Solve
          </Button>
        </div>
      </div>
    </main>
  );
}
