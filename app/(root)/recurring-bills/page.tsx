import { getRecurringTransactions } from "@/actions/transactions";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { RecurringBillsOverview } from "./components/recurring-bills-overview";

export default async function RecurringBillsPage() {
  const recurringData = await getRecurringTransactions();

  const transformedData = recurringData.map((transaction) => {
    return {
      billTitle: transaction.name,
      dueDate: transaction.date,
      amount: Number(transaction.amount),
    };
  });
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-preset-1 font-bold text-grey-900">
          Recurring Bills
        </h1>
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[.5fr,1fr]">
        <RecurringBillsOverview />
        <DataTable columns={columns} data={transformedData} />
      </div>
    </section>
  );
}
