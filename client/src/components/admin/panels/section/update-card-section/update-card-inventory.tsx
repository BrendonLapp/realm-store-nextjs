import { useEffect, useState } from 'react';
import CardProvider from '../../../../../providers/card-provider';
import { Card } from '../../../../../types/card';
import SearchBar from '../../../../shared/search-bar';
import SubmitButton from '../../../../shared/submit-button';
import AdminCardDisplay from './admin-card-display';

const UpdateCardInventory = () => {
  const [searchParameter, setSearchParameter] = useState('');
  const [cards, setCards] = useState<Card[] | string>();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const processSearch = async () => {
    const cardProvider = new CardProvider();
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
          <AdminCardDisplay displayCards={cards} />
        )}
      </div>
    </>
  );
};

export default UpdateCardInventory;
