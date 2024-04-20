import CompForm from "@/components/CompForm";
import TabelaImc from "@/components/TabelaImc";
import Link from "next/link";
import { useState } from "react"

export default function Calcimc(){

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

    return(
        <div className="flex flex-col border border-black w-[300px] gap-5">
            <p className="w-full text-center bg-zinc-400 font-bold text-lg">Calculo do IMC</p>
            <CompForm label="Peso" state={peso} funcao={setPeso}/>
            <CompForm label="Altura" state={altura} funcao={setAltura}/>

            <button className="bg-indigo-900 text-white mx-2 p-1 rounded-lg cursor-pointer" onClick={calcular}>Calcular</button>

            {(imc>0)&&(
                <Link className="bg-indigo-500 text-white font-bold text-center mx-2 p-1 rounded-lg cursor-pointer" 
                href={
                    {
                        pathname:"/dadosimc/dadosimc",
                        query:{peso:peso,altura:altura,imc:imc}
                    }
                }
                >Gravar</Link>
            )}

            <p className="bg-zinc-100 p-1">Resultado: {imc.toFixed(2)}</p>

            <TabelaImc imc={imc}/>

        </div>
    )
}