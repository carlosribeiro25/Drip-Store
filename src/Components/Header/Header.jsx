import './Header.css';
import Logo from '../Logo';
import SearchBar from '../SearchBar';
import Carrinho from '../Pages/Carrinho';
import Navegation from '../Navegation';
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Search } from "lucide-react";
import { FiShoppingCart } from "react-icons/fi";


export default function Header() {
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [searchAberta, setSearchAberta] = useState(false);

  return (
    <header className="header w-full shadow-md p-4">
      <div className="flex items-center justify-between  md:gap-10">
        <button
          className="md:hidden"
          onClick={() => setMenuAberto(true)} >
          <Icon icon="mdi:menu" color="black" width="30" height="30" />
        </button>

        <div className="flex-1 flex gap-8 justify-center md:justify-start">
          <Logo />
          <div className="hidden md:flex items-center gap-20 mt-2">  
        <SearchBar />
        <Link className="btn-cadastro underline" to="/cadastro">Cadastre-se</Link>
        <Link className="btn-login" to="/login">Entrar</Link>
        </div>  
        </div>
        <div className="flex items-center gap-2">
          <button className="md:hidden" onClick={() => setSearchAberta(!searchAberta)}>
          <Search className="w-6 h-6 mr-2  text-gray-400 hover:text-#474747 cursor-pointer" /> 
          </button>

          <button onClick={() => setMostrarCarrinho(true)}>
            <FiShoppingCart className='w-8 h-8 text-pink-500 cursor-pointer' />
          </button>
        </div>
      </div>

      {searchAberta && (
        <div className="block md:hidden mt-2">
          <SearchBar />
        </div>
      )}
      <br />

      <div className="hidden md:flex items-center gap-8 link-login mt-4">        
        <div className="mt-14">
        <Navegation />
      </div> 

      </div>

      <Carrinho isVisible={mostrarCarrinho} onClose={() => setMostrarCarrinho(false)} />

      {menuAberto && (
        <div className="fixed top-19 left-0 w-64 h-full bg-white shadow-lg z-50 p-6 pl-4">
          <button className="mb-4" onClick={() => setMenuAberto(false)}>
            <Icon icon="mdi:close" width="28" height="28" />
          </button>
          <nav className="flex text-justify justify-items-normal  flex-col gap-4">
            <Link to="/" onClick={() => setMenuAberto(false)}>Home</Link>
            <Link to="/produtos" onClick={() => setMenuAberto(false)}>Produtos</Link>
            <Link to="/categorias" onClick={() => setMenuAberto(false)}>Categorias</Link>
            <Link to="/MeusPedidos" onClick={() => setMenuAberto(false)}>Meus Pedidos</Link>
            <hr />            
            <Link to="/login" className="bg-pink-500 w-20 text-white px-3 py-1 rounded" onClick={() => setMenuAberto(false)}>Entrar</Link>
            <Link to="/cadastro" onClick={() => setMenuAberto(false)}>Cadastre-se</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
