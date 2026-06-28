import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import products from '../Utility/data.json';

const Skincare = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const skincare = products.filter(product => product.category === 'Skincare' || product.category.includes('Skincare'));

  const filteredSkincare = selectedFilter === 'All'
    ? skincare
    : skincare.filter(product => product.subcategory.toLowerCase() === selectedFilter.toLowerCase());

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Skincare</h2>

      {/* Filter Buttons */}
      <div className="d-flex justify-content-center mb-4 gap-3">
        <button className={`btn ${selectedFilter === 'All' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => handleFilterClick('All')}>All</button>
        <button className={`btn ${selectedFilter === 'Men' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => handleFilterClick('Men')}>Men</button>
        <button className={`btn ${selectedFilter === 'Women' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => handleFilterClick('Women')}>Women</button>
      </div>

      <div className="row">
        {filteredSkincare.length > 0 ? (
          filteredSkincare.map((product) => (
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
                      onClick={(e) => e.preventDefault()} // Prevent navigation when button clicked
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center mt-5">
            <h4>No products found for this category.</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Skincare;
