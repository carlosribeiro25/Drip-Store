import "./Section4.css";
export default function Section4() {
    return (
        <>
        <section className="flex gap-6 ">       
           <div className=" items-start  mt-8">           
  <img
   width={400}
   height={400}
    src="/shoes4.png"
    alt="Tênis Jordan"   
  />
  </div> 
  <div className="w-200">    
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
  </section>

   
        </>
    );
}
