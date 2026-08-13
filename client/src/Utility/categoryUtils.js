const CATEGORY_RULES = {
  'ethnic-wear': (product) =>
    product.category?.toLowerCase().includes('clothing') &&
    product.subcategory === 'Women' &&
    !['Western Dresses', 'Menswear'].includes(product.subcategory) &&
    !product.name.toLowerCase().includes('jeans') &&
    !product.name.toLowerCase().includes('shirt') &&
    !product.name.toLowerCase().includes('floral dress') &&
    !product.name.toLowerCase().includes('men’s kurta') &&
    !product.name.toLowerCase().includes('casual top'),
  'western-dress': (product) =>
    product.subcategory === 'Western Dresses' ||
    product.name.includes('Jeans') ||
    product.name.includes('Shirt') ||
    product.name.includes('Floral Dress') ||
    product.name.includes('Casual Top') ||
    product.name.includes('Top'),
  'menswear': (product) =>
    product.subcategory === 'Menswear' ||
    product.name === 'Men’s Kurta' ||
    (product.category?.toLowerCase() === "men's clothing" && product.name !== 'Men’s Kurta'),
  'footwear': (product) => product.category === 'Footwear',
  'home-decor': (product) => product.category === 'Home Decor',
  'beauty': (product) =>
    product.category?.toLowerCase().includes('skincare') ||
    product.category?.toLowerCase().includes('beauty'),
  'accessories': (product) =>
    product.category === 'Gifts' ||
    product.category === "Women's Accessories" ||
    product.category?.toLowerCase().includes('accessories'),
  'grocery': (product) => true,
};

export const getProductsForCategory = (products, category) => {
  const matcher = CATEGORY_RULES[category] || (() => false);
  return products.filter(matcher);
};

export const normalizeProductImage = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/250?text=Image+Not+Available';
  if (/^https?:\/\//i.test(imagePath) || imagePath.startsWith('/')) {
    return imagePath;
  }
  return `/${imagePath}`;
};
