import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Star } from 'lucide-react';
import Navbar from '@/components/Navbar';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then(data => {
        const foundProduct = data.find(p => p.id === id);
        if (foundProduct) {
          setProduct(foundProduct);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [id]);

  const handleBuyNow = () => {
    const redirectUrl = product.redirectUrl || `https://wa.me/6288801074059?text=${encodeURIComponent(`Halo, saya tertarik dengan ${product.name}. Bisa info lebih lanjut?`)}`;
    window.open(redirectUrl, '_blank');
  };

  const handleShare = async () => {
    const shareData = {
      title: `Ryu Store: ${product.name}`,
      text: `Cek produk keren ini: ${product.name} di Ryu Store!`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast({
          title: "Dibagikan! 🚀",
          description: "Produk berhasil dibagikan.",
        });
      } else {
        throw new Error('Web Share API not supported');
      }
    } catch (err) {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Disalin! 📋",
        description: "Link produk berhasil disalin ke clipboard.",
      });
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Dihapus dari Wishlist 💔" : "Ditambah ke Wishlist ❤️",
      description: liked ? "Produk dihapus dari wishlist" : "Produk ditambahkan ke wishlist",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!product) {
    return (
      <>
        <Helmet>
          <title>Produk Tidak Ditemukan - Ryu Store</title>
          <meta name="description" content="Produk yang Anda cari tidak ditemukan di Ryu Store" />
        </Helmet>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Navbar />
          <div className="text-center pt-20">
            <div className="text-6xl mb-4">😵</div>
            <h1 className="text-3xl font-bold main-title-font primary-text mb-4">Produk Tidak Ditemukan</h1>
            <p className="text-foreground/80 mb-8">Maaf, produk yang Anda cari tidak tersedia</p>
            <Button onClick={() => navigate('/')} className="theme-button rounded-md">
              <i className="fas fa-arrow-left mr-2"></i>
              Kembali ke Home
            </Button>
          </div>
        </div>
      </>
    );
  }

  const benefits = product.benefits ? product.benefits.split(',').map(b => b.trim()).filter(b => b) : [];

  return (
    <>
      <Helmet>
        <title>{product.name} - Ryu Store</title>
        <meta name="description" content={product.description} />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="pt-24 pb-12">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 text-foreground/70 mb-8"
            >
              <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">
                Home
              </button>
              <span>/</span>
              <span className="text-primary">{product.name}</span>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <div className="relative group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-96 object-cover rounded-lg border-2 border-border figma-shadow"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <Card className="theme-card p-4 text-center">
                    <i className="fas fa-shield-alt text-2xl text-primary mx-auto mb-2"></i>
                    <p className="text-sm text-foreground/80">Garansi</p>
                  </Card>
                  <Card className="theme-card p-4 text-center">
                    <i className="fas fa-bolt text-2xl text-primary mx-auto mb-2"></i>
                    <p className="text-sm text-foreground/80">Instan</p>
                  </Card>
                  <Card className="theme-card p-4 text-center">
                    <i className="fas fa-clock text-2xl text-primary mx-auto mb-2"></i>
                    <p className="text-sm text-foreground/80">24/7</p>
                  </Card>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                      {product.category}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold main-title-font primary-text mt-4 text-glow">
                      {product.name}
                    </h1>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <Button size="icon" variant="outline" onClick={handleLike} className={`theme-button-outline rounded-full ${liked ? 'bg-primary/20 text-primary' : ''}`}>
                      <i className={`fas fa-heart ${liked ? 'text-primary' : ''}`}></i>
                    </Button>
                    <Button size="icon" variant="outline" onClick={handleShare} className="theme-button-outline rounded-full">
                      <i className="fas fa-share-alt"></i>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-foreground/80">(4.9/5 dari 127 review)</span>
                </div>

                <div className="text-4xl font-bold text-foreground">
                  Rp {product.price.toLocaleString()}
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold main-title-font primary-text">Deskripsi</h3>
                  <p className="text-foreground/90 leading-relaxed">{product.description}</p>
                </div>

                {benefits.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold main-title-font primary-text">Keunggulan</h3>
                    <div className="space-y-2">
                      {benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center space-x-3"
                        >
                          <i className="fas fa-check-circle text-green-500"></i>
                          <span className="text-foreground/90">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-4 pt-4">
                  <Button onClick={handleBuyNow} size="lg" className="w-full theme-button text-lg py-6 rounded-md pulse-primary">
                    <i className="fas fa-shopping-cart mr-2"></i>
                    Beli Sekarang
                  </Button>
                  <Button onClick={() => window.open('https://wa.me/6288801074059', '_blank')} variant="outline" size="lg" className="w-full theme-button-outline text-lg py-6 rounded-md">
                    <i className="fab fa-whatsapp mr-2"></i>
                    Tanya Admin
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;