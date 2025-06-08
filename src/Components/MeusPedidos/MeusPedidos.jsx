import React, { useState } from "react";
import Sidebar from "../Informations/Sidebar";
import Pedidos from "../Informations/Pedidos";
import InformacoesPessoais from "../Informations/InformacoesPessoais";
import EnderecoEntrega from "../Informations/EnderecoEntrega";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function MeusPedidos() {
  const [activeSection, setActiveSection] = useState("Meus Pedidos");

  return (
    <>
    <Header/><br /><br />
    <div className="flex h-86 w-2xl justify-around gap-4 bg-gray-100 p-6">
      <Sidebar active={activeSection} setActive={setActiveSection} />
      <div className="flex-1 ml-6 bg-white rounded-2xl shadow p-6">
        {activeSection === "Meus Pedidos" && <Pedidos />}
        {activeSection === "Minhas Informações" && <InformacoesPessoais />}
        {activeSection === "Endereço de Entrega" && <EnderecoEntrega />}
        {activeSection === "Meu Perfil" && <p>Perfil simples (placeholder)</p>}
      </div>
    </div><br /><br />
    <Footer/>
    </>
  );
}
