import { Balances } from "./components/balances";

export default function Home() {
  return (
    <div>
      <h1 className="text-grey-900 text-preset-1">Overview</h1>
      <Balances />
    </div>
  );
}
