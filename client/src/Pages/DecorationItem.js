import { Link } from 'react-router-dom'; // Import Link for navigation
import products from '../Utility/data.json';

const DecorationItem = () => {
  const decor = products.filter(product => product.category === 'Home Decor');

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Decoration Items</h2>
      <div className="row">
        {decor.map((product) => (
          <div className="col-md-4 col-sm-6 mb-4" key={product.id}>
            <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
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

                  <button
                    className="btn btn-primary mt-auto"
                    disabled={product.stock === 0}
                    onClick={(e) => e.preventDefault()} // Prevent navigation on button click
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DecorationItem;
