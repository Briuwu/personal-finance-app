import { BudgetsPieChart } from "@/components/budget-piechart";
import { AllBudgets } from "./components/all-budgets";
import { BudgetSummary } from "./components/budget-summary";
import { AddBudgetBtn } from "./components/add-budget-btn";

export default function BudgetPage() {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-preset-1 font-bold text-grey-900">Budgets</h1>
        <AddBudgetBtn />
      </div>
      <div className="grid gap-6 lg:grid-cols-[.5fr,1fr]">
        <div className="grid space-y-8 rounded-xl bg-white px-5 py-6 md:grid-cols-2 lg:grid-cols-1">
          <BudgetsPieChart />
          <BudgetSummary />
        </div>
        <AllBudgets />
      </div>
    </section>
  );
}
