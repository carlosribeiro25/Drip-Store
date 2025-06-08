import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Section  from '../Colection/Section';
import Section2 from '../Colection/Section2';
import Section3 from '../Colection/Section3';
import Gallery from '../Gallery/Gallery';
import Section4 from '../Colection/Section4';


  export  default function HomePage() {
  return (
    <>
    <Header/> 
    <Gallery/>
    <Section2/>     
     <Section/>
     <br />
      <div className="flex justify-between  ">
        <h2 className='text-2xl font-semibold '>Produtos em alta </h2>        
        <a className='text-pink-500' href="#">Ver todos → </a>
    </div><br />
     <Section3/><br /><br />
     <Section4/><br /><br />
    <Footer/>   
      </>
  );
}


