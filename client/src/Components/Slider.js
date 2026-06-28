import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

const Slider = () => {
    return (
        <div className="container-fluid p-0"> {/* Full width, no padding */}
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="wall1.webp"
                        alt="First slide"
                        style={{ height: '500px', objectFit: 'cover' }} // Optional: uniform height
                    />
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="wall4.png"
                        alt="Second slide"
                        style={{ height: '500px', objectFit: 'cover' }} // Optional: uniform height
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default Slider;
