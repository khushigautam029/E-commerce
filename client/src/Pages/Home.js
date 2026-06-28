import ProductList from '../Pages/ProductList';

const Home = () => {
  return (
    <div className="home">
      <header className="home-banner">
        <h1 className="text-4xl font-bold text-center my-8">Welcome to LifestyleNest</h1>
        <p className="text-center text-lg text-gray-600">Shop your lifestyle essentials – Fashion, Skincare, Gifts, and more!</p>
      </header>

      <section className="product-section my-12 px-4">
        <h2 className="text-2xl font-semibold mb-4">Latest Products</h2>
        <ProductList />
      </section>
    </div>
  );
};

export default Home;
