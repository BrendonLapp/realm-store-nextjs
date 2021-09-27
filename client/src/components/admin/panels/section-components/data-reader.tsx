import { FormEvent, useState } from 'react';
import CardProvider from '../../../../providers/card-provider';

const DataReader = () => {
  const [jsonData, setJsonData] = useState<string>('');

  const handleOnChange = (event: FormEvent<HTMLTextAreaElement>) => {
    const csvData = event.currentTarget.value;

    setJsonData(csvData);
  };

  const onSubmit = () => {
    if (jsonData !== '') {
      const cardProvider = new CardProvider();
      cardProvider.addNewCards(jsonData);
    }
  };

  const onClear = () => {
    setJsonData('');
  };

  return (
    <>
      <div style={{ height: '65vh' }}>
        <textarea className="csv-box" onChange={handleOnChange} />
      </div>

      <div className="csv-buttons">
        <button
          type="button"
          className="btn btn-success mr2"
          onClick={onSubmit}
        >
          Submit
        </button>
        <button type="button" className="btn btn-warning" onClick={onClear}>
          Clear
        </button>
      </div>
    </>
  );
};

export default DataReader;
