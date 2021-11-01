const checkSpecialPrinting = (cardName: string): string | null => {
  console.log(cardName);
  if (cardName.includes('Green')) {
    return 'Green';
  }

  if (cardName.includes('Blue')) {
    return 'Blue';
  }

  if (cardName.includes('Purple')) {
    return 'Purple';
  }

  return null;
};

export default checkSpecialPrinting;
