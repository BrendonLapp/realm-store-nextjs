import { useState } from 'react';
import CardProvider from '../../../../providers/card-provider';
import { APICard } from '../../../../types/api-card';
import SearchBar from '../../../shared/search-bar';
import SubmitButton from '../../../shared/submit-button';
import AddCardInventoryPanel from './add-card-inventory-panel';
import AddCardsPanel from './add-cards-panel';

const AddCardsByName = () => {
  const [searchParameter, setSearchParameter] = useState('');
  const [cards, setCards] = useState<APICard[]>();
  const [errorMessage, setErrorMessage] = useState('');
  const [cardName, setCardName] = useState('');

  const processSearch = async () => {
    const cardProvider = new CardProvider();

    if (searchParameter !== '') {
      const responseCards = await cardProvider.getCardsFromAPI(searchParameter);

      if (typeof responseCards !== 'string') {
        setCards(responseCards);
        setErrorMessage('');
        setCardName('');
      } else {
        setErrorMessage(responseCards);
        setCards(undefined);
        setCardName('');
      }
    }
  };

  const viewProduct = async (productName: string) => {
    setCardName(productName);
    setCards(undefined);
  };

  return (
    <>
      <div className="form-inline my-2 panel-wrapper">
        <SearchBar
          widthStyling={'admin-search-width'}
          placeholder="Search by card name..."
          setSearchValue={setSearchParameter}
        />

        <SubmitButton submitAction={processSearch} name={'search'} />

        {errorMessage && <div>{errorMessage}</div>}

        {cardName && <AddCardInventoryPanel cardName={cardName} />}

        {cards && <AddCardsPanel cards={cards} viewProduct={viewProduct} />}
      </div>
    </>
  );
};

export default AddCardsByName;
