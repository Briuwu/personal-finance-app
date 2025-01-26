import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

import caretRightIcon from "@/public/icon-caret-right.svg";
import ellipsisIcon from "@/public/icon-ellipsis.svg";

export const AllBudgets = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-5 rounded-xl bg-white p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-4 w-4 rounded-full bg-green" />
            <h3 className="text-preset-3 text-grey-900">Entertainment</h3>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"}>
                <Image src={ellipsisIcon} alt="" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="sr-only">Actions</DropdownMenuLabel>
              <DropdownMenuItem className="text-preset-4 text-grey-900">
                Edit Budget
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-preset-4 text-red">
                Delete Budget
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-4">
          <span className="text-preset-4 text-grey-500">Maximum of $50.00</span>
          <Progress
            value={15}
            className="h-8 rounded bg-beige-100"
            innerClassName="bg-green"
          />
          <div className="grid grid-cols-2">
            <div className="space-y-1 border-l-4 border-green pl-4">
              <p className="text-preset-5 text-grey-500">Spent</p>
              <p className="text-preset-4 font-bold text-grey-900">$25.00</p>
            </div>
            <div className="space-y-1 border-l-4 border-beige-100 pl-4">
              <p className="text-preset-5 text-grey-500">Spent</p>
              <p className="text-preset-4 font-bold text-grey-900">$25.00</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 rounded-xl bg-beige-100 p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-preset-3 text-grey-900">Latest Spending</h4>
            <Button
              className="text-preset-4 p-0 text-grey-500"
              variant={"ghost"}
            >
              See All <Image src={caretRightIcon} alt="" />
            </Button>
          </div>
          <div className="divide-y-2">
            <div className="flex items-center justify-between py-3">
              <p className="text-preset-5 font-bold text-gray-900">
                Papa Software
              </p>
              <div className="text-right">
                <p className="text-preset-5 font-bold text-grey-900">-$10.00</p>
                <p className="text-preset-5 text-grey-500">16 Aug 2024</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <p className="text-preset-5 font-bold text-gray-900">
                Papa Software
              </p>
              <div className="text-right">
                <p className="text-preset-5 font-bold text-grey-900">-$10.00</p>
                <p className="text-preset-5 text-grey-500">16 Aug 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
