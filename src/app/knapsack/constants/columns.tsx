"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { Item } from "../types";

type getColumnsParams = {
  onRowDeleted?: (id?: string) => void;
  includeActions?: boolean;
};

export const getColumns = ({
  onRowDeleted,
  includeActions = true,
}: getColumnsParams = {}) => {
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
  ];

  if (includeActions) {
    const actionsColumn: ColumnDef<Item> = {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onRowDeleted?.(item?.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        );
      },
    };
    columns.push(actionsColumn);
  }

  return columns;
};
