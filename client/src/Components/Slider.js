import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

const Slider = () => {
    return (
        <div className="container-fluid p-0"> {/* Full width, no padding */}
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="light-pink.png"
                        alt="First slide"
                        style={{ height: '500px', objectFit: 'cover' }} // Optional: uniform height
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="brown-wall.png"
                        alt="Second slide"
                        style={{ height: '500px', objectFit: 'cover' }} // Optional: uniform height
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="light-blue.png"
                        alt="Second slide"
                        style={{ height: '500px', objectFit: 'cover' }} // Optional: uniform height
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="pink-wall.png"
                        alt="Second slide"
                        style={{ height: '500px', objectFit: 'cover' }} // Optional: uniform height
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="light-green.png"
                        alt="Second slide"
                        style={{ height: '500px', objectFit: 'cover' }} // Optional: uniform height
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="yellow-wall.png"
                        alt="First slide"
                        style={{ height: '500px', objectFit: 'cover' }} // Optional: uniform height
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default Slider;
