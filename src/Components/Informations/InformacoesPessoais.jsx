import React from "react";
import EndereçoEntrega from '../Informations/EnderecoEntrega';
export default function InformacoesPessoais() {
  return (
    <div  className="w-xl ">
      <div className="justify-around  flex">
         <h2 className="text-xl font-semibold mb-4">Informações Pessoais</h2><br />
      <button className="text-pink-500 text-xl underline">Editar</button>
      </div>
      <hr /><br />
      <div className="space-y-4 flex-col  text-gray-700">
        <div className="ml-4  pl-4 w-70 ">
        <p><strong>Nome:</strong> João da Silva</p>
        <p><strong>CPF:</strong> 123.456.789-00</p>
        <p><strong>Email:</strong> joao@email.com</p>
        <p><strong>Contato:</strong> (85) 98234-5678</p>
          
        </div>     
      </div>
      <br />
      <EndereçoEntrega/>
    </div>
  );
}
