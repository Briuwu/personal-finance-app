import { BudgetSelect, TransactionSelect } from "@/db/schema";

type Budgets = Omit<BudgetSelect, "userId" | "createdAt"> & {
  amount: number;
  transactions: TransactionSelect[];
};

type Props = {
  budgets: Budgets[];
};

export const BudgetSummary = ({ budgets }: Props) => {
  return (
    <div>
      <h2 className="text-preset-2 font-bold text-grey-900">
        Spending Summary
      </h2>
      <div className="my-4 divide-y-2">
        {budgets.length > 0 ? (
          budgets.map((item) => {
            const totalSpent = item.transactions.reduce(
              (acc, transaction) =>
                Number(transaction.amount) < 0
                  ? acc + Math.abs(Number(transaction.amount))
                  : acc,
              0,
            );

            const totalMaximum = item.transactions.reduce(
              (acc, transaction) =>
                Number(transaction.amount) > 0
                  ? acc + Number(transaction.amount)
                  : acc,
              Number(item.maximum),
            );
            return (
              <div className="py-4" key={item.id}>
                <div
                  style={{
                    borderColor: item.theme,
                  }}
                  className="flex items-center justify-between border-l-4 pl-4"
                >
                  <p className="text-preset-4 text-grey-500">
                    {item.category.charAt(0).toUpperCase() +
                      item.category.slice(1)}
                  </p>
                  <p className="text-preset-5 text-grey-500">
                    <span className="text-preset-3 text-grey-900">
                      ${totalSpent}
                    </span>{" "}
                    of ${totalMaximum}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-4">
            <p className="text-preset-4 text-grey-500">No budgets found</p>
          </div>
        )}
      </div>
    </div>
  );
};
