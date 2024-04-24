
interface headProps{
    title:string
}

export function HeadComponents(props:headProps){
    return(
        <head>
            <title>{props.title}</title>
            <meta name="description" content="" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <meta name="keywords" content="" />
        </head>
    )
}