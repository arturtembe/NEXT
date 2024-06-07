
interface headProps{
    title:string
}

export function HeadComponents(props:headProps){
    return(
        <div>
            <title>{props.title}</title>
            <meta name="description" content="" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <meta name="keywords" content="" />
        </div>
    )
}