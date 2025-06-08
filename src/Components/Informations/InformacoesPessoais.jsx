import React from "react";
import EndereçoEntrega from '../Informations/EnderecoEntrega'
export default function InformacoesPessoais() {
  return (
    <div >
      <h2 className="text-xl font-semibold mb-4">Informações Pessoais</h2><br />
      <hr /><br />
      <div className="space-y-2 text-gray-700">
        <p><strong>Nome:</strong> João da Silva</p>
        <p><strong>CPF:</strong> 123.456.789-00</p>
        <p><strong>Email:</strong> joao@email.com</p>
        <p><strong>Contato:</strong> (85) 98234-5678</p>
        
      </div>
      <br />
      <EndereçoEntrega/>
    </div>
  );
}
