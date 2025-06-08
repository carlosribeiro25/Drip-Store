import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './Components/Pages/HomePage';
import ProductListingPage from './Components/Pages/ProductListingPage';
import Login from './Components/Pages/Login';
import Cadastro from './Components/Pages/Cadastro';
import MeusPedidos from './Components/MeusPedidos/MeusPedidos';
import Carrinho from './Components/Pages/Carrinho';
import ProductViewPage from './Components/Pages/ProductViewPage';

function App() {
  return (
    <>
      <Routes>        
        <Route path="/" element={<HomePage />} />
        <Route path="/Produtos" element={<ProductListingPage />} />
        <Route path="/Categorias" element={<ProductViewPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/Meuspedidos" element={<MeusPedidos />} />
        <Route path="/Carrinho" element={<Carrinho />} />
      </Routes>
    </>
  );
}

export default App;
