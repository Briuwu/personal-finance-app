import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddPotForm } from "./add-pots-form";

export const AddPotsBtn = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-preset-4 rounded-md bg-grey-900 p-4 font-bold text-white">
          + Add New Pots
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-5">
          <DialogTitle className="text-preset-2 lg:text-preset-1 text-grey-900">
            Add New Pot
          </DialogTitle>
          <DialogDescription>
            Create a pot to set savings targets. These can help keep you on
            track as you save for special purchases.
          </DialogDescription>
        </DialogHeader>
        <AddPotForm />
      </DialogContent>
    </Dialog>
  );
};
