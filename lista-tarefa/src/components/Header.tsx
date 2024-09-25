
import Head from "next/head";

export default function Header(){
    return(
        <div>
            <Head>
                <title>Andarilo - My first projecto Nextjs</title>
                <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <meta http-equiv="X-UA-Compatible" content="IE=7" />
                <meta name="keywords" content="" />
                <meta name="description" content="" />

                <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />            
            </Head>
            
            <div id="cabecalho" className="cabecalho">
                <h1>Andarilo</h1>
                <span>.com</span>
            </div>
        </div>
    );
}