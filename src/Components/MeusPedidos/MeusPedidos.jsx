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
    <div className="flex h-86 w-3xl justify-evenly ml-7 gap-14  p-6">
      <Sidebar active={activeSection} setActive={setActiveSection} />
      <div className="flex ml-6  bg-white rounded-2xl shadow p-6">
        {activeSection === "Meus Pedidos" && <Pedidos />}
        {activeSection === "Minhas Informações" && <InformacoesPessoais />}
        {activeSection === "Endereço de Entrega" && <EnderecoEntrega />}
        {activeSection === "Meu Perfil" && <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
           Repudiandae vitae voluptatibus tenetur modi error a, eos voluptate consequuntur officiis autem 
           totam, quia vero quod non sunt natus veniam dolorum beatae.</p>}
        {activeSection === "Meus Pagamentos" && <MeusPagamentos />}
      </div>
    </div><br /><br />
    <Footer/>
    </>
  );
}
