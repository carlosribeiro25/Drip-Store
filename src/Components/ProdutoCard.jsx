

export default function ProdutoCard() {
    return (
        <>
            <div className="bg-white rounded-2xl p-1.5  cols-1 gap-15  ">

                <img className="cursor-pointer rounded-sm" src="/shoes3.png"

                    alt="k-wiis"
                    width={292}
                    height={310}
                />
                <div className="bg-gray-120">
                    <p className="text-lime-700 cursor-pointer text-ms font-bold "> Tênis </p>
                    <p className=" font-bold " >Tênis Nike-13 Feminino</p>
                    <s className="text-gray-500 cursor-pointer text-lg ">$200</s><span className=" cursor-pointer font-black"> $ 100</span>
                </div>

            </div>


        </>
    )
}