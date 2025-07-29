import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Users, DollarSign, TrendingUp } from 'lucide-react';

const StatsCards = ({ products, testimonials }) => {
  const stats = [
    {
      title: 'Total Produk',
      value: products.length,
      icon: <Package className="w-6 h-6" />,
      color: 'bg-red-600'
    },
    {
      title: 'Total Testimoni',
      value: testimonials.length,
      icon: <Users className="w-6 h-6" />,
      color: 'bg-red-600'
    },
    {
      title: 'Rata-rata Harga',
      value: products.length > 0 ? `Rp ${Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length).toLocaleString()}` : 'Rp 0',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-red-600'
    },
    {
      title: 'Produk Terpopuler',
      value: 'Panel Premium',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="theme-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold main-title-font text-white">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-white`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;