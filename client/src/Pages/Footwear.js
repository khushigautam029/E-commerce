import { useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link
import products from '../Utility/data.json';

const Footwear = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const footwear = products.filter(product => product.category === 'Footwear' || product.category.includes('Shoes'));

  const filteredFootwear = selectedFilter === 'All'
    ? footwear
    : footwear.filter(product => product.subcategory.toLowerCase() === selectedFilter.toLowerCase());

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Footwear</h2>

      {/* Filter Buttons */}
      <div className="d-flex justify-content-center mb-4 gap-3">
        <button className={`btn ${selectedFilter === 'All' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => handleFilterClick('All')}>All</button>
        <button className={`btn ${selectedFilter === 'Men' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => handleFilterClick('Men')}>Men</button>
        <button className={`btn ${selectedFilter === 'Women' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => handleFilterClick('Women')}>Women</button>
        <button className={`btn ${selectedFilter === 'Kids' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => handleFilterClick('Kids')}>Kids</button>
      </div>

      <div className="row">
        {filteredFootwear.length > 0 ? (
          filteredFootwear.map((product) => (
            <div className="col-md-4 col-sm-6 mb-4" key={product.id}>
              <div className="card h-100 shadow-sm">
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                  </div>
                </Link>
                <button className="btn btn-primary mt-auto">Add to Cart</button>
              </div>
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

export default Footwear;
