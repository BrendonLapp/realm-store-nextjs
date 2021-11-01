import Carousel from '../components/store/home-page/carousel';
import ProductDisplay from '../components/store/product-display';
import { getHomePageCards } from '../controllers/card-controller';
import { getGalleryImages } from '../controllers/gallery-controller';
import { Card } from '../types/card';
import { GalleryImage } from '../types/gallery-images';

interface HomeProps {
  cards?: Card[];
  error?: string;
  galleryImages: GalleryImage[];
}

const Home = ({ cards, galleryImages }: HomeProps) => {
  return (
    <>
      <section className="jumbotron text-center bg-dark">
        <div className="container carousel-container">
          <Carousel images={galleryImages} />
        </div>
      </section>
      <div>
        {cards && <ProductDisplay cardsData={cards} />}
        {!cards && <div>No Data</div>}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const allCards = await getHomePageCards();
  const images = await getGalleryImages();

  if (allCards) {
    return {
      props: {
        cards: allCards,
        galleryImages: images,
      },
    };
  }

  return {
    props: {
      error: 'Something has gone wrong',
    },
  };
}

export default Home;
