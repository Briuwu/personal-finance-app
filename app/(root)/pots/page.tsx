import { getAllPots } from "@/actions/pots";
import { AddPotsBtn } from "./components/add-pots-btn";
import { AllPots } from "./components/all-pots";

export default async function PotsPage() {
  const pots = await getAllPots();

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-preset-1 font-bold text-grey-900">Pots</h1>
        <AddPotsBtn />
      </div>
      <AllPots pots={pots} />
    </section>
  );
}
