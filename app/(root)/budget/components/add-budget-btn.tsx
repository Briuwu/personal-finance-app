import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddBudgetForm } from "./add-budget-form";

export const AddBudgetBtn = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-preset-4 rounded-md bg-grey-900 p-4 font-bold text-white">
          + Add New Budget
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-5">
          <DialogTitle className="text-preset-2 lg:text-preset-1 text-grey-900">
            Add New Budget
          </DialogTitle>
          <DialogDescription>
            Choose a category to set a spending budget. These categories can
            help you monitor spending.
          </DialogDescription>
        </DialogHeader>
        <AddBudgetForm />
      </DialogContent>
    </Dialog>
  );
};
