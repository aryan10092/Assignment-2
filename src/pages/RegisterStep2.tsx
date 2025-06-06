
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const RegisterStep2 = () => {
  const [formData, setFormData] = useState({
    phone: '',
    company: '',
    position: ''
  });
  const [registrationData, setRegistrationData] = useState<any>(null);
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedData = localStorage.getItem('registrationData');
    if (!storedData) {
      navigate('/register');
      return;
    }
    setRegistrationData(JSON.parse(storedData));
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.phone || !formData.company) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive"
      });
      return;
    }

    const completeData = { ...registrationData, ...formData };
    const success = await register(completeData);
    
    if (success) {
      localStorage.removeItem('registrationData');
      toast({
        title: "Success",
        description: "Account created successfully!"
      });
      navigate('/categories');
    } else {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (!registrationData) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pb-40">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Almost Done!</CardTitle>
          <CardDescription>Step 2 of 2 - Professional Information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="Enter your phone number"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                placeholder="Enter your company name"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                placeholder="Enter your position (optional)"
                className="mt-1"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Complete Registration"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
               Have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-small">
                LOGIN
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterStep2;
