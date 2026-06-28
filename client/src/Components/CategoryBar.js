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
        <div className="bg-light py-2 border-bottom">
            <div className="container d-flex flex-wrap justify-content-center gap-4">
                {categories.map((category, index) => (
                    <Link
                        key={index}
                        to={category.path}
                        className="fw-semibold text-dark cursor-pointer text-decoration-none"
                    >
                        {category.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryBar;
