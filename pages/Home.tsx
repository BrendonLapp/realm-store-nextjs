import ProductDisplay from '../src/components/store/product-display';
import { getAllCards } from '../src/controllers/card-controller';
import { Card } from '../src/types/card';

interface HomeProps {
  cards?: Card[];
  error?: string;
}

const Home = ({ cards, error }: HomeProps) => {
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
  const allCards = await getAllCards();

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
