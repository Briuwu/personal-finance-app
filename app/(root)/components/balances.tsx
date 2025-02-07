type Props = {
  currentBalance: number;
  income: number;
  expenses: number;
};
export const Balances = ({ currentBalance, income, expenses }: Props) => {
  return (
    <section className="contai my-8 grid gap-3 md:grid-cols-3 md:gap-6">
      <div className="rounded-xl bg-white p-5 first:bg-grey-900 first:text-white">
        <p className="text-preset-4">Current Balance</p>
        <p className="text-preset-1">${currentBalance.toFixed(2)}</p>
      </div>
      <div className="rounded-xl bg-white p-5 first:bg-grey-900 first:text-white">
        <p className="text-preset-4">Income</p>
        <p className="text-preset-1">${income.toFixed(2)}</p>
      </div>
      <div className="rounded-xl bg-white p-5 first:bg-grey-900 first:text-white">
        <p className="text-preset-4">Expenses</p>
        <p className="text-preset-1">${expenses.toFixed(2)}</p>
      </div>
    </section>
  );
};
