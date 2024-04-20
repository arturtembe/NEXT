import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { Z_FULL_FLUSH } from "zlib";

export default function dadosimc(){
    
    const router=useRouter();

    const dt:Date=new Date();

    const hr:number=dt.getHours();
    const sec:number=dt.getMinutes();
    const min:number=dt.getSeconds();

    const dthrsecmin=((hr<10?'0'+hr:hr)+':'+(sec<10?'0'+sec:sec)+':'+(min<10?'0'+min:min));

    const month:string[]=['Janeiro','Fevereiro','Marco','Abril','Maio','Junho','Julho','Agosto','Setembro','Octumbro','Novembro','Dezembro']

    const dtdymthyrs=dt.getDay()+' de '+month[dt.getMonth()]+' de '+dt.getFullYear();

    /*---------------------------------------- */
    const [nome,setNome]=useState<string>('');
    const [peso,setPeso]=useState<any>('');
    const [altura,setAltura]=useState<any>('');
    const [imc,setImc]=useState<any>('');
    const [date,setDate]=useState<string>('');

    const [resp,setResp]=useState<any[]>([]);

    useEffect(()=>{
        setNome('');
        setPeso(router.query.peso);
        setAltura(router.query.altura);
        setImc(router.query.imc);
        setDate(dtdymthyrs+' '+dthrsecmin);

        //fetch
        obter();

    },[]);

    function obter(){
        fetch("http://localhost:3000/select.php")
        .then(res=>res.json())
        .then(res=>{
            setResp(res);
            //console.log(res);
        })
    }

    function gridLinha(){
        
        let grid:any[]=[];
        resp.forEach((el)=>{
            grid.push(
                <div key={el.id} className="gridLinha">
                    <div>{el.nome}</div>
                    <div>{el.peso}</div>
                    <div>{el.altura}</div>
                    <div>{el.imc}</div>
                    <div>{el.data}</div>
                </div>
            )
        });

        return grid;
    }

    
    function addInsert(e:any){
        e.preventDefault();
    
        const form:any=document.getElementById('form');
        
        const dados:string=`${nome},${peso},${altura},${imc},${date}`;

        const formData=new FormData();
        formData.set('data',dados);

        nome!=''?(
            fetch(`${form.getAttribute('action')}`,{
                method:`${form.getAttribute('method')}`,
                body:formData
            })
            .then(res=>res.json())
            .then(res=>{
                res.res>0?obter():console.log('Nao Foi possivel inserir');;
                //console.log(res);
            }).catch(res=>{
                console.log("ERROR: "+res);
            })
        ):alert("Nome invalido!");
    };
    

    return(
        <form action="http://localhost:3000/insert.php" method="post" id="form"
        className="w-[100%] h-[100vh] overflow-y-auto">
            
            <div className="flex justify-center items-center">

                <div className="borg">
                    
                    <div className="flex mx-2 mt-6">
                        <label className="w-[60px]">Nome:</label>
                        <input className="border p-1 w-full rounded-lg" type="text" value={nome} onChange={(e)=>setNome(e.target.value)}/>
                    </div>
                    <div className="flex mx-2">
                        <label className="w-[60px]">Peso:</label>
                        <input className="border p-1 w-full rounded-lg" type="text" value={peso} readOnly/>
                    </div>
                    <div className="flex mx-2">
                        <label className="w-[60px]">Altura:</label>
                        <input className="border p-1 w-full rounded-lg" type="text" value={altura} readOnly/>
                    </div>
                    <div className="flex mx-2">
                        <label className="w-[60px]">IMC:</label>
                        <input className="border p-1 w-full rounded-lg" type="text" value={parseFloat(imc+'').toFixed(2)} readOnly/>
                    </div>
                    <div className="flex mx-2">
                        <label className="w-[60px]">Data:</label>
                        <input className="border p-1 w-full rounded-lg" type="text" value={date} readOnly/>
                    </div>
                    
                    <div className="flex w-full">
                        <button onClick={(e:any)=>addInsert(e)} 
                        className="bg-indigo-900 w-[100%] h-[100%] text-white mx-2 p-1 rounded-lg cursor-pointer">
                            Salvar
                        </button>
                    </div>

                    <div className="grid">
                        <div className="gridLinhasTitulos">
                            <div>Nome</div>
                            <div>Peso</div>
                            <div>Altura</div>
                            <div>IMC</div>
                            <div>Data</div>
                        </div>
                        <div className="gridLinhasDados">
                            
                            {gridLinha()}

                        </div>
                    </div>
                
                </div>

            </div>

        </form>
    )
}