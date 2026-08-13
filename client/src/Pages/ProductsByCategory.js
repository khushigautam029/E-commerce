import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import {
    getProductsForCategory,
    normalizeProductImage,
} from "../Utility/categoryUtils";
import products from "../Utility/data.json";

const ProductsByCategory = () => {
    const { category } = useParams();
    const [selectedCategories, setSelectedCategories] = useState(["All"]);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const { addToCart } = useContext(CartContext);

    const getUniqueSubcategories = () => {
        const filtered = getProductsForCategory(products, category);
        return [...new Set(filtered.map((p) => p.subcategory || "General"))];
    };

    const getFilteredProducts = () => {
        let filtered = getProductsForCategory(products, category);
        // CATEGORY FILTER
        if (!selectedCategories.includes("All")) {
            filtered = filtered.filter((product) =>
                selectedCategories.includes(product.subcategory || "General")
            );
        }

        // PRICE FILTER
        if (selectedPrices.length > 0) {
            filtered = filtered.filter((product) => {
                const price = Number(product.price);

                return selectedPrices.some((range) => {
                    switch (range) {
                        case "Under ₹500":
                            return price < 500;

                        case "₹500 - ₹999":
                            return price >= 500 && price <= 999;

                        case "₹1000 - ₹1999":
                            return price >= 1000 && price <= 1999;

                        case "₹2000+":
                            return price >= 2000;

                        default:
                            return false;
                    }
                });
            });
        }

        return filtered;
    };

    const filteredProducts = getFilteredProducts();
    const subcategories = getUniqueSubcategories();

    const handleCategoryChange = (category) => {
        if (category === "All") {
            setSelectedCategories(["All"]);
            return;
        }

        let updated = [...selectedCategories];

        updated = updated.filter((item) => item !== "All");

        if (updated.includes(category)) {
            updated = updated.filter((item) => item !== category);
        } else {
            updated.push(category);
        }

        if (updated.length === 0) {
            updated = ["All"];
        }

        setSelectedCategories(updated);
    };

    const handlePriceChange = (price) => {
        let updated = [...selectedPrices];

        if (updated.includes(price)) {
            updated = updated.filter((item) => item !== price);
        } else {
            updated.push(price);
        }

        setSelectedPrices(updated);
    };

    return (
        <div
            className="container-fluid py-4"
            style={{
                background: "#f8f9fa",
                minHeight: "100vh",
                paddingLeft: "25px",
                paddingRight: "25px",
            }}
        >
            <div className="row">

                {/* ================= LEFT FILTER SIDEBAR ================= */}
                <div className="col-lg-3 mb-4">

                    <div
                        className="bg-white p-4"
                        style={{
                            borderRadius: "15px",
                            boxShadow: "0 5px 18px rgba(0,0,0,.08)",
                            position: "sticky",
                            top: "90px",
                        }}
                    >
                        <h5 className="fw-bold mb-3">Filters</h5>

                        {/* CATEGORY */}
                        <div className="mb-4">
                            <h6 className="fw-bold mb-3">Category</h6>

                            <div className="form-check mb-2">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={selectedCategories.includes("All")}
                                    onChange={() => handleCategoryChange("All")}
                                />
                                <label className="form-check-label">
                                    All
                                </label>
                            </div>

                            {subcategories.map((item) => (
                                <div className="form-check mb-2" key={item}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={selectedCategories.includes(item)}
                                        onChange={() =>
                                            handleCategoryChange(item)
                                        }
                                    />

                                    <label className="form-check-label">
                                        {item}
                                    </label>
                                </div>
                            ))}
                        </div>

                        <hr />

                        {/* PRICE */}
                        <div>
                            <h6 className="fw-bold mb-3">Price</h6>

                            {[
                                "Under ₹500",
                                "₹500 - ₹999",
                                "₹1000 - ₹1999",
                                "₹2000+",
                            ].map((price) => (
                                <div className="form-check mb-2" key={price}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={selectedPrices.includes(price)}
                                        onChange={() =>
                                            handlePriceChange(price)
                                        }
                                    />

                                    <label className="form-check-label">
                                        {price}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ================= PRODUCT GRID ================= */}
                <div className="col-lg-9">

                    <div className="row g-4">

                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div
                                    className="col-12 col-sm-6 col-md-4 col-xl-3"
                                    key={product.id}
                                >
                                    <div
                                        className="card h-100 border-0"
                                        style={{
                                            borderRadius: "18px",
                                            overflow: "hidden",
                                            boxShadow:
                                                "0 6px 20px rgba(0,0,0,.08)",
                                            transition: ".3s",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform =
                                                "translateY(-8px)";
                                            e.currentTarget.style.boxShadow =
                                                "0 15px 30px rgba(0,0,0,.15)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform =
                                                "translateY(0)";
                                            e.currentTarget.style.boxShadow =
                                                "0 6px 20px rgba(0,0,0,.08)";
                                        }}
                                    >
                                        <Link
                                            to={`/product/${product.id}`}
                                            style={{
                                                textDecoration: "none",
                                                color: "inherit",
                                            }}
                                        >
                                            <img
                                                src={normalizeProductImage(
                                                    product.image
                                                )}
                                                alt={product.name}
                                                style={{
                                                    width: "100%",
                                                    height: "300px",
                                                    objectFit: "cover",
                                                }}
                                            />

                                            <div className="card-body">

                                                <h5
                                                    className="fw-bold"
                                                    style={{
                                                        minHeight: "50px",
                                                    }}
                                                >
                                                    {product.name}
                                                </h5>

                                                <p
                                                    className="text-muted small"
                                                    style={{
                                                        minHeight: "55px",
                                                    }}
                                                >
                                                    {product.description}
                                                </p>

                                                <div className="d-flex justify-content-between align-items-center">

                                                    <h4 className="text-primary fw-bold mb-0">
                                                        ₹{product.price}
                                                    </h4>

                                                    <span className="badge bg-warning text-dark">
                                                        ★ {product.rating || 4}
                                                    </span>
                                                </div>

                                                <small className="text-secondary d-block mt-2">
                                                    {product.category}
                                                    {product.subcategory &&
                                                        ` • ${product.subcategory}`}
                                                </small>
                                            </div>
                                        </Link>

                                        <div className="p-3 pt-0">
                                            <button
                                                className="btn btn-primary w-100"
                                                style={{
                                                    borderRadius: "10px",
                                                }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    addToCart(product);
                                                }}
                                            >
                                                🛒 Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-5">
                                <h3>No products found.</h3>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductsByCategory;