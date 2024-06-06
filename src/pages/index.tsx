import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Editar from "@/components/main/editar";
import Novo from "@/components/main/novo";
import Pesquisar from "@/components/main/pesquisar";
import { useState } from "react";

export default function Home() {

  const [btn,setBtn]=useState<number>(0);
  const [popupEditar,setPopupEditar]=useState<boolean>(false);
  const [dadosEditar,setDadosEditar]=useState<any>();
  const [countEditar,setCountEditar]=useState<number>(0);

  return (
    <main>
      <Header/>
      <Menu btn={btn} setBtn={setBtn}/>
      
      {btn==0&&(<Pesquisar popupEditar={popupEditar} setPopupEditar={setPopupEditar}
      dadosEditar={dadosEditar} setDadosEditar={setDadosEditar}
      countEditar={countEditar} setCountEditar={setCountEditar}
      />
      )}
      {btn==1&&(<Novo/>)}

      {
        popupEditar&&(
          <div className="popup">
              <Editar popup={popupEditar} setPopup={setPopupEditar}
              dadosEditar={dadosEditar} setDadosEditar={setDadosEditar}
              countEditar={countEditar} setCountEditar={setCountEditar} />
          </div>
        )
      }

    </main>
  );
}
