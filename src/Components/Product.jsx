"use client"

import "./Product.css"
import { useState } from "react"
import Carrinho from "../Components/Pages/Carrinho"
import { generateSessionId } from "../utils/cartUtils"
import { adicionarAoCarrinho } from "../utils/cartActions"

export default function Product() {
  const [isCartVisible, setIsCartVisible] = useState(false)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")

  const handleComprar = async () => {
    const sessionId = generateSessionId()
    const productId = 7 // Verifique se este ID existe na tabela products
    const quantity = 1

    try {
      // Debug: Vamos verificar se o produto existe antes de adicionar
      console.log("Tentando adicionar produto ID:", productId)

      await adicionarAoCarrinho(sessionId, productId, quantity)
      setIsCartVisible(true)
    } catch (error) {
      console.error("Erro ao adicionar produto ao carrinho:", error)
      alert("Erro ao adicionar produto ao carrinho")
    }
  }

  return (
    <>
      <main className="produto-container">
        <div className="breadcrumb">
          <span>Home / Produto / Tenis / Nike / Tênis Nike Revolution 6 Next Nature Masculino</span>
        </div>

        <div className="produto-grid">
          <div className="produto-imagem-container">
            {/* Adicione a imagem do produto aqui */}
            <img src="/nike-shoe.png" alt="Tênis Nike Revolution 6" style={{ width: "100%", height: "auto" }} />
          </div>

          <div className="produto-info">
            <h1 className="produto-titulo">Tênis Nike Revolution 6 Next Nature Masculino</h1>
            <p className="produto-referencia">Casual | Nike | REF:38416711</p>

            <div className="produto-avaliacoes">
              <span className="avaliacao-estrelas">★★★★☆</span>
              <span className="avaliacao-score">4.7 ☆</span>
              <span className="avaliacao-texto">(90 avaliações)</span>
            </div>

            <div className="produto-precos">
              <p className="preco-antigo">R$ 219,00</p>
              <p className="preco-atual">R$ 219,00</p>
            </div>

            <div className="produto-descricao">
              <p className="descricao-titulo">Descrição do produto</p>
              <p className="descricao-texto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
              </p>
            </div>

            <div className="produto-selecoes">
              <div className="selecao-grupo">
                <p className="selecao-titulo">Tamanhos:</p>
                <div className="tamanhos-container">
                  {["39", "40", "41", "42"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`tamanho-btn ${selectedSize === size ? "selecionado" : ""}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="selecao-grupo">
                <p className="selecao-titulo">Cores:</p>
                <div className="cores-container">
                  {["#000", "#666", "#999", "#ccc"].map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`cor-btn ${selectedColor === color ? "selecionado" : ""}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <button onClick={handleComprar} className="btn-comprar">
              COMPRAR
            </button>
          </div>
        </div>

        <div className="produtos-relacionados">
          <div className="relacionados-header">
            <p className="relacionados-titulo">Produtos relacionados</p>
            <a className="ver-todos-link">ver todos</a>
          </div>
          <div className="relacionados-grid">
            <div className="produto-relacionado">
              <p>Tênis Nike-13 Feminino</p>
            </div>
          </div>
        </div>
      </main>

      <Carrinho isVisible={isCartVisible} onClose={() => setIsCartVisible(false)} />
    </>
  )
}