import { getBudgetCategories } from "@/actions/budgets";
import { AddTransaction } from "./components/add-transaction";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { getTransactions } from "@/actions/transactions";

export default async function TransactionsPage() {
  const transactions = await getTransactions();
  const categories = await getBudgetCategories();

  const transformedTransactions = transactions.map((transaction) => {
    return {
      name: transaction.name,
      transactionDate: new Date(transaction.date).toLocaleDateString(),
      category: transaction.category,
      amount: Number(transaction.amount),
    };
  });
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-preset-1 font-bold text-grey-900">Transactions</h1>
        <AddTransaction categories={categories} />
      </div>
      <DataTable columns={columns} data={transformedTransactions} />
    </section>
  );
}
