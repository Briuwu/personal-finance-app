import Image from "next/image";
import Link from "next/link";
import data from "@/lib/data.json";

import caretRight from "@/public/icon-caret-right.svg";
import { cn } from "@/lib/utils";

export const TransactionsOverview = () => {
  return (
    <section className="space-y-8 rounded-xl bg-white p-8">
      <div className="flex items-center justify-between">
        <h3 className="text-preset-2 text-grey-900">Transactions</h3>
        <Link
          href="/pots"
          className="text-preset-4 flex items-center gap-3 text-grey-500"
        >
          See Details <Image src={caretRight} alt="" />
        </Link>
      </div>
      <div className="divide-y">
        {data.transactions.slice(0, 10).map((transaction, idx) => {
          const date = new Date(transaction.date);
          const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
          return (
            <div key={idx} className="flex items-center gap-4 py-5">
              <Image
                src={transaction.avatar
                  .slice(1)
                  .replaceAll("/assets/images", "")}
                alt={transaction.name}
                width={160}
                height={160}
                className="h-8 w-8 rounded-full bg-beige-100"
              />
              <p className="text-preset-4 font-bold text-grey-900">
                {transaction.name}
              </p>
              <div className="ml-auto">
                <p
                  className={cn(
                    "text-preset-4 font-bold",
                    transaction.amount < 0 ? "text-grey-900" : "text-green",
                  )}
                >
                  {transaction.amount < 0
                    ? `-$${Math.abs(transaction.amount)}`
                    : `+$${transaction.amount}`}
                </p>
                <p className="text-preset-5 text-grey-500">{formattedDate}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
