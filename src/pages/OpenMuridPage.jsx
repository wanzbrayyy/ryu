import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Users, Filter, Search, BookOpen, Award, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';

const OpenMuridPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const allProducts = JSON.parse(localStorage.getItem('ryuStoreProducts') || '[]');
    const muridProducts = allProducts.filter(product => product.category === 'Open Murid');
    setProducts(muridProducts);
    setFilteredProducts(muridProducts);
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
        <title>Open Murid - Belajar dari Expert - Ryu Store</title>
        <meta name="description" content="Program belajar langsung dari expert terpercaya. Dapatkan skill digital terbaru dengan mentor berpengalaman di Ryu Store." />
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
                <Users className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold main-title-font primary-text mb-4">
                Open Murid
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Belajar langsung dari expert terpercaya dan dapatkan skill digital terbaru untuk masa depan yang cerah
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
                  placeholder="Cari kursus..."
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
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-2xl font-bold main-title-font primary-text mb-4">
                    {searchTerm ? 'Tidak Ada Hasil' : 'Kursus Segera Hadir!'}
                  </h3>
                  <p className="text-gray-300 mb-8">
                    {searchTerm 
                      ? `Tidak ditemukan kursus dengan kata kunci "${searchTerm}"`
                      : 'Admin sedang menyiapkan program pembelajaran terbaik untuk Anda'
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
                Mengapa Belajar di Ryu Store?
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-red-500 mb-2">Materi Terkini</h3>
                  <p className="text-gray-300">Kurikulum selalu update mengikuti perkembangan teknologi terbaru</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-red-500 mb-2">Mentor Expert</h3>
                  <p className="text-gray-300">Belajar langsung dari praktisi berpengalaman di bidangnya</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-red-500 mb-2">Fleksibel</h3>
                  <p className="text-gray-300">Jadwal belajar yang dapat disesuaikan dengan aktivitas Anda</p>
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
                Alur Pembelajaran
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="theme-card p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    1
                  </div>
                  <h3 className="text-lg font-bold text-red-500 mb-2">Daftar</h3>
                  <p className="text-gray-300 text-sm">Pilih program yang sesuai dan daftar melalui WhatsApp</p>
                </div>
                <div className="theme-card p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    2
                  </div>
                  <h3 className="text-lg font-bold text-red-500 mb-2">Orientasi</h3>
                  <p className="text-gray-300 text-sm">Kenalan dengan mentor dan teman belajar lainnya</p>
                </div>
                <div className="theme-card p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    3
                  </div>
                  <h3 className="text-lg font-bold text-red-500 mb-2">Belajar</h3>
                  <p className="text-gray-300 text-sm">Ikuti sesi pembelajaran dan praktik langsung</p>
                </div>
                <div className="theme-card p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    4
                  </div>
                  <h3 className="text-lg font-bold text-red-500 mb-2">Sertifikat</h3>
                  <p className="text-gray-300 text-sm">Dapatkan sertifikat setelah menyelesaikan program</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpenMuridPage;