import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { normalizeProductImage } from "../Utility/categoryUtils";
import products from "../Utility/data.json";

const ProductDescription = () => {
    const { addToCart } = useContext(CartContext);
    const { id } = useParams();
    const product = products.find((item) => item.id === parseInt(id));

    if (!product) {
        return (
            <div className="container py-5 text-center">
                <h2>Product Not Found</h2>

                <Link to="/products" className="btn btn-primary mt-3">
                    Go Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="container-fluid px-lg-5 px-3 py-3">

            {/* Breadcrumb */}

            <nav className="mb-3">
                <small className="text-muted">
                    Home / {product.category} / {product.subcategory}
                </small>
            </nav>

            <div className="row align-items-start gx-lg-3 gx-2">

                {/* Left Image */}

                <div className="col-lg-5">

                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                            minHeight: "560px",
                            background: "#fafafa",
                            borderRadius: "18px",
                        }}
                    >
                        <img
                            src={normalizeProductImage(product.image)}
                            alt={product.name}
                            className="img-fluid"
                            style={{
                                maxHeight: "560px",
                                objectFit: "contain",
                                transition: ".35s",
                                cursor: "zoom-in",
                            }}
                            onMouseOver={(e) =>
                                (e.currentTarget.style.transform = "scale(1.06)")
                            }
                            onMouseOut={(e) =>
                                (e.currentTarget.style.transform = "scale(1)")
                            }
                        />
                    </div>
                </div>

                {/* Right Details */}
                <div className="col-lg-7 mt-4 mt-lg-0">
                    <div className="bg-white p-4 rounded-4 shadow-sm">
                        <div className="d-flex flex-wrap gap-2 mb-3">
                            <Link to="/products" className="btn btn-sm btn-outline-secondary">
                                ← All Products
                            </Link>
                            <span className="badge bg-primary">{product.category}</span>
                            {product.subcategory && <span className="badge bg-secondary">{product.subcategory}</span>}
                        </div>

                        <h2 className="fw-bold mb-3">{product.name}</h2>

                        <div className="d-flex flex-wrap align-items-center mb-3 gap-3">
                            <span className="badge bg-success">⭐ {product.rating}</span>
                            <span className="text-success fw-semibold">In Stock</span>
                        </div>

                        <h2 className="fw-bold text-success mb-4">₹{product.price}</h2>

                        <p className="text-secondary mb-4">{product.description}</p>

                        <div className="row row-cols-1 row-cols-sm-2 g-3 mb-4">
                            <div>
                                <div className="fw-semibold">Brand</div>
                                <div>{product.brand || 'N/A'}</div>
                            </div>
                            <div>
                                <div className="fw-semibold">Color</div>
                                <div>{product.color || 'N/A'}</div>
                            </div>
                            {product.size && product.size.length > 0 && (
                                <div>
                                    <div className="fw-semibold">Size</div>
                                    <div>{product.size.join(', ')}</div>
                                </div>
                            )}
                            {product.material && (
                                <div>
                                    <div className="fw-semibold">Material</div>
                                    <div>{product.material}</div>
                                </div>
                            )}
                            <div>
                                <div className="fw-semibold">Delivery</div>
                                <div className="text-success">{product.deliveryTime}</div>
                            </div>
                            <div>
                                <div className="fw-semibold">Return Policy</div>
                                <div>{product.returnPolicy}</div>
                            </div>
                        </div>

                        <div className="d-flex flex-wrap gap-3 mb-4">
                            <button
                                onClick={() => addToCart(product)}
                                className="btn btn-warning px-5 py-3 fw-semibold"
                                style={{ borderRadius: '10px' }}
                            >
                                🛒 Add to Cart
                            </button>

                            <button
                                className="btn btn-success px-5 py-3 fw-semibold"
                                style={{ borderRadius: '10px' }}
                            >
                                Buy Now
                            </button>
                        </div>

                        <div className="mt-3">
                            <div className="mb-2">🚚 Fast Delivery Available</div>
                            <div className="mb-2">🔄 Easy Returns</div>
                            <div>🔒 Secure Payment</div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="text-center mt-5">

                <Link
                    to="/"
                    className="btn btn-outline-dark rounded-pill px-4"
                >
                    ← Continue Shopping
                </Link>

            </div>

        </div>
    );
};

export default ProductDescription;