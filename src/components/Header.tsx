
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className=" bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <span className="font-bold text-2xl text-gray-900">ECOMMERCE</span>
        </div>

        <nav className="flex space-x-5 pt-6">
          <a href="/categories" className="text-gray-700 hover:text-primary font-bold">Categories</a>
          <a href="/Sale" className="text-gray-700 hover:text-primary font-bold">Sale</a>
          <a href="/Clearance" className="text-gray-700 hover:text-primary font-bold">Clearance</a>
          <a href="/Stock" className="text-gray-700 hover:text-primary font-bold">New Stock</a>
          <a href="/Stock" className="text-gray-700 hover:text-primary font-bold">Trending</a></nav>
        
        {user && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="text-sm text-gray-700">Hi, {user.name}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={logout}
              className="flex items-center  space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        )}
      </div>
      <div className="flex items-cente justify-center my-3 py-2 text-black bg-gray-100">   Get 10% off on business sign up  </div>
    </header>
  );
};
