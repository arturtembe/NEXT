import { useState } from "react";

export function addDadosImc(){

    const dt:Date=new Date();

    const month:string[]=['Janeiro','Fevereiro','Marco','Abril','Maio','Junho','Julho','Agosto','Setembro','Octumbro','Novembro','Dezembro']

    const dtdymthyrs=dt.getDay()+' de '+month[dt.getMonth()]+' de '+dt.getFullYear();

    /*---------------------------------------- */
    const [nome,setNome]=useState<string>('');
    const [peso,setPeso]=useState<any>('');
    const [altura,setAltura]=useState<any>('');
    const [imc,setImc]=useState<any>('');
    const [date,setDate]=useState<string>('');

    return {dtdymthyrs,nome,peso,altura,imc,date,setNome,setPeso,setAltura,setImc,setDate}
}