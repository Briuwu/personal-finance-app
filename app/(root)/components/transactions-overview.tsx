import Image from "next/image";
import Link from "next/link";

import caretRight from "@/public/icon-caret-right.svg";
import { cn } from "@/lib/utils";
import { TransactionSelect } from "@/db/schema";

type Props = {
  transactions: TransactionSelect[];
};

export const TransactionsOverview = ({ transactions }: Props) => {
  return (
    <section className="space-y-8 rounded-xl bg-white p-8">
      <div className="flex items-center justify-between">
        <h3 className="text-preset-2 text-grey-900">Transactions</h3>
        <Link
          href="/transactions"
          className="text-preset-4 flex items-center gap-3 text-grey-500"
        >
          See Details <Image src={caretRight} alt="" />
        </Link>
      </div>
      <div className="h-full max-h-[410px] min-h-[438px] divide-y overflow-auto">
        {transactions.length > 0 ? (
          transactions.slice(0, 10).map((transaction) => {
            const date = new Date(transaction.date);
            const formattedDate = date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });
            return (
              <div
                key={transaction.id}
                className="flex items-center gap-4 py-5"
              >
                <p className="text-preset-4 font-bold text-grey-900">
                  {transaction.name}
                </p>
                <div className="ml-auto">
                  <p
                    className={cn(
                      "text-preset-4 font-bold",
                      Number(transaction.amount) < 0
                        ? "text-grey-900"
                        : "text-green",
                    )}
                  >
                    {Number(transaction.amount) < 0
                      ? `-$${Math.abs(Number(transaction.amount))}`
                      : `+$${Number(transaction.amount)}`}
                  </p>
                  <p className="text-preset-5 text-grey-500">{formattedDate}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-preset-4 py-5 text-center text-grey-500">
            No transactions found
          </p>
        )}
      </div>
    </section>
  );
};
