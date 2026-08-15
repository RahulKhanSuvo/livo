import { ProductValidationType } from '../products/productValidation';

export type GetAllFurnitureResponse = {
  products: ProductValidationType[];
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};
