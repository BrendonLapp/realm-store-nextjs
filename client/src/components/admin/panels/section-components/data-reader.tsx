import { FormEvent } from 'react';
import { addNewCards } from '../../../../providers/card-provider';

const DataReader = () => {
  const handleOnChange = (event: FormEvent<HTMLTextAreaElement>) => {
    const jsonData = event.currentTarget.value;

    addNewCards(jsonData);
  };

  return <textarea onChange={handleOnChange} />;
};

export default DataReader;
