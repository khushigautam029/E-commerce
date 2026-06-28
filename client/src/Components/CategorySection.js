import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Clothes',
    image: 'clothes.png',
    link: '/clothes/ethnic'
  },
  {
    name: 'Western Dresses',
    image: '/images/western.jpg',
    link: '/clothes/western'
  },
  {
    name: 'Menswear',
    image: '/images/menswear.jpg',
    link: '/clothes/menswear'
  },
  {
    name: 'Footwear',
    image: '/images/footwear.jpg',
    link: '/footwear'
  },
  {
    name: 'Home Decor',
    image: '/images/homedecor.jpg',
    link: '/decorations'
  },
  {
    name: 'Beauty',
    image: '/images/beauty.jpg',
    link: '/skincare'
  },
  {
    name: 'Accessories',
    image: '/images/accessories.jpg',
    link: '/gifts'
  }
];

const CategorySection = () => {
  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold text-center mb-8 mt-50">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 max-w-6xl mx-auto">
        {categories.map((category, index) => (
          <Link to={category.link} key={index} className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform">
            <div className="bg-pink-100 rounded-full p-4 w-28 h-28 flex items-center justify-center">
              <img src={category.image} alt={category.name} className="object-contain max-h-full max-w-full" />
            </div>
            <p className="mt-3 text-center text-gray-700 font-medium">{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
