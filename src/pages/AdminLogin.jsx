import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Lock, User, Shield } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username === 'ryu' && password === '123') {
      localStorage.setItem('ryuStoreAdmin', 'true');
      toast({
        title: "Login Berhasil! 🎉",
        description: "Selamat datang di dashboard admin Ryu Store",
      });
      navigate('/admin/dashboard');
    } else {
      toast({
        title: "Login Gagal! ❌",
        description: "Username atau password salah",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - Ryu Store</title>
        <meta name="description" content="Login admin untuk mengelola produk dan layanan Ryu Store" />
      </Helmet>
      
      <div className="min-h-screen dark-bg dark-grid flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <Card className="theme-card">
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-20 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center"
              >
                <Shield className="w-10 h-10 text-black" />
              </motion.div>
              <CardTitle className="text-2xl main-title-font primary-text">
                Admin Login
              </CardTitle>
              <p className="text-gray-300">Masuk ke dashboard admin Ryu Store</p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="primary-text">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Masukkan username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10 theme-input"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="primary-text">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 theme-input"
                      required
                    />
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full theme-button rounded-md"
                  disabled={loading}
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <Shield className="w-4 h-4 mr-2" />
                  )}
                  {loading ? 'Memproses...' : 'Masuk'}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  Demo: Username: <span className="primary-text">ryu</span> | Password: <span className="primary-text">123</span>
                </p>
              </div>
            </CardContent>
          </Card>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-6"
          >
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="theme-button-outline rounded-md"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Kembali ke Home
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default AdminLogin;