import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const DashboardHeader = ({ onLogout }) => {
  return (
    <div className="bg-black/80 backdrop-blur-md border-b border-red-500/20 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-xl main-title-font">R</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold main-title-font primary-text">Admin Dashboard</h1>
            <p className="text-gray-400">Kelola produk dan testimoni Ryu Store</p>
          </div>
        </div>
        <Button onClick={onLogout} variant="outline" className="theme-button-outline rounded-md">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;