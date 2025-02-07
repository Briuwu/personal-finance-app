"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";

import due from "@/public/icon-bill-due.svg";
import paid from "@/public/icon-bill-paid.svg";

export type Transaction = {
  billTitle: string;
  dueDate: Date;
  amount: number;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "billTitle",
    header: "Bill Title",
    cell: ({ row }) => {
      const name = row.getValue("billTitle") as string;
      return (
        <div className="text-preset-4 font-bold text-grey-900">{name}</div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-preset-5 px-0 text-grey-500"
        >
          Due Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const transactionDate = row.getValue("dueDate") as string;
      const date = new Date(transactionDate);
      const day = date.getDate();
      const suffix = (day: number) => {
        if (day > 3 && day < 21) return "th";
        switch (day % 10) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      };
      const formattedDate = `${day}${suffix(day)}`;
      const currentDate = new Date();
      const isNearCurrentDate = Math.abs(currentDate.getDate() - day) <= 3;

      return (
        <div className={cn("text-preset-5 flex items-center gap-2 text-green")}>
          Monthy - {formattedDate}{" "}
          <Image src={isNearCurrentDate ? due : paid} alt="" />
        </div>
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
      const transactionDate = row.getValue("dueDate") as string;
      const date = new Date(transactionDate);
      const day = date.getDate();
      const amount = row.getValue("amount") as number;
      const currentDate = new Date();
      const isNearCurrentDate = Math.abs(currentDate.getDate() - day) <= 3;
      return (
        <div
          className={cn(
            "text-preset-4 font-bold",
            isNearCurrentDate ? "text-red" : "text-grey-900",
          )}
        >
          ${amount}
        </div>
      );
    },
  },
];
