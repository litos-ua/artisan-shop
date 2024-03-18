import React, {useEffect, useState} from "react";
import './Carousel.css'

export const Carousel = ({images, interval = 3500}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    //Slider control button logic
    const nextSlide = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };
    const prevSlide = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    //Adds autoscroll to the slider
    useEffect(() => {
        const autoPlayInterval = setInterval(nextSlide, interval);
        return () => {
            clearInterval(autoPlayInterval);
        }
        // eslint-disable-next-line
    }, [interval]);
    return (
        <div className={"carousel__container"}>
            <div className={"carousel"}>
                <button onClick={prevSlide} className={"carousel__btn carousel__btn--prev"}>
                    &lt;
                </button>
                <img src={images[activeIndex]}
                     alt={`Slide ${activeIndex + 1}`}
                     className={"carousel__img"}
                />
                <button onClick={nextSlide} className={"carousel__btn carousel__btn--next"}>
                    &gt;
                </button>
            </div>
        </div>
    );
};


