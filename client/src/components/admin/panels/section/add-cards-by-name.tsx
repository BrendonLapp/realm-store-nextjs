import { useState } from 'react';
import CardProvider from '../../../../providers/card-provider';
import { APICard } from '../../../../types/api-card';
import SearchBar from '../../../shared/search-bar';
import ProductImage from '../../../store/product-image';
import InventoryInfo from '../section-components/inventory-info';

const AddCardsByName = () => {
  const [searchParameter, setSearchParameter] = useState('');
  const [cards, setCards] = useState<APICard[]>();
  const [errorMessage, setErrorMessage] = useState('');

  const processSearch = async () => {
    const cardProvider = new CardProvider();

    if (searchParameter !== '') {
      const responseCards = await cardProvider.getCardsFromAPI(searchParameter);

      if (typeof responseCards !== 'string') {
        setCards(responseCards);
      } else {
        setErrorMessage(responseCards);
      }
    }
  };

  if (errorMessage) {
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
          <div>{errorMessage}</div>
        </div>
      </>
    );
  }

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

        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {cards &&
              cards?.map((card: APICard) => (
                <div key={card.name} className="col mb-5 productbox">
                  <div
                    className="card"
                    style={{ backgroundColor: 'lightgray' }}
                  >
                    <ProductImage
                      imageSource={card.image}
                      imageAlt={card.name}
                    />
                    <InventoryInfo name={card.name} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCardsByName;
