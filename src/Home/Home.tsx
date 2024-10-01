import CustomCarousel from './Carousel/Carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Register from './Register/Register';

function Home() {
  return (
    <div className="container">
      <h1 className="main-heading">Boda de Max y Mafer</h1>
      <CustomCarousel/>
      <div className="">
        <h2> Cómo funciona?</h2>
        <p>
          Queremos que compartas tu experiencia de la boda de la manera más natural y divertida! En esta aplicación, sube fotos y videos. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <Register/>
    </div>
  );
}

export default Home;
