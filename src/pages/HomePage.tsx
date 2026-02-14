import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, Shield, Heart, Check, Star, Loader2, Sparkles, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/products/ProductCard';
import { fetchFeaturedProducts, fetchNewProducts, fetchRecentProducts } from '@/services/productService';
import { Product } from '@/types';
import { supabase } from '@/integrations/supabase/client';

// Features data for hero overlay cards
const heroFeatures = [
  { icon: Sparkles, title: 'Premium Quality' },
  { icon: Package, title: 'Handcrafted' },
  { icon: Heart, title: 'Elegant Designs' },
  { icon: Truck, title: 'Fast Delivery' },
];

interface HomePageContent {
  hero?: {
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
    badgeTitle: string;
    badgeSubtitle: string;
  };
  about?: {
    tagline: string;
    title: string;
    badge1: string;
    badge2: string;
    paragraph1: string;
    paragraph2: string;
    quote: string;
    experienceYears: string;
    experienceText: string;
  };
  promo_banners?: {
    banner1: {
      image: string;
      tagline: string;
      title: string;
      subtitle: string;
      buttonText: string;
    };
    banner2: {
      image: string;
      tagline: string;
      title: string;
      subtitle: string;
      buttonText: string;
    };
  };
  featured_products?: {
    tagline: string;
    title: string;
    buttonText: string;
  };
  why_choose_us?: {
    tagline: string;
    title: string;
  };
  testimonials?: {
    tagline: string;
    title: string;
    items: Array<{
      name: string;
      location: string;
      text: string;
    }>;
  };
  features?: {
    items: Array<{
      title: string;
      description: string;
    }>;
  };
}

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState<HomePageContent>({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const [featured, newArrivals, recent, contentData] = await Promise.all([
          fetchFeaturedProducts(),
          fetchNewProducts(),
          fetchRecentProducts(8),
          supabase.from('home_page_content').select('*'),
        ]);
        setFeaturedProducts(featured);
        setNewProducts(newArrivals);
        setRecentProducts(recent);
        
        if (contentData.data) {
          const contentMap: HomePageContent = {};
          contentData.data.forEach((item: any) => {
            contentMap[item.section_key as keyof HomePageContent] = item.content;
          });
          setContent(contentMap);
        }
      } catch (error) {
        console.error('Failed to load home page data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Default values
  const hero = content.hero || {
    title: 'Timeless Elegance,',
    subtitle: 'Modern Style.',
    description: 'Discover our curated collection of premium sarees, three-piece sets, and ethnic wear — crafted for the modern woman.',
    buttonText: 'Shop Now',
    badgeTitle: 'New Arrivals',
    badgeSubtitle: 'Fresh collection just dropped',
  };

  const about = content.about || {
    tagline: 'Our Story',
    title: 'About Us',
    badge1: 'Handpicked Fabrics',
    badge2: 'Nationwide Delivery',
    paragraph1: 'We believe fashion is more than clothing — it\'s an expression of identity and culture. Every piece in our collection is carefully curated to bring you the finest in ethnic wear.',
    paragraph2: 'From luxurious Banarasi silk sarees to comfortable everyday three-piece sets, we source directly from artisans to ensure authenticity and quality.',
    quote: 'Quality fabric, timeless design, and unmatched comfort — that\'s what we deliver.',
    experienceYears: '5+',
    experienceText: 'Years of Excellence',
  };

  const promoBanners = content.promo_banners || {
    banner1: {
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=600&fit=crop',
      tagline: 'New Collection',
      title: 'Silk Sarees',
      subtitle: 'Handwoven Luxury',
      buttonText: 'Explore',
    },
    banner2: {
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&h=600&fit=crop',
      tagline: 'Trending',
      title: 'Three Piece Sets',
      subtitle: 'Comfort Meets Style',
      buttonText: 'Shop Now',
    },
  };

  const featuredSection = content.featured_products || {
    tagline: 'Our Collection',
    title: 'Handpicked for You',
    buttonText: 'View All',
  };

  const whyChooseUs = content.why_choose_us || {
    tagline: 'Why Choose Us?',
    title: 'Trusted by thousands for quality, authenticity, and impeccable style.',
  };

  const testimonials = content.testimonials?.items || [
    {
      name: 'Ayesha Rahman',
      location: 'Dhaka',
      text: 'The Banarasi saree I ordered was absolutely stunning. The quality exceeded my expectations. Will definitely order again!',
    },
    {
      name: 'Nusrat Jahan',
      location: 'Chittagong',
      text: 'Beautiful three-piece set with amazing embroidery. Packaging was excellent and delivery was quick. Highly recommended.',
    },
    {
      name: 'Fatima Khatun',
      location: 'Sylhet',
      text: 'I\'ve been shopping here for months now. Every piece is exactly as shown in the pictures. Great customer service too!',
    },
  ];

  const features = content.features?.items || [
    { title: 'Premium Fabrics', description: 'Every piece is crafted from the finest materials' },
    { title: 'Direct from Artisans', description: 'We source directly from skilled craftspeople' },
    { title: 'Secure Packaging', description: 'Your order arrives in pristine condition' },
    { title: 'Affordable Pricing', description: 'Luxury fashion at accessible prices' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-36 md:pt-40">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-background">
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop"
                  alt="Premium Fashion Collection"
                  className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl object-cover"
                />
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-4 -left-4 bg-card rounded-2xl p-4 shadow-xl border border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{hero.badgeTitle}</p>
                      <p className="text-xs text-muted-foreground">{hero.badgeSubtitle}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2 text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                <span className="text-foreground">{hero.title}</span>
                <br />
                <span className="text-accent">{hero.subtitle}</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                {hero.description}
              </p>
              <Button variant="default" size="lg" asChild className="text-base px-8">
                <Link to="/products">
                  {hero.buttonText}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-8 bg-card border-y border-border">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Check className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Products */}
      {recentProducts.length > 0 && (
        <section className="py-16 md:py-24 bg-background">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-12"
            >
              <div>
                <span className="text-accent font-medium text-sm uppercase tracking-wider">New Arrivals</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2">
                  Latest Collection
                </h2>
              </div>
              <Button variant="outline" size="lg" asChild>
                <Link to="/products">
                  View All
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {recentProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop"
                alt="About Us"
                className="rounded-2xl shadow-xl w-full max-w-md mx-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-foreground text-background rounded-2xl p-6 shadow-lg">
                <p className="text-3xl font-bold">{about.experienceYears}</p>
                <p className="text-sm opacity-80">{about.experienceText}</p>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-accent font-medium text-sm uppercase tracking-wider">{about.tagline}</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-6">
                {about.title}
              </h2>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
                  <Check className="h-4 w-4" /> {about.badge1}
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
                  <Check className="h-4 w-4" /> {about.badge2}
                </span>
              </div>

              <p className="text-muted-foreground mb-4">{about.paragraph1}</p>
              <p className="text-muted-foreground mb-6">{about.paragraph2}</p>

              <p className="text-sm font-medium text-foreground italic border-l-4 border-accent pl-4">
                {about.quote}
              </p>

              <Button variant="outline" size="lg" className="mt-6" asChild>
                <Link to="/products">Learn More</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Promotional Banners - Side by Side */}
      <section className="py-12 bg-background">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Banner 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden group"
            >
              <img
                src={promoBanners.banner1.image}
                alt="Saree Collection"
                className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <span className="text-accent font-medium text-sm">{promoBanners.banner1.tagline}</span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-background mt-2 mb-4">
                  {promoBanners.banner1.title}<br />{promoBanners.banner1.subtitle}
                </h3>
                <div>
                  <Button variant="secondary" className="rounded-full" asChild>
                    <Link to="/products">{promoBanners.banner1.buttonText}</Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Banner 2 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden group"
            >
              <img
                src={promoBanners.banner2.image}
                alt="Three Piece Collection"
                className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <span className="text-accent font-medium text-sm">{promoBanners.banner2.tagline}</span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-background mt-2 mb-4">
                  {promoBanners.banner2.title}<br />{promoBanners.banner2.subtitle}
                </h3>
                <div>
                  <Button variant="secondary" className="rounded-full" asChild>
                    <Link to="/products">{promoBanners.banner2.buttonText}</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <span className="text-accent font-medium text-sm uppercase tracking-wider">{featuredSection.tagline}</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2">
                {featuredSection.title}
              </h2>
            </div>
            <Button variant="outline" size="lg" asChild>
              <Link to="/products">
                {featuredSection.buttonText}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.slice(0, 8).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-foreground">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-accent font-medium text-sm uppercase tracking-wider">{whyChooseUs.tagline}</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-background mt-2 mb-8 leading-tight">
                {whyChooseUs.title}
              </h2>
            </motion.div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-lg">
              {heroFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background/10 backdrop-blur-sm p-6 rounded-xl text-center border border-background/20"
                >
                  <div className="w-14 h-14 mx-auto rounded-full bg-accent/20 flex items-center justify-center mb-3">
                    <feature.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h4 className="font-semibold text-background text-sm">{feature.title}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-accent font-medium text-sm uppercase tracking-wider">{content.testimonials?.tagline || 'Testimonials'}</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2">
              {content.testimonials?.title || 'What Our Customers Say'}
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Hear from our happy customers about their experience shopping with us.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-2xl border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-foreground">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-background mb-4">
            Shop Your Style Today
          </h2>
          <p className="text-background/70 mb-8 max-w-md mx-auto">
            Browse our latest collection of sarees, three-piece sets, and more. Free delivery nationwide.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
            <Link to="/products">
              Browse Collection
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
