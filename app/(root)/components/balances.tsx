const items = [
  {
    id: 1,
    title: "Current Balance",
    amount: "4,836.00",
  },
  {
    id: 2,
    title: "Income",
    amount: "3,814.25",
  },
  {
    id: 3,
    title: "Expenses",
    amount: "1,700.50",
  },
];
export const Balances = () => {
  return (
    <section className="contai my-8 grid gap-3 md:grid-cols-3 md:gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="first:bg-grey-900 rounded-xl bg-white p-5 first:text-white"
        >
          <p className="text-preset-4">{item.title}</p>
          <p className="text-preset-1">${item.amount}</p>
        </div>
      ))}
    </section>
  );
};
