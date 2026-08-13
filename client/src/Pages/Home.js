import ProductList from '../Pages/ProductList';

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-brand-dark text-white py-24 sm:py-32 rounded-b-[3rem] shadow-2xl mb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-dark opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
            Welcome to <span className="text-brand-light">LifestyleNest</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-brand-light/90 max-w-3xl mx-auto font-light leading-relaxed">
            Shop your lifestyle essentials – Fashion, Skincare, Gifts, and more! 
            Experience premium quality curated just for you.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <button className="px-8 py-3 bg-white text-brand-primary font-bold rounded-full shadow-lg hover:bg-gray-100 transition-all hover:scale-105">
              Shop Now
            </button>
            <button className="px-8 py-3 bg-brand-primary border border-white/30 text-white font-bold rounded-full shadow-lg hover:bg-white/10 transition-all">
              Explore Collections
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 border-l-4 border-brand-primary pl-4">Latest Products</h2>
        </div>
        <ProductList />
      </main>
    </div>
  );
};

export default Home;
