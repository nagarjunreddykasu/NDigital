import { createSlice } from '@reduxjs/toolkit';
import { products, categories } from '../data/products';

const initialState = {
  products: products,
  categories: categories,
  filteredProducts: products,
  searchQuery: '',
  selectedCategory: null,
  filters: {
    priceRange: [0, 500000],
    brands: [],
    rating: 0,
    inStock: false,
  },
  sortBy: 'featured',
  loading: false,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      applyFilters(state);
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      applyFilters(state);
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      applyFilters(state);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      applyFilters(state);
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.searchQuery = '';
      state.selectedCategory = null;
      state.sortBy = 'featured';
      state.filteredProducts = state.products;
    },
  },
});

function applyFilters(state) {
  let filtered = [...state.products];

  // Search filter
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }

  // Category filter
  if (state.selectedCategory) {
    filtered = filtered.filter(p => p.category === state.selectedCategory);
  }

  // Price range filter
  filtered = filtered.filter(p =>
    p.price >= state.filters.priceRange[0] &&
    p.price <= state.filters.priceRange[1]
  );

  // Brand filter
  if (state.filters.brands.length > 0) {
    filtered = filtered.filter(p =>
      state.filters.brands.includes(p.brand.toLowerCase())
    );
  }

  // Rating filter
  if (state.filters.rating > 0) {
    filtered = filtered.filter(p => p.rating >= state.filters.rating);
  }

  // In stock filter
  if (state.filters.inStock) {
    filtered = filtered.filter(p => p.inStock);
  }

  // Sorting
  switch (state.sortBy) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      filtered.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
      break;
    case 'featured':
    default:
      filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }

  state.filteredProducts = filtered;
}

export const { setSearchQuery, setCategory, setFilters, setSortBy, clearFilters } = productSlice.actions;
export default productSlice.reducer;
