import Image from "next/image";

import icon from "@/public/icon-recurring-bills.svg";

export const RecurringBillsOverview = () => {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-1">
      <div className="flex gap-5 rounded-xl bg-grey-900 p-6 sm:items-center md:flex-col md:items-start md:gap-8">
        <Image src={icon} alt="" />
        <div className="space-y-3">
          <p className="text-preset-4 text-white">Total bills</p>
          <p className="text-preset-1 text-white">$384.98</p>
        </div>
      </div>
      <div className="rounded-xl bg-white p-5">
        <p className="text-preset-3 text-grey-900">Summary</p>
        <div className="divide-y-2">
          <div className="flex items-center justify-between py-4">
            <p className="text-preset-5 text-grey-500">Paid Bills</p>
            <p className="text-preset-5 font-bold text-grey-900">2 ($320.00)</p>
          </div>
          <div className="flex items-center justify-between py-4">
            <p className="text-preset-5 text-grey-500">Paid Bills</p>
            <p className="text-preset-5 font-bold text-grey-900">2 ($320.00)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
