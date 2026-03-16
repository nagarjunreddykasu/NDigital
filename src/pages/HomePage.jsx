import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  ChevronRight, ChevronLeft, ArrowRight, Zap, Truck, Shield, 
  Smartphone, Laptop, Monitor, Headphones, Camera, Gamepad2 
} from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { getFeaturedProducts, getNewArrivals, deals, brands } from '../data/products';
import './HomePage.css';

const categoryIcons = {
  smartphones: Smartphone,
  laptops: Laptop,
  tvs: Monitor,
  audio: Headphones,
  cameras: Camera,
  gaming: Gamepad2,
};

const heroSlides = [
  {
    title: 'Next-Gen Smartphones',
    subtitle: 'Experience the Future',
    description: 'Discover the latest flagship phones with cutting-edge AI features',
    cta: 'Shop Smartphones',
    link: '/category/smartphones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=500&fit=crop',
    color: 'blue',
  },
  {
    title: 'Power Your Creativity',
    subtitle: 'Pro-Level Laptops',
    description: 'High-performance laptops for work, gaming, and everything in between',
    cta: 'Shop Laptops',
    link: '/category/laptops',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=500&fit=crop',
    color: 'purple',
  },
  {
    title: 'Immersive Entertainment',
    subtitle: 'Premium TVs & Audio',
    description: 'Transform your home with stunning displays and crystal-clear sound',
    cta: 'Shop TVs',
    link: '/category/tvs',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=500&fit=crop',
    color: 'dark',
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { categories, products } = useSelector(state => state.products);
  
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();
  const dealsProducts = deals.map(d => ({
    ...products.find(p => p.id === d.productId),
    dealDiscount: d.discount,
    dealEnds: d.endsAt,
  })).filter(Boolean);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="home-page" data-testid="home-page">
      {/* Hero Section */}
      <section className="hero" data-testid="hero-section">
        <div className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div 
              key={index} 
              className={`hero-slide ${slide.color} ${index === currentSlide ? 'active' : ''}`}
              data-testid={`hero-slide-${index}`}
            >
              <div className="container">
                <div className="hero-content">
                  <span className="hero-subtitle" data-testid={`hero-subtitle-${index}`}>{slide.subtitle}</span>
                  <h1 className="hero-title" data-testid={`hero-title-${index}`}>{slide.title}</h1>
                  <p className="hero-description">{slide.description}</p>
                  <Link to={slide.link} className="btn btn-primary btn-lg" data-testid={`hero-cta-${index}`}>
                    {slide.cta}
                    <ArrowRight size={20} />
                  </Link>
                </div>
                <div className="hero-image">
                  <img src={slide.image} alt={slide.title} data-testid={`hero-image-${index}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="hero-nav prev" onClick={prevSlide} data-testid="hero-prev-button" aria-label="Previous slide">
          <ChevronLeft size={24} />
        </button>
        <button className="hero-nav next" onClick={nextSlide} data-testid="hero-next-button" aria-label="Next slide">
          <ChevronRight size={24} />
        </button>
        <div className="hero-dots" data-testid="hero-dots">
          {heroSlides.map((_, index) => (
            <button 
              key={index} 
              className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              data-testid={`hero-dot-${index}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="section categories-section" data-testid="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" data-testid="categories-title">Shop by Category</h2>
            <Link to="/products" className="section-link" data-testid="view-all-categories">
              View All <ChevronRight size={18} />
            </Link>
          </div>
          <div className="categories-grid" data-testid="categories-grid">
            {categories.map(category => {
              const Icon = categoryIcons[category.id];
              return (
                <Link 
                  key={category.id} 
                  to={`/category/${category.id}`}
                  className="category-card"
                  data-testid={`category-card-${category.id}`}
                >
                  <div className="category-icon">
                    {Icon && <Icon size={32} />}
                  </div>
                  <h3 data-testid={`category-name-${category.id}`}>{category.name}</h3>
                  <p>{category.description}</p>
                  <span className="category-link">
                    Shop Now <ChevronRight size={16} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightning Deals */}
      <section className="section deals-section" data-testid="deals-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" data-testid="deals-title">
              <Zap size={28} className="deals-icon" />
              Lightning Deals
            </h2>
            <Link to="/deals" className="section-link" data-testid="view-all-deals">
              View All Deals <ChevronRight size={18} />
            </Link>
          </div>
          <div className="deals-grid" data-testid="deals-grid">
            {dealsProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="features-banner" data-testid="features-banner">
        <div className="container">
          <div className="features-grid" data-testid="features-grid">
            <div className="feature-card" data-testid="feature-free-shipping">
              <Truck size={40} />
              <div>
                <h3>Free Shipping</h3>
                <p>On orders over $99</p>
              </div>
            </div>
            <div className="feature-card" data-testid="feature-warranty">
              <Shield size={40} />
              <div>
                <h3>2-Year Warranty</h3>
                <p>Extended protection</p>
              </div>
            </div>
            <div className="feature-card" data-testid="feature-fast-delivery">
              <Zap size={40} />
              <div>
                <h3>Fast Delivery</h3>
                <p>Same day available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section" data-testid="featured-products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" data-testid="featured-title">Featured Products</h2>
            <Link to="/products" className="section-link" data-testid="view-all-featured">
              View All <ChevronRight size={18} />
            </Link>
          </div>
          <div className="products-grid" data-testid="featured-products-grid">
            {featuredProducts.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section" data-testid="new-arrivals-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" data-testid="arrivals-title">New Arrivals</h2>
            <Link to="/products?filter=new" className="section-link" data-testid="view-all-arrivals">
              View All <ChevronRight size={18} />
            </Link>
          </div>
          <div className="products-grid" data-testid="new-arrivals-grid">
            {newArrivals.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="section brands-section" data-testid="brands-section">
        <div className="container">
          <h2 className="section-title text-center" data-testid="brands-title">Shop by Brand</h2>
          <div className="brands-grid" data-testid="brands-grid">
            {brands.map(brand => (
              <Link 
                key={brand.id} 
                to={`/products?brand=${brand.id}`}
                className="brand-card"
                data-testid={`brand-card-${brand.id}`}
              >
                <span className="brand-name">{brand.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="newsletter-section" data-testid="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2 data-testid="newsletter-title">Stay Updated with Tech News</h2>
            <p>Subscribe to our newsletter for exclusive deals and the latest product updates</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()} data-testid="newsletter-form">
              <input type="email" placeholder="Enter your email address" data-testid="newsletter-email-input" aria-label="Email address" />
              <button type="submit" className="btn btn-primary" data-testid="newsletter-subscribe-button">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
