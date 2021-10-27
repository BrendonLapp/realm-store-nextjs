import Carousel from '../components/store/home-page/carousel';
import ProductDisplay from '../components/store/product-display';
import { getHomePageCards } from '../controllers/card-controller';
import { Card } from '../types/card';
import { GalleryImages } from '../types/gallery-images';

interface HomeProps {
  cards?: Card[];
  error?: string;
  galleryImages: GalleryImages[];
}

const Home = ({ cards, galleryImages }: HomeProps) => {
  return (
    <>
      <div>
        {cards && <ProductDisplay cardsData={cards} />}
        {!cards && <div>No Data</div>}
        <Carousel />
      </div>
    </>
  );
};

export async function getStaticProps() {
  const allCards = await getHomePageCards();

  const items: GalleryImages[] = [
    {
      image: 'https://picsum.photos/id/1018/1000/600/',
      caption: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      image: 'https://picsum.photos/id/1015/1000/600/',
      caption: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      image: 'https://picsum.photos/id/1019/1000/600/',
      caption: 'https://picsum.photos/id/1019/250/150/',
    },
  ];

  if (allCards) {
    return {
      props: {
        cards: allCards,
        galleryImages: items,
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
