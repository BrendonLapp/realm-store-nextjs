export interface Card {
  cardID?: number;
  apiID?: number;
  quantity: number;
  cardName: string;
  setName: string;
  cardNumber: string;
  setCode: string;
  printing: string;
  condition: string;
  rarity: string;
  price?: number;
  image?: string;
}

export interface ApiResponse {
  apiID: number;
  price?: number;
}
