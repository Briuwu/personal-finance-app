"use client";

import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";

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
import { withdrawMoney } from "@/actions/pots";

type Props = {
  name: string;
  total: string;
  target: string;
  theme: string;
  potId: number;
};

export const WithdrawMoney = ({ name, total, target, theme, potId }: Props) => {
  const [withdraw, setWithdraw] = useState("");
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value) && !isNaN(Number(value))) {
      if (Number(value) > Number(total)) {
        toast.error("Withdraw amount cannot be higher than the total amount");
      } else {
        setWithdraw(value);
      }
    } else {
      toast.error("Please enter a valid amount");
    }
  };

  const handleWithdrawMoney = () => {
    startTransition(async () => {
      try {
        await withdrawMoney(potId, withdraw);
        toast.success("Money withdrawn successfully");
        setWithdraw("");
        setOpen(false);
      } catch (error) {
        console.error("Failed to withdraw money", error);
        toast.error("Failed to withdraw money. Please try again.");
      }
    });
  };

  const calculateProgress = () => {
    const totalAmount = Number(total) - Number(withdraw);
    return (totalAmount / Number(target)) * 100;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-preset-4 h-auto rounded-md bg-beige-100 p-4 font-bold text-grey-900 hover:text-white">
          Withdraw
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-5">
          <DialogTitle className="text-preset-2 lg:text-preset-1 text-grey-900">
            Withdraw from &lsquo;{name}&rsquo;
          </DialogTitle>
          <DialogDescription>
            You can withdraw money from this pot at any time.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-preset-4 text-grey-500">New Amount</p>
            <p className="text-preset-1 font-bold text-grey-900">
              ${(Number(total) - Number(withdraw)).toFixed(2)}
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
              value={withdraw}
              onChange={handleChange}
              className="px-5 py-3 pl-8"
              disabled={isPending}
            />
          </div>
        </div>

        <Button
          onClick={handleWithdrawMoney}
          disabled={isPending}
          className="text-preset-4 h-auto w-full py-4 font-bold text-white"
        >
          Confirm Withdrawal
        </Button>
      </DialogContent>
    </Dialog>
  );
};
