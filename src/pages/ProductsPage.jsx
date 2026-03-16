import { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  ChevronRight, Grid, List, SlidersHorizontal, X, 
  Star, ChevronDown
} from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { setCategory, setFilters, setSortBy, clearFilters } from '../store/productSlice';
import { brands } from '../data/products';
import './ProductsPage.css';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

export default function ProductsPage() {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  
  const [viewMode, setViewMode] = useState('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);

  const { categories, filteredProducts, sortBy, selectedCategory } = useSelector(state => state.products);
  const currentCategory = categories.find(c => c.id === categoryId);

  useEffect(() => {
    if (categoryId) {
      dispatch(setCategory(categoryId));
    } else {
      dispatch(setCategory(null));
    }
    
    const brandParam = searchParams.get('brand');
    if (brandParam) {
      setSelectedBrands([brandParam]);
      dispatch(setFilters({ brands: [brandParam] }));
    }
  }, [categoryId, searchParams, dispatch]);

  const handleSortChange = (value) => {
    dispatch(setSortBy(value));
  };

  const handleBrandToggle = (brandId) => {
    const newBrands = selectedBrands.includes(brandId)
      ? selectedBrands.filter(b => b !== brandId)
      : [...selectedBrands, brandId];
    setSelectedBrands(newBrands);
    dispatch(setFilters({ brands: newBrands }));
  };

  const handleRatingFilter = (rating) => {
    setMinRating(rating);
    dispatch(setFilters({ rating }));
  };

  const handleStockFilter = (checked) => {
    setInStockOnly(checked);
    dispatch(setFilters({ inStock: checked }));
  };

  const handlePriceFilter = () => {
    dispatch(setFilters({ priceRange }));
  };

  const handleClearFilters = () => {
    setPriceRange([0, 500000]);
    setSelectedBrands([]);
    setMinRating(0);
    setInStockOnly(false);
    dispatch(clearFilters());
    if (categoryId) {
      dispatch(setCategory(categoryId));
    }
  };

  const activeFiltersCount = selectedBrands.length + (minRating > 0 ? 1 : 0) + (inStockOnly ? 1 : 0);

  return (
    <div className="products-page" data-testid="products-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb" data-testid="breadcrumb">
        <div className="container">
          <Link to="/" data-testid="breadcrumb-home">Home</Link>
          <ChevronRight size={16} />
          {currentCategory ? (
            <>
              <Link to="/products" data-testid="breadcrumb-all-products">All Products</Link>
              <ChevronRight size={16} />
              <span data-testid="breadcrumb-current-category">{currentCategory.name}</span>
            </>
          ) : (
            <span data-testid="breadcrumb-current">All Products</span>
          )}
        </div>
      </nav>

      <div className="container">
        <div className="products-layout">
          {/* Filters Sidebar */}
          <aside className={`filters-sidebar ${filtersOpen ? 'open' : ''}`} data-testid="filters-sidebar">
            <div className="filters-header">
              <h3>Filters</h3>
              {activeFiltersCount > 0 && (
                <button 
                  className="clear-filters" 
                  onClick={handleClearFilters}
                  data-testid="clear-all-filters-button"
                >
                  Clear All
                </button>
              )}
              <button 
                className="filters-close" 
                onClick={() => setFiltersOpen(false)}
                data-testid="close-filters-button"
                aria-label="Close filters"
              >
                <X size={24} />
              </button>
            </div>

            {/* Category Filter */}
            <div className="filter-section" data-testid="category-filter-section">
              <h4>Category</h4>
              <ul className="filter-list" data-testid="category-filter-list">
                <li>
                  <Link 
                    to="/products" 
                    className={!selectedCategory ? 'active' : ''}
                    data-testid="filter-category-all"
                  >
                    All Products
                  </Link>
                </li>
                {categories.map(cat => (
                  <li key={cat.id}>
                    <Link 
                      to={`/category/${cat.id}`}
                      className={selectedCategory === cat.id ? 'active' : ''}
                      data-testid={`filter-category-${cat.id}`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range Filter */}
            <div className="filter-section" data-testid="price-filter-section">
              <h4>Price Range</h4>
              <div className="price-inputs">
                <input 
                  type="number" 
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                  placeholder="Min"
                  data-testid="price-min-input"
                  aria-label="Minimum price"
                />
                <span>to</span>
                <input 
                  type="number" 
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                  placeholder="Max"
                  data-testid="price-max-input"
                  aria-label="Maximum price"
                />
              </div>
              <button 
                className="btn btn-sm btn-secondary" 
                onClick={handlePriceFilter}
                data-testid="apply-price-filter-button"
              >
                Apply
              </button>
            </div>

            {/* Brand Filter */}
            <div className="filter-section" data-testid="brand-filter-section">
              <h4>Brand</h4>
              <ul className="filter-checkbox-list" data-testid="brand-filter-list">
                {brands.map(brand => (
                  <li key={brand.id}>
                    <label>
                      <input 
                        type="checkbox"
                        checked={selectedBrands.includes(brand.id)}
                        onChange={() => handleBrandToggle(brand.id)}
                        data-testid={`filter-brand-${brand.id}`}
                      />
                      {brand.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rating Filter */}
            <div className="filter-section" data-testid="rating-filter-section">
              <h4>Customer Rating</h4>
              <ul className="filter-rating-list" data-testid="rating-filter-list">
                {[4, 3, 2, 1].map(rating => (
                  <li key={rating}>
                    <button 
                      className={minRating === rating ? 'active' : ''}
                      onClick={() => handleRatingFilter(rating)}
                      data-testid={`filter-rating-${rating}`}
                    >
                      <span className="stars">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star 
                            key={s} 
                            size={14} 
                            fill={s <= rating ? '#fbbf24' : 'none'}
                            stroke={s <= rating ? '#fbbf24' : '#cbd5e1'}
                          />
                        ))}
                      </span>
                      & Up
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Availability Filter */}
            <div className="filter-section" data-testid="availability-filter-section">
              <h4>Availability</h4>
              <label className="filter-checkbox">
                <input 
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => handleStockFilter(e.target.checked)}
                  data-testid="filter-in-stock"
                />
                In Stock Only
              </label>
            </div>
          </aside>

          {/* Products Content */}
          <main className="products-content" data-testid="products-content">
            {/* Header */}
            <div className="products-header" data-testid="products-header">
              <div className="products-info">
                <h1 data-testid="products-page-title">{currentCategory?.name || 'All Products'}</h1>
                <span className="products-count" data-testid="products-count">{filteredProducts.length} products</span>
              </div>
              
              <div className="products-controls" data-testid="products-controls">
                <button 
                  className="filters-toggle"
                  onClick={() => setFiltersOpen(true)}
                  data-testid="open-filters-button"
                >
                  <SlidersHorizontal size={20} />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="filter-badge" data-testid="active-filters-count">{activeFiltersCount}</span>
                  )}
                </button>

                <div className="sort-dropdown" data-testid="sort-dropdown">
                  <label>Sort by:</label>
                  <div className="select-wrapper">
                    <select 
                      value={sortBy} 
                      onChange={(e) => handleSortChange(e.target.value)}
                      data-testid="sort-select"
                      aria-label="Sort products"
                    >
                      {sortOptions.map(opt => (
                        <option key={opt.value} value={opt.value} data-testid={`sort-option-${opt.value}`}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={16} />
                  </div>
                </div>

                <div className="view-toggle" data-testid="view-toggle">
                  <button 
                    className={viewMode === 'grid' ? 'active' : ''}
                    onClick={() => setViewMode('grid')}
                    data-testid="grid-view-button"
                    aria-label="Grid view"
                  >
                    <Grid size={20} />
                  </button>
                  <button 
                    className={viewMode === 'list' ? 'active' : ''}
                    onClick={() => setViewMode('list')}
                    data-testid="list-view-button"
                    aria-label="List view"
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Tags */}
            {activeFiltersCount > 0 && (
              <div className="active-filters" data-testid="active-filters">
                {selectedBrands.map(brandId => {
                  const brand = brands.find(b => b.id === brandId);
                  return (
                    <span key={brandId} className="filter-tag" data-testid={`active-filter-brand-${brandId}`}>
                      {brand?.name}
                      <button 
                        onClick={() => handleBrandToggle(brandId)}
                        data-testid={`remove-brand-filter-${brandId}`}
                        aria-label={`Remove ${brand?.name} filter`}
                      >
                        <X size={14} />
                      </button>
                    </span>
                  );
                })}
                {minRating > 0 && (
                  <span className="filter-tag" data-testid="active-filter-rating">
                    {minRating}+ Stars
                    <button 
                      onClick={() => handleRatingFilter(0)}
                      data-testid="remove-rating-filter"
                      aria-label="Remove rating filter"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                {inStockOnly && (
                  <span className="filter-tag" data-testid="active-filter-stock">
                    In Stock
                    <button 
                      onClick={() => handleStockFilter(false)}
                      data-testid="remove-stock-filter"
                      aria-label="Remove in stock filter"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div 
                className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}
                data-testid="products-grid"
              >
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="no-products" data-testid="no-products-found">
                <h3>No products found</h3>
                <p>Try adjusting your filters or search criteria</p>
                <button className="btn btn-primary" onClick={handleClearFilters}>
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {filtersOpen && (
        <div className="filters-overlay" onClick={() => setFiltersOpen(false)} />
      )}
    </div>
  );
}
