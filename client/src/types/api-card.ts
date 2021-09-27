export interface APICard {
  name: string;
  image: string;
  cardSets: Cardset[];
}

export interface Cardset {
  setCode: string;
  setName: string;
  setPrice: string;
  setRarity: string;
}
