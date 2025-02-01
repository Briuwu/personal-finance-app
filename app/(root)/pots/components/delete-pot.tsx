"use client";

import { onDeletePot } from "@/actions/pots";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const DeletePot = ({ potId }: { potId: number }) => {
  const [isPending, startTransition] = useTransition();
  const handleDeletePot = () => {
    startTransition(async () => {
      try {
        await onDeletePot(potId);
        toast.success("Pot deleted successfully");
      } catch (error) {
        console.error("Failed to delete pot", error);
        toast.error("Failed to delete pot. Please try again.");
      }
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={isPending}
          variant={"ghost"}
          className="w-full justify-start py-0 text-red"
        >
          Delete Pot
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this pot? This action cannot be
            reversed, and all the data inside it will be removed forever.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeletePot}
            className="text-preset-4 bg-red font-bold text-white"
          >
            Yes, Confirm Deletion
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
