//TODO: should split card in the future into an admin and customer display
//Also should split all the interfaces into different files
export interface Card {
  cardID?: number;
  apiID?: number;
  quantity: number;
  cardName: string;
  setName: string;
  cardNumber: string;
  setCode: string;
  printing: string;
  specialPrinting: string | null;
  condition: string;
  rarity: string;
  price?: number;
  image?: string;
  manualSetPrice: boolean;
}

export interface ApiResponse {
  apiID: number;
  price?: number;
}

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

export interface TabDisplay {
  name: string;
  Component: any;
}
