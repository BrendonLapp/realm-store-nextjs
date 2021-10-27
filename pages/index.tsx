import ProductDisplay from '../components/store/product-display';
import { getHomePageCards } from '../controllers/card-controller';
import { Card } from '../types/card';

interface HomeProps {
  cards?: Card[];
  error?: string;
}

const Home = ({ cards }: HomeProps) => {
  return (
    <>
      <div>
        {cards && <ProductDisplay cardsData={cards} />}
        {!cards && <div>No Data</div>}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const allCards = await getHomePageCards();

  if (allCards) {
    return {
      props: {
        cards: allCards,
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
