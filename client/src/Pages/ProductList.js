import { useContext } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { normalizeProductImage } from '../Utility/categoryUtils';
import products from '../Utility/data.json';

const ProductList = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="w-full pb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col card-hover">
            <Link to={`/product/${product.id}`} className="group block flex-1">
              <div className="relative overflow-hidden bg-gray-100 aspect-[4/3]">
                <img
                  src={normalizeProductImage(product.image)}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                    className="bg-white text-brand-primary p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-primary hover:text-white"
                  >
                    <FaCartPlus size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                  <span className="text-lg font-extrabold text-brand-primary">₹{product.price}</span>
                </div>

                <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">{product.description}</p>

                <div className="mt-auto flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-light text-brand-primary">
                    {product.category}
                  </span>

                  <span className="text-sm font-semibold text-brand-primary transition-colors">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>

            <div className="px-6 pb-6">
              <button
                onClick={() => addToCart(product)}
                className="w-full rounded-full border border-brand-primary bg-white py-3 text-sm font-semibold text-brand-primary transition hover:bg-brand-primary hover:text-white"
              >
                Add to Cart →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
