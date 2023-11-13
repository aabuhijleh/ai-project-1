"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { Item } from "./types";

type getColumnsParams = {
  onRowDeleted: (id: string) => void;
};

export const getColumns = ({ onRowDeleted }: getColumnsParams) => {
  const columns: ColumnDef<Item>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "weight",
      header: "Weight",
    },
    {
      accessorKey: "value",
      header: "Value",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onRowDeleted(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        );
      },
    },
  ];

  return columns;
};
