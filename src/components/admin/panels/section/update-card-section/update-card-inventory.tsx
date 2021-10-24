import { useEffect, useState } from 'react';
import getAllInternalCards from '../../../../../lib/get-all-internal-cards';
import getAllInternalCardsByPartialName from '../../../../../lib/get-all-internal-cards-by-partial';
import { Card } from '../../../../../types/card';
import SearchBar from '../../../../shared/search-bar';
import SubmitButton from '../../../../shared/submit-button';
import AdminCardDisplay from './admin-card-display';
import UpdateCardInventoryPanel from './update-card-inventory-panel';

const UpdateCardInventory = () => {
  const [searchParameter, setSearchParameter] = useState('');
  const [cards, setCards] = useState<Card[] | string>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cardID, setCardID] = useState(0);

  const processSearch = async () => {
    setCardID(0);
    let responseCards: any;
    try {
      if (searchParameter === '') {
        responseCards = await getAllInternalCards();
      }

      if (searchParameter !== '') {
        responseCards = await getAllInternalCardsByPartialName(searchParameter);
      }

      if (typeof responseCards !== 'string' && responseCards) {
        setCards(responseCards.data);
      } else {
        setErrorMessage(responseCards);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const viewProduct = async (productID: number) => {
    setCardID(productID);
    setCards(undefined);
  };

  useEffect(() => {
    const handleLoad = async () => {
      let responseCards: any;

      if (searchParameter === '') {
        responseCards = await getAllInternalCards();
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
