import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <Card className="theme-card">
      <CardHeader>
        <CardTitle className="main-title-font primary-text">Daftar Produk</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-theme pr-2">
          {products.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Belum ada produk</p>
          ) : (
            products.map((product) => (
              <div key={product.id} className="theme-card p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-bold text-red-500">{product.name}</h4>
                    <p className="text-sm text-gray-400">{product.category} - Rp {product.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(product)}
                    className="theme-button-outline rounded-md"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(product.id)}
                    className="bg-red-800 hover:bg-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductList;