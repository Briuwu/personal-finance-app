const items = [
  {
    id: 1,
    name: "Bills",
    amount: 250,
    total: 750,
    theme: "var(--cyan)",
  },
  {
    id: 2,
    name: "Entertainment",
    amount: 150,
    total: 300,
    theme: "var(--green)",
  },
  {
    id: 3,
    name: "Dining Out",
    amount: 50,
    total: 100,
    theme: "var(--yellow)",
  },
  {
    id: 4,
    name: "Personal Care",
    amount: 100,
    total: 200,
    theme: "var(--navy)",
  },
];

export const BudgetSummary = () => {
  return (
    <div>
      <h2 className="text-preset-2 font-bold text-grey-900">
        Spending Summary
      </h2>
      <div className="my-4 divide-y-2">
        {items.map((item) => {
          const formattedAmount = item.amount.toFixed(2);
          const formattedTotal = item.total.toFixed(2);
          return (
            <div className="py-4" key={item.id}>
              <div
                style={{
                  borderColor: item.theme,
                }}
                className="flex items-center justify-between border-l-4 pl-4"
              >
                <p className="text-preset-4 text-grey-500">{item.name}</p>
                <p className="text-preset-5 text-grey-500">
                  <span className="text-preset-3 text-grey-900">
                    ${formattedAmount}
                  </span>{" "}
                  of ${formattedTotal}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
