"use client";
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

const formSchema = z.object({
  category: z.string(),
  maximum: z.number().min(1),
  theme: z.string(),
});

export const AddBudgetForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      maximum: 0,
      theme: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-preset-5 font-bold text-grey-500">
                Budget Category
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select a category..."
                      className="text-preset-4 placeholder:text-preset-4 py-3 text-grey-900 placeholder:text-grey-900"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[300px] overflow-auto">
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="bills">Bills</SelectItem>
                  <SelectItem value="groceries">Groceries</SelectItem>
                  <SelectItem value="dining-out">Dining Out</SelectItem>
                  <SelectItem value="transportation">Transportation</SelectItem>
                  <SelectItem value="personal-care">Personal Care</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maximum"
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
                  className="text-preset-4 placeholder:text-preset-4 py-3 text-grey-900 placeholder:text-grey-900"
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select a theme..."
                      className="text-preset-4 placeholder:text-preset-4 py-3 text-grey-900 placeholder:text-grey-900"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[300px] overflow-auto">
                  <SelectItem value="red">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-red" />
                      <span>Red</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="purple">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-purple" />
                      <span>Purple</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="turquoise">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-turquoise" />
                      <span>Turquoise</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="brown">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-brown" />
                      <span>Brown</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="magenta">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-magenta" />
                      <span>Magenta</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="blue">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-blue" />
                      <span>Blue</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="grey">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-navy-grey" />
                      <span>Grey</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="army">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-army-green" />
                      <span>Army</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="pink">
                    <div className="flex items-center gap-3">
                      <div className="bg-pink h-4 w-4 rounded-full" />
                      <span>Pink</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="yellow">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-yellow" />
                      <span>Yellow</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="orange">
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
