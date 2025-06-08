import "./Section4.css";
export default function Section4() {
    return (
        <>
           <div className="flex items-start gap-8 mt-8">           
  <img
    src="https://drip-store.netlify.app/assets/images/special-offer/Air_Jordan.png"
    alt="Tênis Jordan"   
  />
  <div className="w-120">    
    <p className="text-xl text-pink-500  font-semibold">Oferta especial</p><br />
    <h1  className="text-5xl font-bold">Air Jordan edição de colecionador</h1><br />
    <p className="text-xl">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore
      dignissimos ullam magnam consequatur quod iste voluptates cumque libero
      repellat laudantium sequi, velit at possimus repellendus quo quibusdam
      rerum tempora quisquam.
    </p><br />
    <button className="font-semibold rounded bg-pink-500 w-30 h-8 text-sm text-white "> Ver Oferta</button>   
  </div>
</div> 
   
        </>
    );
}
