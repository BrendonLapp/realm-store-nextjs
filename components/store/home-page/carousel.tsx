import Slider from 'react-slick';
import { GalleryImages } from '../../../types/gallery-images';

interface CarouselProps {
  images: GalleryImages[];
}

const Carousel = ({ images }: CarouselProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    draggable: true,
    pauseOnHover: true,
    swipe: true,
  };
  return (
    <div>
      <Slider {...settings}>
        {images &&
          images.map((image: GalleryImages, index: number) => (
            <div key="index">
              <img src={image.imageLink} alt={image.altName} />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default Carousel;
