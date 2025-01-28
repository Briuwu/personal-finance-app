"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddTransactionForm } from "./add-transaction-form";

export const AddTransaction = ({ categories }: { categories: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-preset-4 rounded-md bg-grey-900 p-4 font-bold text-white">
          + Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-5">
          <DialogTitle className="text-preset-2 lg:text-preset-1 text-grey-900">
            Add New Transaction
          </DialogTitle>
          <DialogDescription>
            Add a new transaction to your budget. This will help you keep track
            of your spending.
          </DialogDescription>
        </DialogHeader>
        <AddTransactionForm categories={categories} handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};
