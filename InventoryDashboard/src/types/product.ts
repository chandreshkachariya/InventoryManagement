export type Product = {
    id: string;
    name: string;
    category: string;
    stockQuantity: number;
    price: number;
  };
  
  export type ProductCategory = 'Electronics' | 'Apparel' | 'Food' | 'Other';
  
  export type ProductsState = {
    products: Product[];
    filteredProducts: Product[];
    filters: {
      category: ProductCategory | 'All';
      inStockOnly: boolean;
      lowStockOnly: boolean;
    };
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };