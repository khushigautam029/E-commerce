// src/Pages/ProductDescription.jsx
import { Link, useParams } from 'react-router-dom';
import products from '../Utility/data.json';

const ProductDescription = () => {
    const { id } = useParams();
    const product = products.find((item) => item.id === parseInt(id));

    if (!product) {
        return (
            <div className="container py-4 text-center">
                <h2>Product Not Found</h2>
                <Link to="/" className="btn btn-primary mt-3">Go Back Home</Link>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <h2 className="mb-4 text-center">{products.name}</h2>
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="img-fluid rounded"
                        style={{ height: '400px', objectFit: 'cover' }}
                    />
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center">
                    <h4 className="mb-3">{product.category} → {product.subcategory}</h4>
                    <p className="mb-3">{product.description}</p>
                    <h6 className="mb-3">Color:-{product.color}</h6>
                    <h6 className="mb-3">Brand:-{product.brand}</h6>
                    <h6 className="mb-3">Rating:-{product.rating}</h6>
                    <h6 className="mb-3">Delivery time:-{product.deliveryTime}</h6>
                    <h6 className="mb-3">Return policy:-{product.returnPolicy}</h6>
                    <h4 className="mb-3 text-success">₹{product.price}</h4>
                    <button className="btn btn-primary" >Add to Cart</button>
                </div>
            </div>
            <div className="text-center mt-4">
                <Link to="/" className="btn btn-outline-secondary">Back to Home</Link>
            </div>
        </div>
    );
};

export default ProductDescription;
