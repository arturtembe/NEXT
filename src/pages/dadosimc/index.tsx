import { useRouter } from "next/router"
import { useEffect} from "react";
import {addDadosImc} from "@/controllers/dadosImcController";
import endpointHelpers from "@/helpers/endepoint.helper";
import { HeadComponents } from "@/components/header";


export default function dadosimc(){
    
    const router=useRouter();

    const {dtdymthyrs,nome,peso,altura,imc,date,setNome,setPeso,setAltura,setImc,setDate}=addDadosImc();

    const hr:number=new Date().getHours();
    const sec:number=new Date().getMinutes();
    const min:number=new Date().getSeconds();

    const dthrsecmin=((hr<10?'0'+hr:hr)+':'+(sec<10?'0'+sec:sec)+':'+(min<10?'0'+min:min));

    useEffect(()=>{
        setNome('');
        setPeso(router.query.peso);
        setAltura(router.query.altura);
        setImc(router.query.imc);
        setDate(dtdymthyrs+' '+dthrsecmin);
    },[]);

    async function addInsert(e:any){
        e.preventDefault();
    
        //const endpoint=`https://arturtembe-my-project.000webhostapp.com/db/controllers/imc/calcimc/addCalcImcAPI.php`;
        //const endpoint=`http://localhost:3000/db/controllers/teste/api.php`;

        //const form:any=document.getElementById('form');
        
        //const dados:string=`${nome},${peso},${altura},${imc},${date}`;

        const formData:any=new FormData(e.target);
        //formData.set('data',dados);

        if(nome!=''){
            let data=await fetch(endpointHelpers.add,{
                method:"post",
                body: new URLSearchParams(formData)
            }).then(res=>res.json())
            .then(res=>{
                //console.log(res);
                return res;
            }).catch(res=>{
                console.log("ERROR: "+res);
                //return res;
            })

            await data.status==201?(location.href="/"):alert('Nao Foi possivel inserir');

        }else{alert("Nome invalido!")};
    };

    return(
        <div className="w-[100%] h-[100vh] overflow-y-auto pl-[2%] pr-[2%] pt-[2%]">
            
            <HeadComponents title="Gravar Dados" key={2}/>

            <header className="header_continue">
                <a href="/calcimc">
                    <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path fill="#fff" d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
                </a>
                <h1>IMC</h1>
            </header>
            
            <form action="" method="post" id="form"
            onSubmit={(e:any)=>addInsert(e)}>
                
                <div className="flex justify-center items-center">

                    <div className="flex flex-col gap-6 p-6 box-shadow-local margin-local">
                        
                        <div className="flex mx-2 mt-6">
                            <label className="w-[60px]">Nome:</label>
                            <input className="border p-1 w-full rounded-lg" type="text" value={nome} onChange={(e)=>setNome(e.target.value)}
                            name="nome"/>
                        </div>
                        <div className="flex mx-2">
                            <label className="w-[60px]">Peso:</label>
                            <input className="border p-1 w-full rounded-lg" type="text" value={peso} readOnly
                            name="peso"/>
                        </div>
                        <div className="flex mx-2">
                            <label className="w-[60px]">Altura:</label>
                            <input className="border p-1 w-full rounded-lg" type="text" value={altura} readOnly
                            name="altura"/>
                        </div>
                        <div className="flex mx-2">
                            <label className="w-[60px]">IMC:</label>
                            <input className="border p-1 w-full rounded-lg" type="text" value={parseFloat(imc+'').toFixed(2)} readOnly
                            name="imc"/>
                        </div>
                        <div className="flex mx-2">
                            <label className="w-[60px]">Data:</label>
                            <input className="border p-1 w-full rounded-lg" type="text" value={date} readOnly
                            name="data"/>
                        </div>
                        
                        <div className="flex w-full">
                            <button className="bg-indigo-900 w-[100%] h-[100%] text-white mx-2 p-3 rounded-lg cursor-pointer">
                                Finalizar
                            </button>
                        </div>
                    
                    </div>

                </div>

            </form>
        </div>

    )
}
