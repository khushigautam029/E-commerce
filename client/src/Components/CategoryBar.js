import { Link } from 'react-router-dom';

const CategoryBar = () => {
    const categories = [
        { name: 'All products', path: '/products' },
        { name: 'Clothes', path: '/clothes' },
        { name: 'Footwear', path: '/footwear' },
        { name: 'Gifts', path: '/gifts' },
        { name: 'Skincare', path: '/skincare' },
        { name: 'Decoration Items', path: '/decoration' }
    ];

    return (
        <div className="bg-white">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 px-4 py-2.5 sm:gap-4 sm:px-6 lg:px-8">
                {categories.map((category, index) => (
                    <Link
                        key={index}
                        to={category.path}
                        className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-brand-primary/10 hover:text-brand-primary"
                    >
                        {category.name}
                    </Link>
                ))}
            </div>

            {/* Black horizontal line */}
            <hr className="border-t-1 border-black" />
        </div>
    );
};

export default CategoryBar;