import NavBar from '../src/components/nav/nav-bar';
import ProductDisplay from '../src/components/store/product-display';
import CardController from '../src/controllers/card-controller';
import { Card } from '../src/types/card';

interface HomeProps {
  cards?: Card[];
  error?: string;
}

const Home = ({ cards, error }: HomeProps) => {
  return (
    <>
      <NavBar />
      <div>
        {cards && <ProductDisplay cardsData={cards} />}
        {!cards && <div>no data</div>}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const cardController = new CardController();
  const allCards = await cardController.getAllCards();

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
