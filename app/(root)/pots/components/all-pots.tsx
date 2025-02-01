import { PotSelect } from "@/db/schema";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ellipsisIcon from "@/public/icon-ellipsis.svg";
import { Progress } from "@/components/ui/progress";
import { AddMoney } from "./add-money";
import { WithdrawMoney } from "./withdraw-money";

type Props = {
  pots: PotSelect[];
};

export const AllPots = ({ pots }: Props) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {pots.length === 0 ? (
        <div className="col-span-full flex h-64 items-center justify-center text-grey-500">
          No pots yet
        </div>
      ) : (
        pots.map((pot) => {
          return (
            <div key={pot.id} className="space-y-8 rounded-xl bg-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: pot.theme }}
                  />
                  <h3 className="text-preset-2 font-bold text-grey-900">
                    {pot.name}
                  </h3>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"}>
                      <Image src={ellipsisIcon} alt="" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel className="sr-only">
                      Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem className="text-preset-4 text-grey-900">
                      Edit Pot
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-preset-4 text-red">
                      Delete Pot
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-preset-4 text-grey-500">Total Saved</p>
                  <p className="text-preset-1 font-bold text-grey-900">
                    ${pot.total}
                  </p>
                </div>

                <Progress
                  value={(Number(pot.total) / Number(pot.target)) * 100}
                  className="h-2 rounded bg-beige-100"
                  innerClassName={pot.theme}
                />

                <div className="flex items-center justify-between">
                  <p className="text-preset-5 font-bold text-grey-500">
                    {((Number(pot.total) / Number(pot.target)) * 100).toFixed(
                      2,
                    )}
                    %
                  </p>
                  <p className="text-preset-5 text-grey-500">
                    Target of ${pot.target}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 items-center gap-4">
                <AddMoney
                  name={pot.name}
                  total={pot.total}
                  target={pot.target}
                  theme={pot.theme}
                  potId={pot.id}
                />
                <WithdrawMoney
                  name={pot.name}
                  total={pot.total}
                  target={pot.target}
                  theme={pot.theme}
                  potId={pot.id}
                />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
