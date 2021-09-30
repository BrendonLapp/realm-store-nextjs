export interface CardImage {
  id: number;
  imageUrl: string;
}

export interface CardSet {
  setName: string;
  setCode: string;
  setRarity: string;
  setPrice: string;
}

export interface APIDetails {
  name: string;
  cardImages: CardImage[];
  cardSets: CardSet[];
}
