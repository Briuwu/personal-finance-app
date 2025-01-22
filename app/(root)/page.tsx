import { Balances } from "./components/balances";
import { BudgetsOverview } from "./components/budgets-overview";
import { PotsOverview } from "./components/pots-overview";
import { TransactionsOverview } from "./components/transactions-overview";

export default function Home() {
  return (
    <div>
      <h1 className="text-preset-1 text-grey-900">Overview</h1>
      <Balances />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <PotsOverview />
          <TransactionsOverview />
        </div>
        <div className="space-y-4">
          <BudgetsOverview />
        </div>
      </div>
    </div>
  );
}
