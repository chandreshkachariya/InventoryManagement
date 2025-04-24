import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductsState } from '../types/product';

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  filters: {
    category: 'All',
    inStockOnly: false,
    lowStockOnly: false,
  },
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      applyFilters(state);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      applyFilters(state);
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
      applyFilters(state);
    },
    deleteMultipleProducts: (state, action: PayloadAction<string[]>) => {
      state.products = state.products.filter(product => !action.payload.includes(product.id));
      applyFilters(state);
    },
    setCategoryFilter: (state, action: PayloadAction<ProductCategory | 'All'>) => {
      state.filters.category = action.payload;
      applyFilters(state);
    },
    setInStockFilter: (state, action: PayloadAction<boolean>) => {
      state.filters.inStockOnly = action.payload;
      applyFilters(state);
    },
    setLowStockFilter: (state, action: PayloadAction<boolean>) => {
      state.filters.lowStockOnly = action.payload;
      applyFilters(state);
    },
  },
});

// Helper function to apply filters
function applyFilters(state: ProductsState) {
  let filtered = [...state.products];
  
  if (state.filters.category !== 'All') {
    filtered = filtered.filter(product => product.category === state.filters.category);
  }
  
  if (state.filters.inStockOnly) {
    filtered = filtered.filter(product => product.stockQuantity > 0);
  }
  
  if (state.filters.lowStockOnly) {
    filtered = filtered.filter(product => product.stockQuantity < 5);
  }
  
  state.filteredProducts = filtered;
}

export const {
  addProduct,
  updateProduct,
  deleteProduct,
  deleteMultipleProducts,
  setCategoryFilter,
  setInStockFilter,
  setLowStockFilter,
} = productsSlice.actions;

export default productsSlice.reducer;