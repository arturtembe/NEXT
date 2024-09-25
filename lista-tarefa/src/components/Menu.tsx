import Link from "next/link";
import { useEffect, useState } from "react";

interface menuProps{
    btn:number,
    setBtn:any
}

export default function Menu(props:menuProps){

    //abaSelecionado
    const links:any[]=[
        {href:'/',id:'btn_home',class:'aba',value:'Home'},
        {href:'/novo',id:'btn_novo',class:'aba',value:'Novo'},
        // {href:'/pesquisar',id:'btn_pesquisar',class:'aba',value:'Pesquisar'},
        // {href:'/gestao',id:'btn_gestao',class:'aba',value:'Gestao'},
        // {href:'/sobre',id:'btn_sobre',class:'aba',value:'Sobre'}
    ];

    useEffect(()=>{
        //setBtn(location.pathname);
    },[]);

    function btnClick(i:number){
        if(props.btn!=i){
            props.setBtn(i);

            //console.log(props.btn);
        }
    }

    function aba_links(){
        let link:any[]=[];
        links.forEach((el,i)=>{
            link.push(
                <button key={i} id={el.id} 
                className={el.class+' '+(i==props.btn && 'abaSelecionado')}
                onClick={()=>btnClick(i)}>{el.value}</button>    
            );
        })
        return link;
    }

    return(
        <div id="menu" className="menu">
            {aba_links()}
        </div>
    );
}