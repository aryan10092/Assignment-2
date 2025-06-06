
import { useState, useEffect } from 'react';
import { mockCategories, Category } from '@/utils/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 6;

const Categories = () => {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const totalPages = Math.ceil(mockCategories.length / ITEMS_PER_PAGE)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCategories = mockCategories.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  
  useEffect(() => {
    const saved = localStorage.getItem('selectedCategories');
    if (saved) {
      setSelectedCategories(new Set(JSON.parse(saved)));
    }
  }, []);

  const handleCategoryToggle = (categoryId: string) => {
    const newSelected = new Set(selectedCategories);
    
    if (newSelected.has(categoryId)) {
      newSelected.delete(categoryId);
    } else {
      newSelected.add(categoryId);
    }
    
    setSelectedCategories(newSelected);
    localStorage.setItem('selectedCategories', 
      JSON.stringify(Array.from(newSelected)));
    
    toast({
      title: "Selection Updated",
      description: `You have ${newSelected.size} categories selected`,
    });
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Select Your Interests</h1>
        <p className="text-gray-600">

          Choose categories you're interested in. You have selected {selectedCategories.size} categories.
        </p>
    </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

        {currentCategories.map((category) => (
          <Card 
            key={category.id} 
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedCategories.has(category.id) ? 'ring-2 ring-primary shadow-md' : ''
            }`}
            onClick={() => handleCategoryToggle(category.id)}
          >
            <CardContent className="p-6">

              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center flex-shrink-0`}>
             <span className="text-2xl">{category.icon}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 truncate">{category.name}</h3>
                    <Checkbox 
                      checked={selectedCategories.has(category.id)}
                      onChange={() => handleCategoryToggle(category.id)}
                      className="ml-2"
                    />
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      
      <div className="flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
            
            {getVisiblePages().map((page, index) => (
              <PaginationItem key={index}>
                {page === '...' ? (
                  <span className="px-3 py-2">...</span>
                ) : (
                  <PaginationLink
                    onClick={() => handlePageChange(page as number)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => handlePageChange(currentPage + 1)}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

    
      <div className="text-center mt-4 text-sm text-gray-600">
        Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, mockCategories.length)} of {mockCategories.length} categories
      </div>
    </div>
  );
};

export default Categories;
