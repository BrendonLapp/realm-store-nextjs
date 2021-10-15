import axios from 'axios';
import React, { useState } from 'react';
import AddCardsPanel from './section/add-card-section/add-cards-panel';
import SearchBar from '../../shared/search-bar';
import SubmitButton from '../../shared/submit-button';
import { APICard } from '../../../types/card';
import AddCardInventoryPanel from './section/add-card-section/add-card-inventory-panel';

const AddCardsByName = ({}) => {
  const [searchParameter, setSearchParameter] = useState('');
  const [cards, setCards] = useState<APICard[] | undefined>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [cardName, setCardName] = useState('');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);

  const processSearch = async () => {
    if (searchParameter !== '') {
      const response: any = await axios.get(
        `/api/admin/card-inventory/search-from-api/by-partial/${searchParameter}`
      );

      const data = response.data;

      if (typeof response !== 'string') {
        setCards(data);
        setErrorMessage('');
        setCardName('');
      } else {
        setErrorMessage(response);
        setCardName('');
      }
    }
  };

  const viewProduct = (productName: string) => {
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
