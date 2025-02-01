"use client";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { updatePot } from "@/actions/pots";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

const formSchema = z.object({
  name: z.string(),
  target: z.string().regex(/^\d+(\.\d{1,2})?$/),
  theme: z.string(),
});

type Props = {
  name: string;
  target: string;
  theme: string;
  potId: number;
};

export const EditPot = ({ name, target, theme, potId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      target,
      theme,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        await updatePot(potId, values);
        toast.success("Pot edited successfully");
        setOpen(false);
      } catch (error) {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form. Please try again.");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="text-preset-4 w-full justify-start py-0 text-grey-900"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-5">
          <DialogTitle className="text-preset-2 lg:text-preset-1 text-grey-900">
            Edit Pot
          </DialogTitle>
          <DialogDescription>
            If your saving targets change, feel free to update your pots.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-preset-5 font-bold text-grey-500">
                    Pot Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Savings"
                      {...field}
                      className="text-preset-4 placeholder:text-preset-4 py-3 text-grey-900 placeholder:text-grey-500"
                      disabled={isPending}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="target"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-preset-5 font-bold text-grey-500">
                    Maximum Spend
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Input an amount..."
                      type="number"
                      {...field}
                      className="text-preset-4 placeholder:text-preset-4 py-3 text-grey-900 placeholder:text-grey-500"
                      disabled={isPending}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-preset-5 font-bold text-grey-500">
                    Theme
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select a theme..."
                          className="text-preset-4 placeholder:text-preset-4 py-3 text-grey-900 placeholder:text-grey-500"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[300px] overflow-auto">
                      <SelectItem value="#c94736">
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-4 rounded-full bg-red" />
                          <span>Red</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="#826cb0">
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-4 rounded-full bg-purple" />
                          <span>Purple</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="#597c7c">
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-4 rounded-full bg-turquoise" />
                          <span>Turquoise</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="#93674f">
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-4 rounded-full bg-brown" />
                          <span>Brown</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="#934f6f">
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-4 rounded-full bg-magenta" />
                          <span>Magenta</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="#3f82b2">
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-4 rounded-full bg-blue" />
                          <span>Blue</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="#97a0ac">
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-4 rounded-full bg-navy-grey" />
                          <span>Grey</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="#7f9161">
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-4 rounded-full bg-army-green" />
                          <span>Army</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="#af81ba">
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-4 rounded-full bg-pink" />
                          <span>Pink</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="#f2cdac">
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-4 rounded-full bg-yellow" />
                          <span>Yellow</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="#be6c49">
                        <div className="flex items-center gap-3">
                          <div className="h-4 w-4 rounded-full bg-orange" />
                          <span>Orange</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isPending}
              className="text-preset-4 h-auto w-full py-4 font-bold text-white"
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
