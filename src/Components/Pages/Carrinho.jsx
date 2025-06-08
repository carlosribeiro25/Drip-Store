"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@supabase/supabase-js"
import styles from "./Carrinho.module.css"
import { generateSessionId } from "../../utils/cartUtils"

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

export default function Carrinho({ isVisible, onClose }) {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCartItems = useCallback(async () => {
    const currentSessionId = generateSessionId()

    if (!currentSessionId) {
      console.log("❌ Nenhum sessionId encontrado")
      return
    }

    setLoading(true)
    setError(null)

    try {
      console.log("🛒 Buscando itens do carrinho para sessão:", currentSessionId)

      // Query mais detalhada para debug
      const { data: cartData, error: cartError } = await supabase
        .from("cart_items")
        .select(`
          id,
          product_id,
          quantity,
          session_id,
          created_at,
          product:products (
            id,
            name,
            price,
            image_url,
            description,
            brand
          )
        `)
        .eq("session_id", currentSessionId)
        .order("created_at", { ascending: false })

      if (cartError) {
        console.error("❌ Erro na query do carrinho:", cartError)
        throw cartError
      }

      console.log("✅ Dados brutos do carrinho:", cartData)

      // Verificar se os produtos estão sendo carregados corretamente
      if (cartData && cartData.length > 0) {
        cartData.forEach((item, index) => {
          console.log(`📦 Item ${index + 1}:`, {
            id: item.id,
            product_id: item.product_id,
            quantity: item.quantity,
            product: item.product,
            hasProduct: !!item.product,
            productName: item.product?.name,
            productImage: item.product?.image_url,
          })
        })
      }

      setCartItems(cartData || [])
    } catch (error) {
      console.error("❌ Erro ao buscar itens do carrinho:", error)
      setError("Erro ao carregar carrinho")
    } finally {
      setLoading(false)
    }
  }, [])

  // Busca itens sempre que o carrinho fica visível
  useEffect(() => {
    if (isVisible) {
      console.log("👁️ Carrinho ficou visível, buscando itens...")
      fetchCartItems()
    }
  }, [isVisible, fetchCartItems])

  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      await removeFromCart(cartItemId)
      return
    }

    try {
      const { error } = await supabase.from("cart_items").update({ quantity: newQuantity }).eq("id", cartItemId)

      if (error) throw error
      await fetchCartItems()
    } catch (error) {
      console.error("❌ Erro ao atualizar quantidade:", error)
    }
  }

  const removeFromCart = async (cartItemId) => {
    try {
      const { error } = await supabase.from("cart_items").delete().eq("id", cartItemId)

      if (error) throw error
      await fetchCartItems()
    } catch (error) {
      console.error("❌ Erro ao remover do carrinho:", error)
    }
  }

  const emptyCart = async () => {
    const currentSessionId = generateSessionId()
    if (!currentSessionId) return

    const confirmEmpty = window.confirm("Tem certeza que deseja esvaziar o carrinho?")
    if (!confirmEmpty) return

    try {
      const { error } = await supabase.from("cart_items").delete().eq("session_id", currentSessionId)

      if (error) throw error
      setCartItems([])
    } catch (error) {
      console.error("❌ Erro ao esvaziar o carrinho:", error)
    }
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.price || 0
      return total + price * item.quantity
    }, 0)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price || 0)
  }

  const handleCheckout = () => {
    alert("Função de checkout será implementada em breve!")
  }

  // Função melhorada para obter URL da imagem
  const getImageUrl = (item) => {
    console.log("🖼️ Obtendo imagem para item:", item)

    // Verifica se o produto existe
    if (!item.product) {
      console.log("❌ Produto não encontrado para item:", item.id)
      return "/placeholder.svg?height=60&width=60"
    }

    // Tenta diferentes campos de imagem
    const imageUrl = item.product.image_url || item.product.imagem || item.product.foto || item.product.picture

    console.log("🖼️ URL da imagem encontrada:", imageUrl)

    return imageUrl || "/placeholder.svg?height=60&width=60"
  }

  // Função para obter nome do produto
  const getProductName = (item) => {
    if (!item.product) {
      return `Produto ID: ${item.product_id}`
    }

    return item.product.name || item.product.nome || item.product.title || `Produto ID: ${item.product_id}`
  }

  return (
    <>
      <div className={`${styles["carrinho-overlay"]} ${isVisible ? styles["visible"] : ""}`} onClick={onClose} />

      <div className={`${styles["carrinho-container"]} ${isVisible ? styles["visible"] : ""}`}>
        <div className={styles["carrinho-header"]}>
          <h3 className={styles["carrinho-titulo"]}>
            Meu Carrinho ({cartItems.length} {cartItems.length === 1 ? "item" : "itens"})
          </h3>
          <button className={styles["carrinho-fechar"]} onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6L18 18" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {loading ? (
          <div className={styles["carrinho-carregando"]}>
            <div className={styles["loading-spinner"]}></div>
            <p>Carregando carrinho...</p>
          </div>
        ) : error ? (
          <div className={styles["carrinho-erro"]}>
            <p>❌ {error}</p>
            <button onClick={fetchCartItems} className={styles["btn-retry"]}>
              Tentar novamente
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className={styles["carrinho-vazio"]}>
            <div className={styles["empty-cart-icon"]}>🛒</div>
            <p>Seu carrinho está vazio</p>
            <small>Adicione produtos para começar suas compras!</small>
          </div>
        ) : (
          <>
            <div className={styles["carrinho-itens"]}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles["carrinho-item"]}>
                  <div className={styles["item-image-container"]}>
                    <img
                      src={getImageUrl(item) || "/placeholder.svg"}
                      alt={getProductName(item)}
                      className={styles["carrinho-item-imagem"]}
                      onError={(e) => {
                        console.log("❌ Erro ao carregar imagem:", e.target.src)
                        e.target.src = "/placeholder.svg?height=60&width=60"
                      }}
                      onLoad={() => {
                        console.log("✅ Imagem carregada com sucesso:", getImageUrl(item))
                      }}
                    />
                  </div>

                  <div className={styles["carrinho-item-detalhes"]}>
                    <p className={styles["carrinho-item-nome"]}>{getProductName(item)}</p>
                    <p className={styles["carrinho-item-marca"]}>{item.product?.brand || "Marca não informada"}</p>
                    <p className={styles["carrinho-item-preco"]}>{formatPrice(item.product?.price)}</p>

                    {/* Debug info - remover em produção */}
                    <small className={styles["debug-info"]}>
                      ID: {item.product_id} | Produto: {item.product ? "✅" : "❌"}
                    </small>
                  </div>

                  <div className={styles["carrinho-item-quantidade"]}>
                    <button
                      className={styles["quantidade-btn"]}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Diminuir quantidade"
                    >
                      -
                    </button>
                    <span className={styles["quantidade-numero"]}>{item.quantity}</span>
                    <button
                      className={styles["quantidade-btn"]}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Aumentar quantidade"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles["carrinho-footer"]}>
              <div className={styles["carrinho-total"]}>
                <span className={styles["total-label"]}>Total:</span>
                <span className={styles["total-valor"]}>{formatPrice(getTotalPrice())}</span>
              </div>
              <div className={styles["carrinho-acoes"]}>
                <button className={styles["btn-finalizar"]} onClick={handleCheckout}>
                  Finalizar Compra
                </button>
                <button className={styles["btn-limpar"]} onClick={emptyCart}>
                  Limpar Carrinho
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}