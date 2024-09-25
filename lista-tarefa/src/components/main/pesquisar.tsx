import endpoint from "@/modules/helpers/endpoint.helpers";
import { useEffect, useState } from "react";

interface pesquisarProps{
    popupEditar:boolean,
    setPopupEditar:any,
    dadosEditar:any,
    setDadosEditar:any,
    countEditar:number,
    setCountEditar:any
}

export default function Pesquisar(props:pesquisarProps) {

    const [dados,setDados]=useState<any[]>([]);
    const [pesquisa,setPesquisa]=useState<string>('');
    const [pesqSelect,setpesqSelect]=useState<string>('Nome');

    useEffect(()=>{
        getDados('');
        //console.log(props.countEditar);
    },[props.countEditar]);

    async function getDados(value:string){
        //const endpoint='http://127.0.0.1:8081/agenda/contactos'+value;

        await fetch(`${endpoint.view}${value}`)
        .then(res=>res.json())
        .then(res=>{
            
            if(res.status==200){
                setDados(res.agendas);
            }
            else{
                alert(res.message);
            }
        })
        .catch((error)=>{console.log('ERROR: '+error);})
    }

    function getDataFormat(date:string):string{

        const data=date.split(':')[0]
        const dd=data.substring(0,data.length-3).split('-');
        
        return dd[2]+'-'+dd[1]+'-'+dd[0];
    }

    function getPesquisa(e:any){
        e.preventDefault();

        pesquisa!=''?getDados(`/${pesquisa}`):getDados('');
    }

    function abrirEditar(el:any){
        props.setDadosEditar(el);
        props.setPopupEditar(!props.popupEditar);
        
        //props.popupEditar&&getDados('');
    }

    async function removerEl(id:string){

        //const dataForm=new FormData(e.target);
        //const data=JSON.stringify(
          //  Object.fromEntries(dataForm));

        //const endpoint='http://127.0.0.1:8081/agenda/contacto/deletar';
        
        // const dad={nom:'Art',id:'09'}
        // console.log(dad);
        // console.log(JSON.stringify(dad));
        // console.log('........');
        //console.log(JSON.stringify(el));
        
        await fetch(`${endpoint.delete}/${id}`)
        .then(res=>res.json()).then(res=>{
            if(res.status==200){
                //alert('Deletado com sucesso!')
                props.setCountEditar(props.countEditar+1);
            }
            else{
                alert(res.message);
            }
        }).catch((error)=>{console.log('Error: '+error)});
        
    }

    return (
        <div className="principal">
            
            <div className="element-dvg">

                <div className="dgv">

                <form className="form_pesquisa"
                method="post" onSubmit={e=>getPesquisa(e)}>
                    <input type="text" value={pesquisa}
                    placeholder="Pesquisar" onChange={e=>setPesquisa(e.target.value)}/>
                    {/* <select value={pesqSelect} onChange={(e)=>setpesqSelect(e.target.value)}>
                        <option value="id">ID</option>
                        <option value="nome">Nome</option>
                        <option value="email">Email</option>
                        <option value="tel">Telefone</option>
                    </select> */}
                    <button type="submit">Pesquisar</button>
                </form>

                    <div className="dvgTitulos">
                        {/* <div className="col-1 col">ID</div> */}
                        <div className="col-2 col">Nome</div>
                        <div className="col-3 col">Email</div>
                        <div className="col-4 col">Telefone</div>
                        <div className="col-5 col">Data nascimento</div>
                        <div className="col-6 col"></div>
                    </div>
                    <div className="dvg-dd">
                        
                        {

                        dados.map((el:any) => {
                                return(
                                    <div className="dvgDados" key={el.id}>
                                        {/* <div className="col">{el.id}</div> */}
                                        <div className="col">{el.nome}</div>
                                        <div className="col">{el.email}</div>
                                        <div className="col">{el.tel}</div>
                                        <div className="col">{el.dataNasc}</div>
                                        <div className="col col-6">

                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" onClick={()=>removerEl(el.id)}><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" onClick={()=>abrirEditar(el)}><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>

                                        </div>
                                    </div>
                                )
                            })

                        }

                    </div>
                </div>
            </div>

        </div>
    );
}
