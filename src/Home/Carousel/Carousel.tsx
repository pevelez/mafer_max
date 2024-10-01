import { Carousel } from 'react-responsive-carousel';
import image1 from './images/image_1.jpg';
import image2 from './images/image_2.jpg';
import image3 from './images/image_3.jpg';
import image4 from './images/image_4.jpg';
import image5 from './images/image_5.jpg';
import image6 from './images/image_6.jpg';
import image7 from './images/image_7.jpg';
import image8 from './images/image_8.jpg';
import image9 from './images/image_9.jpg';

function CustomCarousel() {
    return(
        <Carousel
        className="carousel"
        showThumbs={false}
        useKeyboardArrows={true}
        swipeable={true}
        infiniteLoop={true}
        dynamicHeight={false}
        autoPlay={true}
        interval={2000}
      >
        <div>
          <img src={image1} alt="Imagen 1" />
        </div>
        <div>
          <img src={image2} alt="Imagen 2" />
        </div>
        <div>
          <img src={image3} alt="Imagen 3" />
        </div>
        <div>
          <img src={image4} alt="Imagen 4" />
        </div>
        <div>
          <img src={image5} alt="Imagen 5" />
        </div>
        <div>
          <img src={image6} alt="Imagen 6" />
        </div>
        <div>
          <img src={image7} alt="Imagen 7" />
        </div>
        <div>
          <img src={image8} alt="Imagen 8" />
        </div>
        <div>
          <img src={image9} alt="Imagen 9" />
        </div>
      </Carousel>
    );
}

export default CustomCarousel;