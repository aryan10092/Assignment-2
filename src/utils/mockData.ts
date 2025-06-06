
import { faker } from '@faker-js/faker';

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

// Generate 100 mock categories
export const generateMockCategories = (): Category[] => {
  const categories: Category[] = [];
  
  const icons = ['🛍️', '🍔', '💻', '🏃‍♂️', '🎵', '📚', '🎨', '🏠', '🚗', '💼', '🎮', '📱', '🌍', '💰', '👗', '🏥', '🎓', '🍕', '☕', '🎬'];
  const colors = ['bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-red-100', 'bg-yellow-100', 'bg-pink-100', 'bg-indigo-100', 'bg-gray-100'];

  for (let i = 0; i < 100; i++) {
    categories.push({
      id: faker.string.uuid(),
      name: faker.commerce.department(),
      description: faker.commerce.productDescription(),
      icon: icons[i % icons.length],
      color: colors[i % colors.length]
    });
  }

  return categories;
};

export const mockCategories = generateMockCategories();
