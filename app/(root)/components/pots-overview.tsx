import Image from "next/image";
import Link from "next/link";
import caretRight from "@/public/icon-caret-right.svg";
import pot from "@/public/icon-pot.svg";
import { PotSelect } from "@/db/schema";

type Props = {
  pots: PotSelect[];
};

export const PotsOverview = ({ pots }: Props) => {
  const totalSaved = pots
    .slice(0, 4)
    .reduce((acc, pot) => acc + Number(pot.total), 0);
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
            <p className="text-preset-1 text-grey-900">${totalSaved}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          {pots.length > 0 ? (
            pots.slice(0, 4).map((item) => (
              <div
                key={item.id}
                style={{
                  borderColor: item.theme,
                }}
                className="rounded-lg border-l-4 px-4"
              >
                <p className="text-preset-5 text-grey-500">{item.name}</p>
                <p className="text-preset-4 font-bold text-grey-900">
                  ${item.total}
                </p>
              </div>
            ))
          ) : (
            <p className="text-preset-4 py-5 text-center text-grey-500">
              No pots found
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
