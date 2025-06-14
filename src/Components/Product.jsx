"use client"

import { useState } from "react"
import "./Product.css"
import Carrinho from "../Components/Pages/Carrinho"
import { generateSessionId } from "../utils/cartUtils"
import { adicionarAoCarrinho } from "../utils/cartActions"
export default function Product() {
  const [isCartVisible, setIsCartVisible] = useState(false)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAddingToCart, setIsAddingToCart] = useState(false) // Estado para loading
  const [cartUpdateTrigger, setCartUpdateTrigger] = useState(0) // Trigger para atualizar carrinho

  const productImages = [
    "/shoes3.png",
    "/shoes3.png",
    "/shoes3.png",
    "/shoes3.png",
    "/shoes3.png",
  ]

  const relatedProducts = [
    {
      id: 8, 
      name: "K-Swiss V8 - Masculino",
      brand: "K-Swiss",
      originalPrice: 200,
      salePrice: 100,
      discount: "50% OFF",
      image:
        "/shoe-4.png",
    },
    {
      id: 9,
      name: "Stranger Things x Nike Blazer Hawkins",
      brand: "Nike",
      originalPrice: 300,
      salePrice: 180,
      discount: "40% OFF",
      image:

        "/shoe-1.png"

    },
    {
      id: 10,
      name: "Nike Air Max 270",
      brand: "Nike",
      originalPrice: 250,
      salePrice: 150,
      discount: "40% OFF",
      image:
        "/shoe-2.png",
    },
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  const handleComprar = async () => {
    if (isAddingToCart) return 

    setIsAddingToCart(true)
    const sessionId = generateSessionId()
    const productId = 7
    const quantity = 1

    try {
      console.log("Adicionando produto principal ID:", productId)
      await adicionarAoCarrinho(sessionId, productId, quantity)

      setCartUpdateTrigger((prev) => prev + 1)

      setTimeout(() => {
        setIsCartVisible(true)
      }, 300)
    } catch (error) {
      console.error("Erro ao adicionar produto ao carrinho:", error)
      alert("Erro ao adicionar produto ao carrinho")
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleAdicionarRelacionado = async (product) => {
    if (isAddingToCart) return

    setIsAddingToCart(true)
    const sessionId = generateSessionId()
    const quantity = 1

    try {
      console.log("Adicionando produto relacionado ID:", product.id)
      await adicionarAoCarrinho(sessionId, product.id, quantity)

      setCartUpdateTrigger((prev) => prev + 1)

      alert(`${product.name} adicionado ao carrinho!`)

      setTimeout(() => {
        setIsCartVisible(true)
      }, 300)
    } catch (error) {
      console.error("Erro ao adicionar produto relacionado:", error)
      alert("Erro ao adicionar produto ao carrinho")
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <>
      <main className="produto-container">
        <div className="breadcrumb">
          <span className="text-gray-800 text-xl">Home / Produto / Tenis / Nike / Tênis Nike Revolution 6 Next Nature Masculino</span>
        </div>

        <div className="produto-grid">
          <div className="produto-galeria">
            <div className="produto-imagem-container">
              <button className="nav-arrow nav-arrow-left" onClick={prevImage}>
                &#8249;
              </button>
              <img
                src={productImages[currentImageIndex] || "/placeholder.svg"}
                alt="Tênis Nike Revolution 6"
                className="produto-imagem-principal"
              />
              <button className="nav-arrow nav-arrow-right" onClick={nextImage}>
                &#8250;
              </button>
            </div>

            <div className="thumbnails-container">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail ${index === currentImageIndex ? "active" : ""}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img src={image || "/placeholder.svg"} alt={`Tênis Nike Revolution 6 - Vista ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="produto-info">
            <h1 className="produto-titulo">Tênis Nike Revolution 6 Next Nature Masculino</h1>
            <p className="produto-referencia text-gray-800">Casual | Nike | REF:38416711</p>

            <div className="produto-avaliacoes">
              <span className="avaliacao-estrelas">★★★★☆</span>
              <span className="avaliacao-score">4.7</span>
              <span className="avaliacao-texto">(90 avaliações)</span>
            </div>

            <div className="produto-precos">
              <p className="preco-antigo">R$ 219,00</p>
              <p className="preco-atual">200,00</p>
            </div>

            <div className="produto-descricao">
              <p className="descricao-titulo">Descrição do produto</p>
              <p className="descricao-texto">
                O Tênis Nike Revolution 6 Next Nature Masculino é a escolha ideal para quem busca conforto, leveza e um design moderno.
                 Produzido com materiais de alta qualidade, ele se adapta perfeitamente aos pés, garantindo 
                 bem-estar durante todo o dia. Seu solado emborrachado oferece excelente aderência e segurança 
                 em diferentes superfícies.
               
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
                  {["#bee3f8", "#e53e3e", "#4a5568", "#805ad5"].map((color, index) => (
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

            <button onClick={handleComprar} className="btn-comprar" disabled={isAddingToCart}>
              {isAddingToCart ? "ADICIONANDO..." : "COMPRAR"}
            </button>
          </div>
        </div>

        <div className="produtos-relacionados">
          <div className="relacionados-header">
            <h2 className="relacionados-titulo">Produtos Relacionados</h2>
            <a href="#" className="ver-todos-link">
              Ver todos →
            </a>
          </div>

          <div className="relacionados-grid">
            {relatedProducts.map((product) => (
              <div key={product.id} className="produto-relacionado">
                {product.discount && <div className="desconto-badge">{product.discount}</div>}
                <div className="produto-imagem-wrapper">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="produto-relacionado-imagem"
                  />
                </div>
                <div className="produto-relacionado-info">
                  <span className="produto-marca">{product.brand}</span>
                  <h3 className="produto-relacionado-nome">{product.name}</h3>
                  <div className="precos-relacionado">
                    <span className="preco-original">R$ {product.originalPrice}</span>
                    <span className="preco-promocao">R$ {product.salePrice}</span>
                  </div>
                  <button
                    className="btn-adicionar-carrinho"
                    onClick={() => handleAdicionarRelacionado(product)}
                    disabled={isAddingToCart}
                  >
                    {isAddingToCart ? "Adicionando..." : "Adicionar ao Carrinho"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Carrinho
        isVisible={isCartVisible}
        onClose={() => setIsCartVisible(false)}
        updateTrigger={cartUpdateTrigger} 
      />
    </>
  )
}
