import { HeadComponents } from "@/components/header";
import { ViewIMC } from "@/components/viewImc";

export default function Home() {
  return (
    <div className="flex w-full h-screen justify-start items-center flex-col pl-[2%] pr-[2%] pt-[2%]">
      
      {/* <HeadComponents title="Home"/> */}

      <header className="w-full header">
        <h1>IMC</h1>
        <a href="/calcimc">Adicionar</a>
      </header>

      <ViewIMC/>

    </div>
  );
}
