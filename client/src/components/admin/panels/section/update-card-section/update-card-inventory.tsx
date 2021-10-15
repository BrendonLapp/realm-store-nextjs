import { useEffect, useState } from 'react';
import CardProvider from '../../../../../providers/card-provider';
import { Card } from '../../../../../types/card';
import SearchBar from '../../../../shared/search-bar';
import SubmitButton from '../../../../shared/submit-button';
import AddCardInventoryPanel from '../add-card-section/add-card-inventory-panel';
import AdminCardDisplay from './admin-card-display';
import UpdateCardInventoryPanel from './update-card-inventory-panel';

const UpdateCardInventory = () => {
  const [searchParameter, setSearchParameter] = useState('');
  const [cards, setCards] = useState<Card[] | string>();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [cardID, setCardID] = useState(0);

  const processSearch = async () => {
    const cardProvider = new CardProvider();
    setCardID(0);
    let responseCards;

    if (searchParameter === '') {
      responseCards = await cardProvider.getAllCards();
    }

    if (searchParameter !== '') {
      responseCards = await cardProvider.getAllCardsByPartialName(
        searchParameter
      );
    }

    if (typeof responseCards !== 'string') {
      setCards(responseCards);
    } else {
      setErrorMessage(responseCards);
    }

    setLoading(false);
  };

  const viewProduct = async (productID: number) => {
    setCardID(productID);
    setCards(undefined);
  };

  useEffect(() => {
    const handleLoad = async () => {
      const cardProvider = new CardProvider();

      let responseCards;

      if (searchParameter === '') {
        responseCards = await cardProvider.getAllCards();
      }

      if (typeof responseCards !== 'string') {
        setCards(responseCards);
      } else {
        setErrorMessage(responseCards);
      }

      setLoading(false);
    };

    if (loading) {
      handleLoad();
    }
  }, [cards, loading, searchParameter]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (errorMessage !== '') {
    return <div>{errorMessage}</div>;
  }

  return (
    <>
      <div className="form-inline my-2 panel-wrapper">
        <SearchBar
          widthStyling={'admin-search-width'}
          placeholder="Search by card name..."
          setSearchValue={setSearchParameter}
        />

        <SubmitButton submitAction={processSearch} name={'search'} />

        {cards !== undefined && typeof cards != 'string' && (
          <AdminCardDisplay displayCards={cards} viewProduct={viewProduct} />
        )}

        {cardID !== 0 && <UpdateCardInventoryPanel cardID={cardID} />}
      </div>
    </>
  );
};

export default UpdateCardInventory;
