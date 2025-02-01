import { getBudgets } from "@/actions/budgets";
import { Balances } from "./components/balances";
import { BudgetsOverview } from "./components/budgets-overview";
import { PotsOverview } from "./components/pots-overview";
import { RecurringBillsOverview } from "./components/recurring-bills-overview";
import { TransactionsOverview } from "./components/transactions-overview";
import { getTransactions } from "@/actions/transactions";
import { getAllPots } from "@/actions/pots";

export default async function Home() {
  const [budgets, transactions, pots] = await Promise.all([
    getBudgets(),
    getTransactions(),
    getAllPots(),
  ]);

  return (
    <div>
      <h1 className="text-preset-1 text-grey-900">Overview</h1>
      <Balances />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <PotsOverview pots={pots} />
          <TransactionsOverview transactions={transactions} />
        </div>
        <div className="space-y-4">
          <BudgetsOverview budgets={budgets} />
          <RecurringBillsOverview />
        </div>
      </div>
    </div>
  );
}
