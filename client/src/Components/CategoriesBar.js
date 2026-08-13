import { Link } from "react-router-dom";

const CategoriesBar = () => {
  const categories = [
    {
      name: "Ethnic Wear",
      icon: "👗",
      link: "/products/ethnic-wear",
    },
    {
      name: "Western Dresses",
      icon: "👚",
      link: "/products/western-dress",
    },
    {
      name: "Menswear",
      icon: "👕",
      link: "/products/menswear",
    },
    {
      name: "Footwear",
      icon: "👟",
      link: "/products/footwear",
    },
    {
      name: "Home Decor",
      icon: "🏡",
      link: "/products/home-decor",
    },
    {
      name: "Beauty",
      icon: "💄",
      link: "/products/beauty",
    },
    {
      name: "Gifts",
      icon: "🎁",
      link: "/products/accessories",
    },
  ];

  return (
    <section className="bg-white py-5">
      <div className="container mx-auto px-3">

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-y-6 gap-x-4">

          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.link}
              className="group flex flex-col items-center justify-center text-center"
            >
              <div
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  bg-violet-100
                  shadow-sm
                  transition-all
                  duration-300
                  group-hover:-translate-y-1
                  group-hover:scale-105
                  group-hover:bg-violet-200
                  group-hover:shadow-lg

                  sm:h-24
                  sm:w-24
                "
              >
                <span className="text-4xl">
                  {category.icon}
                </span>
              </div>

              <p
                className="
                  mt-3
                  text-sm
                  font-semibold
                  text-gray-700
                  leading-5
                  transition-colors
                  duration-300
                  group-hover:text-violet-700
                "
              >
                {category.name}
              </p>
            </Link>
          ))}

        </div>

      </div>
    </section>
  );
};

export default CategoriesBar;