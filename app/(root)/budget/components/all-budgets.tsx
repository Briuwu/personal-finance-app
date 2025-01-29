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
import { BudgetSelect, TransactionSelect } from "@/db/schema";

type Budgets = Omit<BudgetSelect, "userId" | "createdAt"> & {
  amount: number;
  transactions: TransactionSelect[];
};

type Props = {
  budgets: Budgets[];
};

export const AllBudgets = ({ budgets }: Props) => {
  return (
    <div className="space-y-6">
      {budgets.map((budget) => {
        const totalSpent = budget.transactions.reduce(
          (acc, transaction) =>
            Number(transaction.amount) < 0
              ? acc + Math.abs(Number(transaction.amount))
              : acc,
          0,
        );

        const totalMaximum = budget.transactions.reduce(
          (acc, transaction) =>
            Number(transaction.amount) > 0
              ? acc + Number(transaction.amount)
              : acc,
          Number(budget.maximum),
        );
        return (
          <div className="space-y-5 rounded-xl bg-white p-8" key={budget.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-4 w-4 rounded-full bg-green" />
                <h3 className="text-preset-3 text-grey-900">
                  {budget.category.charAt(0).toUpperCase() +
                    budget.category.slice(1)}
                </h3>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"}>
                    <Image src={ellipsisIcon} alt="" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="sr-only">
                    Actions
                  </DropdownMenuLabel>
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
              <span className="text-preset-4 text-grey-500">
                Maximum of ${totalMaximum}
              </span>
              <Progress
                value={(totalSpent / totalMaximum) * 100}
                className="h-8 rounded bg-beige-100"
                innerClassName="bg-green"
              />
              <div className="grid grid-cols-2">
                <div className="space-y-1 border-l-4 border-green pl-4">
                  <p className="text-preset-5 text-grey-500">Spent</p>
                  <p className="text-preset-4 font-bold text-grey-900">
                    ${totalSpent}
                  </p>
                </div>
                <div className="space-y-1 border-l-4 border-beige-100 pl-4">
                  <p className="text-preset-5 text-grey-500">Remaining</p>
                  <p className="text-preset-4 font-bold text-grey-900">
                    ${totalMaximum - totalSpent}
                  </p>
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
                {budget.transactions.length > 0 ? (
                  budget.transactions.map((transaction) => {
                    const amount = Number(transaction.amount);
                    const isNegative = amount < 0;

                    return (
                      <div
                        className="flex items-center justify-between py-3"
                        key={transaction.id}
                      >
                        <p className="text-preset-5 font-bold text-gray-900">
                          {transaction.name}
                        </p>
                        <div className="text-right">
                          <p className="text-preset-5 font-bold text-grey-900">
                            {isNegative ? "-$" : "$"}
                            {Math.abs(amount)}
                          </p>
                          <p className="text-preset-5 text-grey-500">
                            {new Date(transaction.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center py-3">
                    <p className="text-preset-5 text-grey-500">
                      No transactions yet
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
