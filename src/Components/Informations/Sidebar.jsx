import React from "react";

const items = [
  "Meu Perfil",
  "Meus Pedidos",
  "Minhas Informações",
  "Meus pagamentos",
];

export default function Sidebar({ active, setActive }) {
  return (
    
    <div className="w-60 h-60 flex bg-white rounded-2xl shadow p-4">
        <div className="text-left justify-center w-50 p-6">
             {items.map((item) => (
        <div
          key={item}
          onClick={() => setActive(item)}
          className={`cursor-pointer p-2 rounded mb-2 ${
            active === item ? "text-pink-600 font-semibold" : "text-gray-600"
          }`}
        >
          {item}
        </div>
      ))}

        </div>
     
    </div>
  );
}
