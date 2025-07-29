import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import SpaceHero from '@/components/SpaceHero';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const aboutRef = useRef(null);
  const productsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.from('.hero-title', { duration: 1, y: 100, opacity: 0, ease: 'power3.out' })
      .from('.hero-subtitle', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' }, '-=0.7')
      .from('.hero-cta', { duration: 1, y: 30, opacity: 0, ease: 'power3.out' }, '-=0.7');

    gsap.from('.about-content', {
      scrollTrigger: { trigger: aboutRef.current, start: 'top 80%' },
      duration: 1, y: 100, opacity: 0, ease: 'power3.out'
    });
    gsap.from('.product-grid', {
      scrollTrigger: { trigger: productsRef.current, start: 'top 80%' },
      duration: 1, y: 100, opacity: 0, ease: 'power3.out'
    });
  }, []);

  const [products, setProducts] = useState([]);
  const testimonials = JSON.parse(localStorage.getItem('ryuStoreTestimonials') || '[]').slice(0, 3);

  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <>
      <Helmet>
        <title>Ryu Store - Digital Services & Solutions Terbaik</title>
        <meta name="description" content="Ryu Store menyediakan layanan digital terbaik termasuk panel premium, jasa banned WhatsApp, dan open murid dengan teknologi terdepan dan harga terjangkau." />
      </Helmet>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen dark-bg"
      >
        <Navbar />
        
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <SpaceHero />
          <div className="absolute inset-0 bg-black/50 z-10" />
          
          <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
            <motion.h1 className="hero-title text-6xl md:text-8xl font-black main-title-font primary-text text-glow mb-4">
              RYU STORE
            </motion.h1>
            <motion.p className="hero-subtitle text-xl md:text-2xl text-foreground mb-8 max-w-2xl mx-auto">
              Solusi Digital Terdepan untuk Semua Kebutuhan Anda
            </motion.p>
            <motion.div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="theme-button text-lg px-8 py-4 rounded-md" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
                <i className="fas fa-info-circle mr-2"></i>
                Tentang Kami
              </Button>
              <Button size="lg" variant="outline" className="theme-button-outline text-lg px-8 py-4 rounded-md" onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>
                <i className="fas fa-rocket mr-2"></i>
                Lihat Produk
              </Button>
            </motion.div>
          </div>
        </section>

        <section id="about" ref={aboutRef} className="py-20 px-4 dark-grid">
          <div className="max-w-5xl mx-auto about-content">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold main-title-font primary-text mb-4 text-glow">Selamat Datang di Ryu Store</h2>
                <p className="text-lg text-foreground/90 mb-6 leading-relaxed">
                  Kami adalah pusat solusi digital Anda, menyediakan layanan premium yang dirancang untuk memenuhi kebutuhan modern. Dari panel canggih hingga layanan khusus, kami hadir untuk Anda.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-primary text-2xl mt-1"></i>
                    <div>
                      <h4 className="font-bold text-foreground">Jasa Banned & Unbanned</h4>
                      <p className="text-foreground/80">Solusi cepat dan efektif untuk masalah akun Anda dengan tingkat keberhasilan tinggi.</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-primary text-2xl mt-1"></i>
                    <div>
                      <h4 className="font-bold text-foreground">Open Murid Banned</h4>
                      <p className="text-foreground/80">Belajar langsung dari para ahli untuk menguasai teknik-teknik eksklusif.</p>
                    </div>
                  </li>
                   <li className="flex items-start space-x-3">
                    <i className="fas fa-check-circle text-primary text-2xl mt-1"></i>
                    <div>
                      <h4 className="font-bold text-foreground">Panel Premium</h4>
                      <p className="text-foreground/80">Dapatkan akses ke panel dengan performa dan keamanan terbaik di kelasnya.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <motion.div 
                className="h-96 rounded-lg overflow-hidden figma-shadow"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img  className="w-full h-full object-cover" alt="Digital technology abstract background" src="https://images.unsplash.com/photo-1550745165-9bc0b252726a" />
              </motion.div>
            </div>
          </div>
        </section>

        <section id="products" ref={productsRef} className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold main-title-font primary-text mb-3 text-glow">
                Produk Unggulan
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                Temukan produk digital terbaik dengan kualitas premium
              </p>
            </motion.div>
            
            <div className="product-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.length > 0 ? (
                products.slice(0, 6).map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold main-title-font primary-text mb-4">
                    Produk Segera Hadir!
                  </h3>
                  <p className="text-foreground/80 mb-8">
                    Admin sedang menyiapkan produk-produk terbaik untuk Anda
                  </p>
                  <Button className="theme-button rounded-md" onClick={() => window.open('https://wa.me/6288801074059', '_blank')}>
                    <i className="fab fa-whatsapp mr-2"></i>
                    Hubungi Admin
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {testimonials.length > 0 && (
          <section className="py-20 px-4 bg-secondary/30">
            <div className="max-w-5xl mx-auto">
              <motion.div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold main-title-font primary-text mb-3 text-glow">
                  Testimoni Pelanggan
                </h2>
                <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                  Apa kata mereka tentang layanan kami
                </p>
              </motion.div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="theme-card p-6 figma-shadow"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-primary">{testimonial.name}</h4>
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-foreground/80 italic">"{testimonial.comment}"</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold main-title-font primary-text mb-4 text-glow">
                Siap Memulai?
              </h2>
              <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
                Bergabunglah dengan ribuan pelanggan yang telah merasakan layanan terbaik kami
              </p>
              <Button size="lg" className="theme-button text-lg px-12 py-4 rounded-md pulse-primary" onClick={() => window.open('https://wa.me/6288801074059', '_blank')}>
                <i className="fab fa-whatsapp mr-2"></i>
                Hubungi Sekarang
                <i className="fas fa-arrow-right ml-2"></i>
              </Button>
            </motion.div>
          </div>
        </section>

        <footer className="bg-secondary/50 py-12 px-4 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xl main-title-font">R</span>
                  </div>
                  <span className="text-2xl font-bold main-title-font primary-text">RYU STORE</span>
                </div>
                <p className="text-foreground/80 mb-4">
                  Solusi digital terdepan untuk semua kebutuhan Anda. Kami berkomitmen memberikan layanan terbaik dengan teknologi canggih.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-primary/80 hover:text-primary transition-colors"><i className="fab fa-instagram text-2xl"></i></a>
                  <a href="#" className="text-primary/80 hover:text-primary transition-colors"><i className="fab fa-telegram text-2xl"></i></a>
                  <a href="https://wa.me/6288801074059" className="text-primary/80 hover:text-primary transition-colors"><i className="fab fa-whatsapp text-2xl"></i></a>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold main-title-font primary-text mb-4">Layanan</h3>
                <ul className="space-y-2 text-foreground/80">
                  <li><Link to="/panel" className="hover:text-primary transition-colors">Panel Premium</Link></li>
                  <li><Link to="/banned-service" className="hover:text-primary transition-colors">Jasa Banned WA</Link></li>
                  <li><Link to="/open-murid" className="hover:text-primary transition-colors">Open Murid</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold main-title-font primary-text mb-4">Kontak</h3>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-center"><i className="fab fa-whatsapp mr-2 text-primary"></i>088801074059</li>
                  <li className="flex items-center"><i className="fas fa-envelope mr-2 text-primary"></i>info@ryustore.com</li>
                  <li className="flex items-center"><i className="fas fa-clock mr-2 text-primary"></i>24/7 Support</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border mt-8 pt-8 text-center">
              <p className="text-foreground/80">
                © 2025 Ryu Store. All rights reserved. Made with <i className="fas fa-heart text-primary"></i> by Ryu Team
              </p>
            </div>
          </div>
        </footer>
      </motion.div>
    </>
  );
};

export default HomePage;