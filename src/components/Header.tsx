

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User, Menu } from 'lucide-react';

export const Header = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <span className="font-bold text-2xl text-gray-900">ECOMMERCE</span>
        </div>

        <nav className="hidden md:flex space-x-5 pt-6">
          <a href="/categories" className="text-gray-700 hover:text-primary font-bold">Categories</a>
          <a href="/Sale" className="text-gray-700 hover:text-primary font-bold">Sale</a>
          <a href="/Clearance" className="text-gray-700 hover:text-primary font-bold">Clearance</a>
          <a href="/Stock" className="text-gray-700 hover:text-primary font-bold">New Stock</a>
          <a href="/Stock" className="text-gray-700 hover:text-primary font-bold">Trending</a>
        </nav>

        
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        
        {user && (
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="text-sm text-gray-700">Hi, {user.name}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        )}
      </div>

     
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 py-3">
          <nav className="flex flex-col space-y-3">
            <a href="/categories" className="text-gray-700 hover:text-primary font-bold" onClick={() => setMenuOpen(false)}>Categories</a>
            <a href="/Sale" className="text-gray-700 hover:text-primary font-bold" onClick={() => setMenuOpen(false)}>Sale</a>
            <a href="/Clearance" className="text-gray-700 hover:text-primary font-bold" onClick={() => setMenuOpen(false)}>Clearance</a>
            <a href="/Stock" className="text-gray-700 hover:text-primary font-bold" onClick={() => setMenuOpen(false)}>New Stock</a>
            <a href="/Stock" className="text-gray-700 hover:text-primary font-bold" onClick={() => setMenuOpen(false)}>Trending</a>
            {user && (
              <div className="flex items-center space-x-2 mt-3">
                <User className="w-4 h-4" />
                <span className="text-sm text-gray-700">Hi, {user.name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}

      <div className="flex items-center justify-center my-3 py-2 text-black bg-gray-100 text-sm md:text-base">
        Get 10% off on business sign up
      </div>
    </header>
  );
};