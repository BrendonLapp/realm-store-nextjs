import axios from 'axios';

const GetConversionRate = async (): Promise<number> => {
  try {
    const valetURL =
      'https://www.bankofcanada.ca/valet/observations/FXUSDCAD/json?recent=1';
    const response = await axios.get(valetURL);

    return response.data.observations[0].FXUSDCAD.v;
  } catch (error) {
    console.error(error);
  }
};

export default GetConversionRate;
