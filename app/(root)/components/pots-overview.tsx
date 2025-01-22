import Image from "next/image";
import Link from "next/link";
import caretRight from "@/public/icon-caret-right.svg";
import pot from "@/public/icon-pot.svg";
import { cn } from "@/lib/utils";

const items = [
  {
    id: 1,
    title: "Savings",
    amount: "159",
    theme: "border-green",
  },
  {
    id: 2,
    title: "Gift",
    amount: 40,
    theme: "border-navy",
  },
  {
    id: 3,
    title: "Concert Ticket",
    amount: 110,
    theme: "border-cyan",
  },
  {
    id: 4,
    title: "New Laptop",
    amount: 10,
    theme: "border-yellow",
  },
];

export const PotsOverview = () => {
  return (
    <section className="space-y-5 rounded-xl bg-white p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-preset-2 text-grey-900">Pots</h2>
        <Link
          href="/pots"
          className="text-preset-4 flex items-center gap-3 text-grey-500"
        >
          See Details <Image src={caretRight} alt="" />
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex items-center gap-4 rounded-xl bg-beige-100 px-4 py-5">
          <Image src={pot} alt="Pot Icon" />
          <div className="space-y-3">
            <p className="text-preset-4 text-grey-500">Total Saved</p>
            <p className="text-preset-1 text-grey-900">$850</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={cn("rounded-lg border-l-4 px-4", item.theme)}
            >
              <p className="text-preset-5 text-grey-500">{item.title}</p>
              <p className="text-preset-4 font-bold text-grey-900">
                ${item.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
