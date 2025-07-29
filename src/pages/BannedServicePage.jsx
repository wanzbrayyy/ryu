import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Zap, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const BannedServicePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const allProducts = JSON.parse(localStorage.getItem('ryuStoreProducts') || '[]');
    const bannedProducts = allProducts.filter(product => product.category === 'Banned Service');
    setProducts(bannedProducts);
    setFilteredProducts(bannedProducts);
  }, []);

  useEffect(() => {
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, sortBy]);

  return (
    <>
      <Helmet>
        <title>Jasa Banned WhatsApp - Ryu Store</title>
        <meta name="description" content="Solusi cepat dan terpercaya untuk masalah WhatsApp banned. Layanan profesional dengan tingkat keberhasilan tinggi dari Ryu Store." />
      </Helmet>
      
      <div className="min-h-screen dark-bg dark-grid">
        <Navbar />
        
        <div className="pt-20 pb-12">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-red-600 rounded-full flex items-center justify-center">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold main-title-font primary-text mb-4">
                Jasa Banned WhatsApp
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Solusi cepat dan terpercaya untuk mengatasi masalah WhatsApp banned dengan tingkat keberhasilan tinggi
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col md:flex-row gap-4 mb-8"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Cari layanan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 theme-input"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-red-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 theme-input rounded-md"
                >
                  <option value="name">Urutkan: Nama</option>
                  <option value="price-low">Harga: Rendah ke Tinggi</option>
                  <option value="price-high">Harga: Tinggi ke Rendah</option>
                </select>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {filteredProducts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">⚡</div>
                  <h3 className="text-2xl font-bold main-title-font primary-text mb-4">
                    {searchTerm ? 'Tidak Ada Hasil' : 'Layanan Segera Hadir!'}
                  </h3>
                  <p className="text-gray-300 mb-8">
                    {searchTerm 
                      ? `Tidak ditemukan layanan dengan kata kunci "${searchTerm}"`
                      : 'Admin sedang menyiapkan layanan banned WhatsApp terbaik untuk Anda'
                    }
                  </p>
                  {searchTerm && (
                    <Button 
                      onClick={() => setSearchTerm('')}
                      className="theme-button rounded-md mr-4"
                    >
                      Reset Pencarian
                    </Button>
                  )}
                  <Button 
                    className="theme-button rounded-md"
                    onClick={() => window.open('https://wa.me/6288801074059', '_blank')}
                  >
                    Hubungi Admin
                  </Button>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 bg-red-500/10 p-8 rounded-lg border border-red-500/20"
            >
              <h2 className="text-3xl font-bold main-title-font primary-text mb-6 text-center">
                Mengapa Memilih Layanan Kami?
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center">
                    <i className="fas fa-clock text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold text-red-500 mb-2">Proses Cepat</h3>
                  <p className="text-gray-300">Penanganan dalam hitungan jam, tidak perlu menunggu berhari-hari</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center">
                    <i className="fas fa-check-circle text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold text-red-500 mb-2">Tingkat Keberhasilan Tinggi</h3>
                  <p className="text-gray-300">Success rate 95% dengan metode yang sudah teruji dan terpercaya</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center">
                    <i className="fas fa-shield-alt text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold text-red-500 mb-2">Aman & Terpercaya</h3>
                  <p className="text-gray-300">Metode aman tanpa risiko banned permanen atau kehilangan data</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-16"
            >
              <h2 className="text-3xl font-bold main-title-font primary-text mb-8 text-center">
                Pertanyaan Umum
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="theme-card p-6">
                  <h3 className="text-xl font-bold text-red-500 mb-3">Berapa lama proses unbanned?</h3>
                  <p className="text-gray-300">Proses biasanya memakan waktu 1-6 jam tergantung tingkat banned dan metode yang digunakan.</p>
                </div>
                <div className="theme-card p-6">
                  <h3 className="text-xl font-bold text-red-500 mb-3">Apakah data WhatsApp aman?</h3>
                  <p className="text-gray-300">Ya, semua data chat, kontak, dan media Anda akan tetap aman dan tidak akan hilang.</p>
                </div>
                <div className="theme-card p-6">
                  <h3 className="text-xl font-bold text-red-500 mb-3">Bagaimana jika gagal?</h3>
                  <p className="text-gray-300">Jika proses gagal, kami akan refund 100% atau mencoba metode alternatif tanpa biaya tambahan.</p>
                </div>
                <div className="theme-card p-6">
                  <h3 className="text-xl font-bold text-red-500 mb-3">Apakah ada garansi?</h3>
                  <p className="text-gray-300">Ya, kami memberikan garansi 7 hari setelah proses unbanned berhasil dilakukan.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannedServicePage;