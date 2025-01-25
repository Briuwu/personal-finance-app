import Image from "next/image";
import Link from "next/link";
import data from "@/lib/data.json";

import caretRight from "@/public/icon-caret-right.svg";
import { BudgetsPieChart } from "@/components/budget-piechart";
import { cn } from "@/lib/utils";

export const BudgetsOverview = () => {
  const budgets = data.budgets;
  return (
    <section className="flex flex-col rounded-xl bg-white p-8 md:min-h-[450px]">
      <div className="flex items-center justify-between">
        <h4 className="text-preset-2 text-grey-900">Budgets</h4>
        <Link
          href="/pots"
          className="text-preset-4 flex items-center gap-3 text-grey-500"
        >
          See Details <Image src={caretRight} alt="" />
        </Link>
      </div>
      <div className="my-auto grid md:grid-cols-[1fr,.35fr]">
        <BudgetsPieChart />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
          {budgets.map((budget, idx) => (
            <div
              key={idx}
              style={{
                borderColor: budget.theme,
              }}
              className={cn("rounded-lg border-l-4 px-4")}
            >
              <p className="text-preset-5 text-grey-500">{budget.category}</p>
              <p className="text-preset-4 font-bold text-grey-900">
                ${budget.maximum}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
