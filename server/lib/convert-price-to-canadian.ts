import GetConversionRate from './get-conversion-rate';

const ConvertPriceToCanadian = async (americanPrice: number) => {
  const conversionRate = await GetConversionRate();

  const canadianPrice = americanPrice * conversionRate;

  return canadianPrice;
};

export default ConvertPriceToCanadian;
