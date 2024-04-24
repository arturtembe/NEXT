import CompForm from "@/components/CompForm";
import TabelaImc from "@/components/TabelaImc";
import Link from "next/link";
import { useState } from "react"

const calc=()=>{
    const [peso,setPeso]=useState<number>(0);
    const [altura,setAltura]=useState<number>(0);
    const [imc,setImc]=useState<number>(0);

    let resultado:string='0';

    function calcular(){
        
        if(peso==0){
            setImc(0);

            return;
        }
        if(altura==0){
            setImc(0);

            return;    
        }
        let res=peso/(altura*altura)
        setImc(res);
    }

    return {peso,altura,imc,setPeso,setAltura,setImc,calcular,resultado}
}

export default function Calcimc(){

    const {peso,altura,imc,setPeso,setAltura,calcular}=calc();

    return(
        <div className="w-full h-full flex justify-start items-center flex-col  pl-[2%] pr-[2%] pt-[2%]">
            
            <header className="w-full header_continue">
                <a href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path fill="#fff" d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
                </a>
                <h1>IMC</h1>
            </header>

            <div className="flex flex-col border w-[300px] gap-5 mt-5 box-shadow-local">
                <p className="w-full text-center bg-zinc-400 font-bold text-lg">Calculo do IMC</p>
                
                <CompForm label="Peso" state={peso} funcao={setPeso}/>
                <CompForm label="Altura" state={altura} funcao={setAltura}/>

                <button className="bg-indigo-900 text-white mx-2 p-1 rounded-lg cursor-pointer" onClick={calcular}>Calcular</button>

                {(imc>0)&&(
                    <Link className="bg-indigo-500 text-white font-bold text-center mx-2 p-1 rounded-lg cursor-pointer" 
                    href={
                        {
                            pathname:"/dadosimc",
                            query:{peso:peso,altura:altura,imc:imc}
                        }
                    }
                    >Gravar</Link>
                )}

                <p className="bg-zinc-100 p-1">Resultado: {imc.toFixed(2)}</p>

                <TabelaImc imc={imc}/>

            </div>

        </div>
    )
}