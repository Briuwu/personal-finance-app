import Image from "next/image";
import Link from "next/link";

import caretRight from "@/public/icon-caret-right.svg";
import { BudgetsPieChart } from "@/app/(root)/budget/components/budget-piechart";
import { cn } from "@/lib/utils";
import { BudgetSelect, TransactionSelect } from "@/db/schema";

type Budgets = Omit<BudgetSelect, "userId" | "createdAt"> & {
  amount: number;
  transactions: TransactionSelect[];
};

type Props = {
  budgets: Budgets[];
};

export const BudgetsOverview = ({ budgets }: Props) => {
  return (
    <section className="flex flex-col rounded-xl bg-white p-8 md:min-h-[450px]">
      <div className="flex items-center justify-between">
        <h4 className="text-preset-2 text-grey-900">Budgets</h4>
        <Link
          href="/budgets"
          className="text-preset-4 flex items-center gap-3 text-grey-500"
        >
          See Details <Image src={caretRight} alt="" />
        </Link>
      </div>
      <div className="my-auto grid md:grid-cols-[1fr,.35fr]">
        {budgets.length > 0 && (
          <BudgetsPieChart budgets={budgets} isOverview={true} />
        )}
        <div className="grid grid-cols-2 grid-rows-4 gap-4 md:grid-cols-1">
          {budgets.length > 0 ? (
            budgets.slice(0, 4).map((budget, idx) => (
              <div
                key={idx}
                style={{
                  borderColor: budget.theme,
                }}
                className={cn("rounded-lg border-l-4 px-4")}
              >
                <p className="text-preset-5 text-grey-500">
                  {budget.category.charAt(0).toUpperCase() +
                    budget.category.slice(1)}
                </p>
                <p className="text-preset-4 font-bold text-grey-900">
                  ${budget.maximum}
                </p>
              </div>
            ))
          ) : (
            <p className="text-preset-4 col-span-full py-5 text-left text-grey-500">
              No budgets found
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
