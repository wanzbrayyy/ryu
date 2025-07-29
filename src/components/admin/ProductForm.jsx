import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, File as FileIcon, Image as ImageIcon } from 'lucide-react';

const ProductForm = ({ editingProduct, onFormSubmit, onCancelEdit }) => {
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Panel',
    file: null,
    fileName: '',
    fileType: '',
    benefits: '',
    redirectUrl: ''
  });
  const [filePreview, setFilePreview] = useState('');
  const fileInputRef = useRef(null);
  const [userHash, setUserHash] = useState('d7eed82ae3aece8a4b6f473dd');

  useEffect(() => {
    if (editingProduct) {
      setProductForm(editingProduct);
      setFilePreview(editingProduct.image);
    } else {
      setProductForm({
        name: '',
        description: '',
        price: '',
        category: 'Panel',
        file: null,
        fileName: '',
        fileType: '',
        benefits: '',
        redirectUrl: ''
      });
      setFilePreview('');
    }
  }, [editingProduct]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductForm({
        ...productForm,
        file: file,
        fileName: file.name,
        fileType: file.type
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        if (file.type.startsWith('image/')) {
          setFilePreview(reader.result);
        } else {
          setFilePreview(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = productForm.image;

    if (productForm.file) {
      const formData = new FormData();
      formData.append('reqtype', 'fileupload');
      formData.append('userhash', userHash);
      formData.append('fileToUpload', productForm.file);

      try {
        const response = await fetch('https://catbox.moe/user/api.php', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Catbox API error:", errorText);
            alert(`Error uploading file: ${errorText}`);
            return;
        }

        imageUrl = await response.text();
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('An error occurred while uploading the file. Please try again.');
        return;
      }
    }

    const dataToSubmit = { ...productForm, image: imageUrl };
    onFormSubmit(dataToSubmit);
    setFilePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="theme-card">
      <CardHeader>
        <CardTitle className="main-title-font primary-text">
          {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="primary-text">Nama Produk</Label>
            <Input
              id="name"
              value={productForm.name}
              onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
              className="theme-input"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="category" className="primary-text">Kategori</Label>
            <select
              id="category"
              value={productForm.category}
              onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
              className="w-full h-10 px-3 py-2 theme-input rounded-md"
            >
              <option value="Panel">Panel</option>
              <option value="Banned Service">Banned Service</option>
              <option value="Open Murid">Open Murid</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="price" className="primary-text">Harga (Rp)</Label>
            <Input
              id="price"
              type="number"
              value={productForm.price}
              onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
              className="theme-input"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="file" className="primary-text">File / Gambar Produk</Label>
            <Input
              id="file"
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="theme-input file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
              required={!editingProduct}
            />
            {productForm.fileName && (
              <div className="mt-4 flex items-center space-x-3 text-sm text-gray-300">
                {filePreview ? (
                  <ImageIcon className="w-10 h-10 text-red-500" />
                ) : (
                  <FileIcon className="w-10 h-10 text-red-500" />
                )}
                <div className="flex flex-col">
                  <span>{productForm.fileName}</span>
                  {filePreview && <img src={filePreview} alt="Preview" className="w-16 h-16 object-cover rounded-md mt-2" />}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <Label htmlFor="description" className="primary-text">Deskripsi</Label>
            <Textarea
              id="description"
              value={productForm.description}
              onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
              className="theme-input"
              rows={3}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="benefits" className="primary-text">Benefit (pisahkan dengan koma)</Label>
            <Textarea
              id="benefits"
              value={productForm.benefits}
              onChange={(e) => setProductForm({ ...productForm, benefits: e.target.value })}
              className="theme-input"
              rows={2}
              placeholder="Benefit 1, Benefit 2, Benefit 3"
            />
          </div>
          
          <div>
            <Label htmlFor="redirectUrl" className="primary-text">URL Redirect (opsional)</Label>
            <Input
              id="redirectUrl"
              value={productForm.redirectUrl}
              onChange={(e) => setProductForm({ ...productForm, redirectUrl: e.target.value })}
              className="theme-input"
              placeholder="https://wa.me/6288801074059"
            />
          </div>
          
          <Button type="submit" className="w-full theme-button rounded-md">
            <Plus className="w-4 h-4 mr-2" />
            {editingProduct ? 'Update Produk' : 'Tambah Produk'}
          </Button>
          
          {editingProduct && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancelEdit}
              className="w-full theme-button-outline rounded-md"
            >
              Batal Edit
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;