import axios from 'axios';
import { FormEvent, useState } from 'react';
import { addNewCardsByCSV } from '../../../../controllers/card-controller';

const DataReader = () => {
  const [jsonData, setJsonData] = useState<string>('');

  const handleOnChange = (event: FormEvent<HTMLTextAreaElement>) => {
    const csvData = event.currentTarget.value;

    setJsonData(csvData);
  };

  const onSubmit = async () => {
    if (jsonData !== '') {
      await axios.post('/api/admin/card-inventory/add-by-csv', {
        data: jsonData,
      });
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
