"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Transaction = {
  category: string;
  name: string;
  transactionDate: string;
  amount: number;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Recipient / Sender",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return (
        <div className="text-preset-4 font-bold text-grey-900">{name}</div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as string;
      return (
        <div className="text-preset-5 text-grey-500">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </div>
      );
    },
  },
  {
    accessorKey: "transactionDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-preset-5 px-0 text-grey-500"
        >
          Transaction Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const transactionDate = row.getValue("transactionDate") as string;
      return (
        <div className="text-preset-5 text-grey-500">{transactionDate}</div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-preset-5 px-0 text-grey-500"
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      const isNegative = amount < 0;
      return (
        <div
          className={cn(
            "text-preset-4 font-bold",
            isNegative ? "text-grey-900" : "text-green",
          )}
        >
          {isNegative ? `-$${Math.abs(amount)}` : `+$${amount}`}
        </div>
      );
    },
  },
];
