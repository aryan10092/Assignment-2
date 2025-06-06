
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Header } from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";

import RegisterStep2 from "./pages/RegisterStep2";
import Categories from "./pages/Categories";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <AuthProvider>
        <BrowserRouter>

          <div className="min-h-screen bg-background">
            <Header />
            <Routes>

              <Route path="/login" element={<Login />} />

           <Route path="/register" element={<Register />} />

              <Route path="/register/step2" element={<RegisterStep2 />} />
              <Route path="/categories" element={
                <ProtectedRoute>
                  <Categories />
                </ProtectedRoute>
              } />
              <Route path="/" element={<Index />} />
            </Routes>
          </div>

        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
