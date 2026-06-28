import { useContext } from 'react';
import products from '../Utility/data.json';
import { CartContext } from '../context/CartContext';

const ProductList = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">All Products</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 col-sm-6 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted">{product.description}</p>
                <p className="card-text fw-bold">₹{product.price}</p>
                <p className="card-text">
                  <small className="text-muted">
                    {product.category} &rarr; {product.subcategory}
                  </small>
                </p>

                <button className="btn btn-primary mt-auto" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
