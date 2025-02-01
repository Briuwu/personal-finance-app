import { BudgetsPieChart } from "@/app/(root)/budget/components/budget-piechart";
import { AllBudgets } from "./components/all-budgets";
import { BudgetSummary } from "./components/budget-summary";
import { AddBudgetBtn } from "./components/add-budget-btn";
import { getBudgets } from "@/actions/budgets";

export default async function BudgetPage() {
  const budgets = await getBudgets();
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-preset-1 font-bold text-grey-900">Budgets</h1>
        <AddBudgetBtn />
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[.5fr,1fr]">
        <div className="grid space-y-8 rounded-xl bg-white px-5 py-6 md:grid-cols-2 lg:grid-cols-1">
          <BudgetsPieChart budgets={budgets} />
          <BudgetSummary budgets={budgets} />
        </div>
        <AllBudgets budgets={budgets} />
      </div>
    </section>
  );
}
