import "./Section.css";

export default function Section() {
  return (
    <>
      <div className="colecoes-destaque">
        <h2>Coleções em destaque</h2>
        <div className="botoes-colecoes">
          <button >
            <img src="/category-tshirt.svg" alt="Camisetas" draggable="false" />
          </button> 

          <div className="item-colecao ">
            <button>
              <img src="/pants.svg" alt="Calças" draggable="false" />
            </button>
            <h5>Calças</h5>
          </div>

          <div className="item-colecao">
            <button>
              <img  src="/cap_icon.ico" alt="Bonés" draggable="false" />
            </button>
            <h5>Bonés</h5>
          </div>

          <div className="item-colecao">
            <button>
              <img src="/headphones.svg" alt="Headphones" draggable="false" />
            </button>
            <h5>Headphones</h5>
          </div>

          <div className="item-colecao">
            <button>
              <img src="/sneakers.svg" alt="Tênis" draggable="false" />
            </button>
            <h5>Tênis</h5>
          </div>
        </div>
      </div>

    </>
  );
}
