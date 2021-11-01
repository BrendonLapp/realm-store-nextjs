export interface Inventory {
  cardInventoryID?: number;
  cardID: number;
  qualityID: number;
  quantity: number;
  printing: string;
  specialPrinting?: string | null;
}
