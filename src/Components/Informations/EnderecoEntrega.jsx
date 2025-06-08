import React from "react";

export default function EnderecoEntrega() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Endereço de Entrega</h2>
      <div className="space-y-2 text-gray-700">
        <p><strong>Endereço:</strong> Rua das Flores, 123</p>
        <p><strong>Bairro:</strong> Centro</p>
        <p><strong>Cidade:</strong> São Paulo</p>
        <p><strong>CEP:</strong> 01001-000</p>
      </div>
    </div>
  );
}
