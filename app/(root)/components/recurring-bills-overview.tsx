import Image from "next/image";
import Link from "next/link";

import caretRight from "@/public/icon-caret-right.svg";

export const RecurringBillsOverview = () => {
  return (
    <section className="space-y-8 rounded-xl bg-white p-8">
      <div className="flex items-center justify-between">
        <h4 className="text-preset-2 text-grey-900">Recurring Bills</h4>
        <Link
          href="/recurring-bills"
          className="text-preset-4 flex items-center gap-3 text-grey-500"
        >
          See Details <Image src={caretRight} alt="" />
        </Link>
      </div>
      <div className="space-y-3">
        <div className="text-preset-4 flex items-center justify-between rounded-md border-l-4 border-green bg-beige-100 px-4 py-5">
          <p className="text-grey-500">Paid Bills</p>
          <p className="font-bold text-grey-900">$190.00</p>
        </div>
        <div className="text-preset-4 flex items-center justify-between rounded-md border-l-4 border-green bg-beige-100 px-4 py-5">
          <p className="text-grey-500">Paid Bills</p>
          <p className="font-bold text-grey-900">$190.00</p>
        </div>
        <div className="text-preset-4 flex items-center justify-between rounded-md border-l-4 border-green bg-beige-100 px-4 py-5">
          <p className="text-grey-500">Paid Bills</p>
          <p className="font-bold text-grey-900">$190.00</p>
        </div>
      </div>
    </section>
  );
};
