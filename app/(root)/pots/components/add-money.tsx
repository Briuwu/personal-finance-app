"use client";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { addMoney } from "@/actions/pots";

type Props = {
  name: string;
  total: string;
  target: string;
  theme: string;
  potId: number;
};

export const AddMoney = ({ name, total, target, theme, potId }: Props) => {
  const [newAmount, setNewAmount] = useState("");
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value) && !isNaN(Number(value))) {
      setNewAmount(value);
    } else {
      toast.error("Please enter a valid amount");
    }
  };

  const handleAddMoney = () => {
    startTransition(async () => {
      try {
        await addMoney(potId, newAmount);
        toast.success("Money added successfully");
        setNewAmount("");
        setOpen(false);
      } catch (error) {
        console.error("Failed to add money", error);
        toast.error("Failed to add money. Please try again.");
      }
    });
  };

  const calculateProgress = () => {
    const totalAmount = Number(total) + Number(newAmount);
    return (totalAmount / Number(target)) * 100;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-preset-4 h-auto rounded-md bg-beige-100 p-4 font-bold text-grey-900 hover:text-white">
          + Add Money
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-5">
          <DialogTitle className="text-preset-2 lg:text-preset-1 text-grey-900">
            Add to &lsquo;{name}&rsquo;
          </DialogTitle>
          <DialogDescription>
            Add money to your pot to help you reach your goals.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-preset-4 text-grey-500">New Amount</p>
            <p className="text-preset-1 font-bold text-grey-900">
              ${(Number(newAmount) + Number(total)).toFixed(2)}
            </p>
          </div>

          <Progress
            value={calculateProgress()}
            className="h-2 rounded bg-beige-100"
            innerClassName={theme}
          />

          <div className="flex items-center justify-between">
            <p className="text-preset-5 font-bold text-grey-500">
              {calculateProgress().toFixed(2)}%
            </p>
            <p className="text-preset-5 text-grey-500">Target of ${target}</p>
          </div>
        </div>

        <div>
          <Label className="text-preset-5 font-bold text-grey-500">
            Amount to Add
          </Label>
          <div className="relative">
            <span className="text-preset-4 absolute left-3 top-2 text-beige-500">
              $
            </span>
            <Input
              type="number"
              step="0.02"
              value={newAmount}
              onChange={handleChange}
              className="px-5 py-3 pl-8"
              disabled={isPending}
            />
          </div>
        </div>

        <Button
          onClick={handleAddMoney}
          disabled={isPending}
          className="text-preset-4 h-auto w-full py-4 font-bold text-white"
        >
          Confirm Addition
        </Button>
      </DialogContent>
    </Dialog>
  );
};
