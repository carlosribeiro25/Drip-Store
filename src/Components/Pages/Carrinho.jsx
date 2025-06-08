"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@supabase/supabase-js"
import styles from "./Carrinho.module.css"
import { generateSessionId } from "../../utils/cartUtils"

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

export default function Carrinho({ isVisible, onClose }) {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState(null)

  const fetchCartItems = useCallback(
    async (currentSessionId = sessionId) => {
      if (!currentSessionId) return

      setLoading(true)
      try {
        // Debug: Vamos ver o que está sendo retornado
        const { data, error } = await supabase
          .from("cart_items")
          .select(`
          *,
          product:products(*)
        `)
          .eq("session_id", currentSessionId)

        if (error) {
          console.error("Erro na query:", error)
          throw error
        }

        // Debug: Log para ver os dados retornados
        console.log("Dados do carrinho:", data)
        console.log(
          "Produtos encontrados:",
          data?.map((item) => item.product),
        )

        setCartItems(data || [])
      } catch (error) {
        console.error("Erro ao buscar itens do carrinho:", error)
      } finally {
        setLoading(false)
      }
    },
    [sessionId],
  )

  useEffect(() => {
    const id = generateSessionId()
    setSessionId(id)
    if (id && isVisible) {
      fetchCartItems(id)
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
      console.error("Erro ao atualizar quantidade:", error)
    }
  }

  const removeFromCart = async (cartItemId) => {
    try {
      const { error } = await supabase.from("cart_items").delete().eq("id", cartItemId)

      if (error) throw error
      await fetchCartItems()
    } catch (error) {
      console.error("Erro ao remover do carrinho:", error)
    }
  }

  const emptyCart = async () => {
    if (!sessionId) return

    const confirmEmpty = window.confirm("Tem certeza que deseja esvaziar o carrinho?")
    if (!confirmEmpty) return

    try {
      const { error } = await supabase.from("cart_items").delete().eq("session_id", sessionId)

      if (error) throw error
      setCartItems([])
    } catch (error) {
      console.error("Erro ao esvaziar o carrinho:", error)
    }
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const handleCheckout = () => {
    alert("Função de checkout será implementada em breve!")
  }

  // Função para obter a URL da imagem com fallback
  const getImageUrl = (item) => {
    // Primeiro tenta a imagem do produto
    if (item.product?.image_url) {
      return item.product.image_url
    }

    // Se não tem imagem do produto, tenta outras possibilidades
    if (item.product?.imagem) {
      return item.product.imagem
    }

    if (item.product?.foto) {
      return item.product.foto
    }

    // Fallback para placeholder
    return "/placeholder.svg?height=60&width=60"
  }

  return (
    <>
      {/* Overlay */}
      <div className={`${styles["carrinho-overlay"]} ${isVisible ? styles["visible"] : ""}`} onClick={onClose} />

      {/* Carrinho */}
      <div className={`${styles["carrinho-container"]} ${isVisible ? styles["visible"] : ""}`}>
        <div className={styles["carrinho-header"]}>
          <h3 className={styles["carrinho-titulo"]}>Meu Carrinho</h3>
          <button className={styles["carrinho-fechar"]} onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6L18 18" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {loading ? (
          <div className={styles["carrinho-carregando"]}>Carregando...</div>
        ) : cartItems.length === 0 ? (
          <div className={styles["carrinho-vazio"]}>Seu carrinho está vazio</div>
        ) : (
          <>
            <div className={styles["carrinho-itens"]}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles["carrinho-item"]}>
                  <img
                    src={getImageUrl(item) || "/placeholder.svg"}
                    alt={item.product?.name || "Produto"}
                    className={styles["carrinho-item-imagem"]}
                    onError={(e) => {
                      console.log("Erro ao carregar imagem:", e.target.src)
                      e.target.src = "/placeholder.svg?height=60&width=60"
                    }}
                  />
                  <div className={styles["carrinho-item-detalhes"]}>
                    <p className={styles["carrinho-item-nome"]}>
                      {item.product?.name || item.product?.nome || "Produto"}
                    </p>
                    <p className={styles["carrinho-item-preco"]}>
                      {formatPrice(item.product?.price || item.product?.preco || 0)}
                    </p>
                    {/* Debug info - remova depois */}
                    <small style={{ color: "#999", fontSize: "10px" }}>
                      ID: {item.product_id} | Produto: {item.product ? "Encontrado" : "Não encontrado"}
                    </small>
                  </div>
                  <div className={styles["carrinho-item-quantidade"]}>
                    <button
                      className={styles["quantidade-btn"]}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className={styles["quantidade-numero"]}>{item.quantity}</span>
                    <button
                      className={styles["quantidade-btn"]}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
                  Limpar
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}