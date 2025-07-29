import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Users } from 'lucide-react';

import DashboardHeader from '@/components/admin/DashboardHeader';
import StatsCards from '@/components/admin/StatsCards';
import ProductForm from '@/components/admin/ProductForm';
import ProductList from '@/components/admin/ProductList';
import TestimonialForm from '@/components/admin/TestimonialForm';
import TestimonialList from '@/components/admin/TestimonialList';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('ryuStoreAdmin')) {
      navigate('/admin');
      return;
    }
    const savedProducts = JSON.parse(localStorage.getItem('ryuStoreProducts') || '[]');
    const savedTestimonials = JSON.parse(localStorage.getItem('ryuStoreTestimonials') || '[]');
    setProducts(savedProducts);
    setTestimonials(savedTestimonials);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('ryuStoreAdmin');
    toast({
      title: "Logout Berhasil! 👋",
      description: "Sampai jumpa lagi!",
    });
    navigate('/');
  };

  const handleProductSubmit = (productData) => {
    const newProduct = {
      ...productData,
      id: editingProduct ? editingProduct.id : Date.now().toString(),
      price: parseInt(productData.price),
      createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString(),
      image: productData.file, // Use the file data as the image source
    };

    let updatedProducts;
    if (editingProduct) {
      updatedProducts = products.map(p => p.id === editingProduct.id ? newProduct : p);
      toast({ title: "Produk Diperbarui! ✅" });
    } else {
      updatedProducts = [...products, newProduct];
      toast({ title: "Produk Ditambahkan! 🎉" });
    }

    setProducts(updatedProducts);
    localStorage.setItem('ryuStoreProducts', JSON.stringify(updatedProducts));
    setEditingProduct(null);
  };

  const handleTestimonialSubmit = (testimonialData) => {
    const newTestimonial = {
      ...testimonialData,
      id: editingTestimonial ? editingTestimonial.id : Date.now().toString(),
      rating: parseInt(testimonialData.rating),
      createdAt: editingTestimonial ? editingTestimonial.createdAt : new Date().toISOString(),
      avatar: testimonialData.file, // Use the file data as the avatar source
    };

    let updatedTestimonials;
    if (editingTestimonial) {
      updatedTestimonials = testimonials.map(t => t.id === editingTestimonial.id ? newTestimonial : t);
      toast({ title: "Testimoni Diperbarui! ✅" });
    } else {
      updatedTestimonials = [...testimonials, newTestimonial];
      toast({ title: "Testimoni Ditambahkan! 🎉" });
    }

    setTestimonials(updatedTestimonials);
    localStorage.setItem('ryuStoreTestimonials', JSON.stringify(updatedTestimonials));
    setEditingTestimonial(null);
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('ryuStoreProducts', JSON.stringify(updatedProducts));
    toast({ title: "Produk Dihapus! 🗑️" });
  };

  const handleDeleteTestimonial = (id) => {
    const updatedTestimonials = testimonials.filter(t => t.id !== id);
    setTestimonials(updatedTestimonials);
    localStorage.setItem('ryuStoreTestimonials', JSON.stringify(updatedTestimonials));
    toast({ title: "Testimoni Dihapus! 🗑️" });
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Ryu Store</title>
        <meta name="description" content="Dashboard admin untuk mengelola produk dan testimoni Ryu Store" />
      </Helmet>
      
      <div className="min-h-screen dark-bg dark-grid">
        <DashboardHeader onLogout={handleLogout} />

        <div className="max-w-7xl mx-auto p-6">
          <StatsCards products={products} testimonials={testimonials} />

          <Tabs defaultValue="products" className="space-y-6">
            <TabsList className="bg-black/50 border border-red-500/20">
              <TabsTrigger value="products" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-500">
                <Package className="w-4 h-4 mr-2" />
                Produk
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-500">
                <Users className="w-4 h-4 mr-2" />
                Testimoni
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <ProductForm 
                  editingProduct={editingProduct}
                  onFormSubmit={handleProductSubmit}
                  onCancelEdit={() => setEditingProduct(null)}
                />
                <ProductList 
                  products={products}
                  onEdit={setEditingProduct}
                  onDelete={handleDeleteProduct}
                />
              </div>
            </TabsContent>

            <TabsContent value="testimonials" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <TestimonialForm 
                  editingTestimonial={editingTestimonial}
                  onFormSubmit={handleTestimonialSubmit}
                  onCancelEdit={() => setEditingTestimonial(null)}
                />
                <TestimonialList 
                  testimonials={testimonials}
                  onEdit={setEditingTestimonial}
                  onDelete={handleDeleteTestimonial}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;