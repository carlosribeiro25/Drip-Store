 {/* <section className="mb-10 flex  h-screen gap-10">
            <br /><br />
             <div className="bg-white w-60 h-60  justify-around rounded-sm flex  ml-4 ">
            <br />
            <div className="w-50 h-50   justify-center"><br />
                 <a  href="#" className="font-semibold">Meu perfil</a>
                <hr /><br />
                <a href="#" className="text-amber-600 font-semibold">Meus pedidos </a><hr /><br />
                <a href="#"className="font-semibold">Minhas Informações</a><hr /><br />
                <a href="#" className="font-semibold"  >Meus Pagamentos</a><br />
            </div>                
            </div ><br /> 
            <nav>
                
            </nav>

            <MeusPedidos2/>
        </section> */}

        import Footer from "../Footer/Footer";
        import Header from "../Header/Header";
        import MeusPedidos2 from "./MeusPedidos2";
        
        import React, { useState } from "react";
        
        const menuItems = ["Meu Perfil", "Meus Pedidos", "Minhas Informações", "Métodos de Pagamento"];
        
        const pedidos = [
          { id: "238298234", status: "Produto em trânsito", statusColor: "text-yellow-500" },
          { id: "438598345", status: "Finalizado", statusColor: "text-gray-500" },
          { id: "438598349", status: "Cancelado", statusColor: "text-red-500" },
          { id: "438598350", status: "Finalizado", statusColor: "text-gray-500" },
          { id: "438598351", status: "Finalizado", statusColor: "text-gray-500" },
        ];
        const Informaçoes = [
            {id: ""}
        ];
        
        
        export default function MeusPedidos(){
              let [active, setActive] = useState("Meus Pedidos");
        
        return (
        
            <>
            
           
            <div className="flex  justify-around gap-8 bg-gray-120 p-6">
              {/* Sidebar */}
              <div className="w-60 h-50 bg-white rounded-xl text-center shadow p-4">
                {menuItems.map((item) => (
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
        
              {/* Content Area */}
              <div className="flex-1 bg-white rounded-2xl w-300 shadow p-6 ml-6">
                <h2 className="text-xl font-semibold mb-4">{active}</h2>
        
                {active === "Meus Pedidos" && (
                  <div className="">
                    {pedidos.map((pedido) => (
                      <div
                        key={pedido.id}
                        className="flex items-center justify-between border-b py-4"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src="https://via.placeholder.com/60"
                            alt="Produto"
                            className="w-16 h-16 rounded"
                          />
                          <div>
                            <p className="text-sm text-gray-500">Pedido #{pedido.id}</p>
                            <p className="font-semibold">
                              Tênis Nike Revolution 6 Next Nature Masculino
                            </p>
                          </div>
                        </div>
                        <p className={`text-sm font-medium ${pedido.statusColor}`}>
                          {pedido.status}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
        
                {active !== "Minhas informações" && (
                  <div className="text-gray-400">
                    <hr />
                    <p>Informações Pessoais </p>
        
                  </div>
                )}
              </div>
            </div>
             </>
          ); 
        };
        
        
        