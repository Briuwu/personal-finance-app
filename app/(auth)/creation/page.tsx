import Image from "next/image";
import logo from "@/public/logo-large.svg";
import { UsernameForm } from "./username-form";

export default function CreationPage() {
  return (
    <div className="grid min-h-screen grid-rows-[auto,1fr] bg-beige-100">
      <header className="flex w-full items-center justify-center justify-self-start rounded-b-md bg-grey-900 py-6">
        <Image src={logo} alt="" />
      </header>
      <div className="self-center px-4">
        <div className="mx-auto w-full max-w-[375px] rounded-xl bg-white px-5 py-6">
          <h1 className="text-preset-2 text-center font-bold">User Creation</h1>
          <UsernameForm />
        </div>
      </div>
    </div>
  );
}
