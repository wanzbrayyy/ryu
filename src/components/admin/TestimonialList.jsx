import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

const TestimonialList = ({ testimonials, onEdit, onDelete }) => {
  return (
    <Card className="theme-card">
      <CardHeader>
        <CardTitle className="main-title-font primary-text">Daftar Testimoni</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-theme pr-2">
          {testimonials.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Belum ada testimoni</p>
          ) : (
            testimonials.map((testimonial) => (
              <div key={testimonial.id} className="theme-card p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <div>
                      <h4 className="font-bold text-red-500">{testimonial.name}</h4>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <i key={i} className="fas fa-star text-yellow-400 text-xs"></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(testimonial)}
                      className="theme-button-outline rounded-md"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(testimonial.id)}
                      className="bg-red-800 hover:bg-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">"{testimonial.comment}"</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialList;