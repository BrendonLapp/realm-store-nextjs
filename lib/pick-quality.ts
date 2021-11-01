const pickQuality = (qualityName: string): number | undefined => {
  switch (qualityName) {
    case 'Near Mint':
      return 1;
    case 'Lightly Played':
      return 2;
    case 'Moderately Played':
      return 3;
    case 'Heavily Played':
      return 4;
  }
};

export default pickQuality;
