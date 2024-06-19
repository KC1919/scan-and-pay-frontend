export interface TProduct {
  id: string;
  name: string;
  sellingPrice: JSON;
  vegTag: boolean;
  disabled: boolean;
  categoryId: string | null;
  imageUrl: string;
}

export interface TProductCreate {
  name: string;
  sellingPrice: JSON;
  vegTag: boolean;
  categoryId: string | null;
}
