import { useEffect, useState } from "react";


const view=()=>{
    const [resp,setResp]=useState<any[]>([]);
    //const endpoint:string=`http://localhost:3000/`;
    const endpoint:string=`https://arturtembe-my-project.000webhostapp.com/`;

    function obter(){

        fetch(`${endpoint}db/controllers/imc/calcimc/getCalcImcAPI.php`)
        .then(res=>res.json())
        .then(res=>{
            setResp(res);
            //console.log(res);
            //return res
        }).catch(err=>{console.log("ERROR"+err);})
    }

    function gridLinha(){
        
        let grid:any[]=[];
        //let data=;
        resp.forEach((el:any)=>{
            grid.push(
                <div key={el.id} className="gridLinha">
                    <div>{el.nome}</div>
                    <div>{el.peso}</div>
                    <div>{el.altura}</div>
                    <div>{el.imc}</div>
                    <div>{el.data}</div>
                    <div>
                        <svg onClick={()=>remove(el.id)} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                    </div>
                </div>
            )
        });
    
        return grid;
    }

    async function remove(id:number){
        
        let dataForm=new FormData();
        dataForm.append("id",`${id}`);

        let data=await fetch(`${endpoint}db/controllers/imc/calcimc/deleteCalcImcAPI.php`,{
            method:"post",
            body:dataForm
        })
        .then(res=>res.json())
        .then(res=>{
            //setResp(res);
            //console.log(res);
            return res
        }).catch(err=>{console.log("ERROR"+err);})

        if(await data[0].status==1){
            obter();
        }
    }

    return{
        useEffect,
        obter,
        gridLinha
    }
}

export function ViewIMC(){
    const{obter,gridLinha}=view();

    useEffect(()=>{
        obter();
    },[]);

    return(
        <div className="container mt-10">

            <div className="grid box-shadow-local">
                <div className="gridLinhasTitulos">
                    <div>Nome</div>
                    <div>Peso</div>
                    <div>Altura</div>
                    <div>IMC</div>
                    <div>Data</div>
                    <div></div>
                </div> 
                <div className="gridLinhasDados">
                                    
                    {gridLinha()}

                </div>
            </div>
        </div>
    )
}
