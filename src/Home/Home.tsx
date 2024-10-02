import CustomCarousel from './Carousel/Carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Register from './Register/Register';

function Home() {
  return (
    <div className="container">
      <h1 className="main-heading">Boda de Max y Mafer</h1>
      <CustomCarousel/>
      <div className="">
        <h2> ¿Cómo funciona?</h2>
        <p style={{textAlign: 'justify', textJustify: 'inter-word'}}>
        Estamos emocionados de compartir con ustedes un día tan especial en nuestras vidas: ¡nuestra boda! 
        Para que puedan ser parte de cada momento y recordar juntos esta fecha, hemos creado una manera divertida y sencilla de compartir sus fotos y videos.
        </p>
        <p style={{textAlign: 'justify', textJustify: 'inter-word'}}>
        En esta página podrás subir tus mejores momentos durante la celebración. Tu aportación permitirá que todos disfrutemos este inolvidable día a través de diferentes perspectivas.
        ¡No podemos esperar a ver todas las sonrisas, bailes y momentos ! 
        Gracias por ser parte de nuestra historia. 
        </p>
        <p>Con amor: Mafer, Max</p>
      </div>
      <Register/>
    </div>
  );
}

export default Home;
