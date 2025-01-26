import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import data from "@/lib/data.json";

export default function TransactionsPage() {
  const transactions = data.transactions;

  const transformedTransactions = transactions.map((transaction) => {
    return {
      name: transaction.name,
      transactionDate: new Date(transaction.date).toLocaleDateString(),
      category: transaction.category,
      amount: transaction.amount,
    };
  });
  return (
    <section className="space-y-8">
      <h1 className="text-preset-1 font-bold text-grey-900">Transactions</h1>
      <DataTable columns={columns} data={transformedTransactions} />
    </section>
  );
}
