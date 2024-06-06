import endpoint from "@/modules/helpers/endpoint.helpers";
import { useState } from "react";

interface editarProps{
    popup:boolean,
    setPopup:any,
    dadosEditar:any,
    setDadosEditar:any
    countEditar:number,
    setCountEditar:any
}

export default function Editar(props:editarProps) {

    const smsResult:any[]=[
        {sms:'Editado com sucesso',css:'sms_result sucess'},
        {sms:'Cancelado com sucesso',css:'sms_result cancel'},,
        {sms:'Ocorreu um erro ao editar',css:'sms_result error'}
    ];
    const [smsVisible,setSmsVisible]=useState<boolean>(false);
    const [smsCss,setSmsCss]=useState<string>('sms_result');
    const [smsR,setSmsR]=useState<string>('');
    
    const [_id,setId]=useState<string>(props.dadosEditar.id);
    const [nome,setNome]=useState<string>(props.dadosEditar.nome);
    const [email,setEmail]=useState<string>(props.dadosEditar.email);
    const [tel,setTel]=useState<string>(props.dadosEditar.tel);
    const [dataNascimento,setDataNascimento]=useState<string>(props.dadosEditar.dataNasc);

    async function onSubmitForm(e:any){
        e.preventDefault();
        
        const dataForm=new FormData(e.target);
        const data=JSON.stringify(
            Object.fromEntries(dataForm));

        await fetch(`${endpoint.edit}/${_id}`,{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:data
        })
        .then(res=>res.json()).then(res=>{
            
            if(res.status==200){
                props.setCountEditar(props.countEditar+1);
                fecharPopup();
            }else{
                alert(res.message);
            }
            
            /*
            if(typeof parseInt(res)=='number'){
                //smsForm(parseInt(res));
                //console.log(res)
                props.setCountEditar(props.countEditar+1);
                fecharPopup()
            }
            else{
                console.log('Ocorreu um erro ao obter resposa: '+res);
            }
            */
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

    function fecharPopup(){
        props.setPopup(!props.popup);
    }

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
                        <input type="hidden" name="id" value={_id}/>
                        <label>ID</label>
                        <input type="text"name="f_id" id="f_id"
                        value={idAuto} onChange={e=>setidAuto(e.target.value)} readOnly/>
                    </div> */}
                    <div className="campoForm">
                        <label>Nome</label>
                        <input type="text"name="nome" id="nome"
                        value={nome} onChange={e=>setNome(e.target.value)} required/>
                    </div>
                    <div className="campoForm">
                        <label>Email</label>
                        <input type="email"name="email" id="email"
                        value={email} onChange={e=>setEmail(e.target.value)} required/>
                    </div>
                    <div className="campoForm">
                        <label>Telefone 1</label>
                        <input type="tel"name="tel" id="tel"
                        value={tel} onChange={e=>setTel(e.target.value)}/>
                    </div>
                    {/* <div className="campoForm">
                        <label>Telefone 2</label>
                        <input type="tel"name="f_telefone_2" id="f_telefone_2"
                        value={tel_2} onChange={e=>setTel_2(e.target.value)}/>
                    </div> */}
                    <div className="campoForm">
                        <label>Data de Nascimento</label>
                        <input type="date"name="dataNasc" id="dataNasc" value={dataNascimento} 
                        onChange={e=>setDataNascimento(e.target.value)} required/>
                    </div>
                </div>
                <div className="botoesForm">
                    <button type="submit">Editar</button>
                    <button type="reset"
                    onClick={fecharPopup}>Cancelar</button>
                </div>

            </form>
            
        </div>
    );
}
