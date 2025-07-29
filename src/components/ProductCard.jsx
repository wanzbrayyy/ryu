import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ProductCard = ({ product, index }) => {
  const handleBuyNow = () => {
    const message = `Halo, saya tertarik dengan ${product.name}. Bisa info lebih lanjut?`;
    const whatsappUrl = `https://wa.me/6288801074059?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Card className="theme-card h-full overflow-hidden figma-shadow">
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute top-4 right-4">
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-bold">
              {product.category}
            </span>
          </div>
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-xl font-bold main-title-font primary-text mb-2">{product.name}</h3>
          <p className="text-foreground/80 text-sm mb-4 line-clamp-3">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-foreground">Rp {product.price.toLocaleString()}</span>
            <div className="flex items-center space-x-1 text-yellow-400">
              <i className="fas fa-star"></i>
              <span className="text-sm text-foreground">4.9</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-6 pt-0 flex space-x-2">
          <Link to={`/product/${product.id}`} className="flex-1">
            <Button variant="outline" className="w-full theme-button-outline rounded-md">
              <i className="fas fa-eye mr-2"></i>
              Detail
            </Button>
          </Link>
          <Button 
            onClick={handleBuyNow}
            className="flex-1 theme-button rounded-md"
          >
            <i className="fas fa-shopping-cart mr-2"></i>
            Beli
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;