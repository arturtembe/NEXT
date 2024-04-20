
interface CompoFormProps{
    label:string,
    state:any,
    funcao:any
}

export default function CompForm(props:CompoFormProps){
    return(
        <div className="flex mx-2">
            <label className="w-[60px]">{props.label}</label>
            <input className="border p-1 w-full rounded-lg" type="text" value={props.state} onChange={(e)=>props.funcao(e.target.value)}/>
        </div>
    )
}