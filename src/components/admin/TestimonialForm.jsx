import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

const TestimonialForm = ({ editingTestimonial, onFormSubmit, onCancelEdit }) => {
  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    comment: '',
    rating: 5,
    file: null,
  });
  const [avatarPreview, setAvatarPreview] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editingTestimonial) {
      setTestimonialForm(editingTestimonial);
      setAvatarPreview(editingTestimonial.avatar);
    } else {
      setTestimonialForm({
        name: '',
        comment: '',
        rating: 5,
        file: null,
      });
      setAvatarPreview('');
    }
  }, [editingTestimonial]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTestimonialForm({ ...testimonialForm, file: reader.result });
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = { ...testimonialForm, avatar: testimonialForm.file };
    onFormSubmit(dataToSubmit);
    setAvatarPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="theme-card">
      <CardHeader>
        <CardTitle className="main-title-font primary-text">
          {editingTestimonial ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="testimonial-name" className="primary-text">Nama</Label>
            <Input
              id="testimonial-name"
              value={testimonialForm.name}
              onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
              className="theme-input"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="avatar" className="primary-text">Avatar</Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              className="theme-input file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
              required={!editingTestimonial}
            />
            {avatarPreview && (
              <div className="mt-4">
                <img src={avatarPreview} alt="Preview" className="w-20 h-20 object-cover rounded-full" />
              </div>
            )}
          </div>
          
          <div>
            <Label htmlFor="rating" className="primary-text">Rating</Label>
            <select
              id="rating"
              value={testimonialForm.rating}
              onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: e.target.value })}
              className="w-full h-10 px-3 py-2 theme-input rounded-md"
            >
              <option value={5}>5 Bintang</option>
              <option value={4}>4 Bintang</option>
              <option value={3}>3 Bintang</option>
              <option value={2}>2 Bintang</option>
              <option value={1}>1 Bintang</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="comment" className="primary-text">Komentar</Label>
            <Textarea
              id="comment"
              value={testimonialForm.comment}
              onChange={(e) => setTestimonialForm({ ...testimonialForm, comment: e.target.value })}
              className="theme-input"
              rows={4}
              required
            />
          </div>
          
          <Button type="submit" className="w-full theme-button rounded-md">
            <Plus className="w-4 h-4 mr-2" />
            {editingTestimonial ? 'Update Testimoni' : 'Tambah Testimoni'}
          </Button>
          
          {editingTestimonial && (
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

export default TestimonialForm;