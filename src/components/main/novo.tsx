import endpoint from "@/modules/helpers/endpoint.helpers";
import { useEffect, useState } from "react";

export default function Novo() {

    const smsResult:any[]=[
        {sms:'Registado com sucesso',css:'sms_result sucess'},
        {sms:'Cancelado com sucesso',css:'sms_result cancel'},,
        {sms:'Ocorreu um erro ao registar',css:'sms_result error'}
    ];
    const [smsVisible,setSmsVisible]=useState<boolean>(false);
    const [smsCss,setSmsCss]=useState<string>('sms_result');
    const [smsR,setSmsR]=useState<string>('');
    //const [idAuto,setidAuto]=useState<string>('');

    async function onSubmitForm(e:any){
        e.preventDefault();
        
        const dataForm=new FormData(e.target);
        //dataForm.append("nome",document.getElementById("").value)
        const data=JSON.stringify(
            Object.fromEntries(dataForm));
            
        await fetch(endpoint.add,{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:data
        })
        .then(res=>res.json()).then(res=>{
            //console.log(res);
            
            if(res.status==200){
                smsForm(0);
            }
            else{
                smsForm(2);
                //alert(res.message)
            }

        }).catch((error)=>{console.log('Error: '+error)});
        
    };

    function smsForm(value:number){
        if(smsVisible){
            setSmsCss(smsResult[value].css);
            setSmsR(smsResult[value].sms);
        }else{
            setSmsCss(smsResult[value].css);
            setSmsR(smsResult[value].sms);
            setSmsVisible(!smsVisible)
        }
    }

    useEffect(()=>{
        //setidAuto('DRTOP'+Math.round(Math.random()*9999));
    },[]);

    return (
        <div className="principal">
            
            
            <form className="form_novo" method="post" 
            onSubmit={(e)=>onSubmitForm(e)}>
                
                {smsVisible&&(
                    <div className={smsCss}>
                        <span>{smsR}</span>
                        <span onClick={()=>setSmsVisible(!smsVisible)}>X</span>
                    </div>
                )}
                

                <div className="elementosForm">
                    {/* <div className="campoForm">
                        <label>ID</label>
                        <input type="text"name="f_id" id="f_id" readOnly value={idAuto}/>
                    </div> */}
                    <div className="campoForm">
                        <label>Nome</label>
                        <input type="text"name="nome" id="nome" required/>
                    </div>
                    <div className="campoForm">
                        <label>Email</label>
                        <input type="email"name="email" id="email" required/>
                    </div>
                    <div className="campoForm">
                        <label>Telefone</label>
                        <input type="tel"name="tel" id="tel"/>
                    </div>
                    {/* <div className="campoForm">
                        <label>Telefone 2</label>
                        <input type="tel"name="f_telefone_2" id="f_telefone_2"/>
                    </div> */}
                    <div className="campoForm">
                        <label>Data de Nascimento</label>
                        <input type="date"name="dataNasc" id="dataNasc" required/>
                    </div>
                </div>
                <div className="botoesForm">
                    <button type="submit">Gravar</button>
                    <button type="reset"
                    onClick={()=>smsForm(1)}>Cancelar</button>
                </div>

            </form>
            
        </div>
    );
}
