import { useState } from 'react';
import CardProvider from '../../../../providers/card-provider';
import SearchBar from '../../../shared/search-bar';

const AddCardsByName = () => {
  const [searchParameter, setSearchParameter] = useState('');

  const processSearch = async () => {
    const cardProvider = new CardProvider();

    await cardProvider.getCardsFromAPI(searchParameter);
  };

  return (
    <>
      <div className="form-inline my-2 panel-wrapper">
        <SearchBar
          widthStyling={'admin-search-width'}
          placeholder="Search by card name..."
          setSearchValue={setSearchParameter}
        />
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          type="submit"
          onClick={processSearch}
        >
          Search
        </button>
      </div>
    </>
  );
};

export default AddCardsByName;
