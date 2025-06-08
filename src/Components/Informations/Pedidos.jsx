import React from "react";

const pedidos = [
  { id: "238298234", status: "Produto em trânsito", statusColor: "text-yellow-500" },
  { id: "438598345", status: " Pedido foi Finalizado", statusColor: "text-green-500" },
  { id: "438598349", status: "Pedido foi Cancelado", statusColor: "text-red-500" },
  { id: "438598350", status: "Pedido foi Finalizado", statusColor: "text-green-500" },
];

export default function Pedidos() {
  return (
    <div className="w-xl ">
        <div className="justify-evenly gap-60 text-end flex">
             <h2 className="text-xl font-semibold mb-4">Meus Pedidos</h2>
           <h2 className="text-xl font-semibold mb-4 ">Status </h2>

        </div>
     
      {pedidos.map((pedido) => (
        <div key={pedido.id} className="flex border-b gap-2  py-4 items-center">
          <div className="flex gap-4 items-center">
            <img
              src="./shoes.png"
              alt="Produto"
              className="w-16 h-16 bg-gray-400 p-4"
            />
            <div>
              <p className="text-sm text-gray-700">Pedido n° {pedido.id}</p>
              <p className="font-semibold">
                Tênis Nike Revolution 6 Next Nature Masculino
              </p>
            </div>
          </div>
          <p className={`text-xl text-center font-semibold ${pedido.statusColor}`}>{pedido.status}</p>
        </div>
      ))}
    </div>
  );
}
