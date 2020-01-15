import React from 'react';
import leftArrowBlack from './icons/back-arrow.png';
import rightArrowBlack from './icons/right-arrow.png';
import leftArrowWhite from './icons/prev-white.png';
import rightArrowWhite from './icons/next-white.png';

const SampleNextArrow = props => {
    const {style, onClick, icon} = props;
    return (
        <div
            className="right-arrow arrows"
            style={{ ...style, display: "block",}}
            onClick={onClick}
        >
             <img src={icon} alt=""/>
        </div>
        
    );
}

const SamplePrevArrow = props => {
    const {style, onClick, icon} = props;
    return (
        <div
            className="left-arrow arrows"
            style={{ ...style, display: "block"}}
            onClick={onClick}
        >
            <img src={icon} alt=""/>
        </div>
    );
}

export const sliderSettings = slidesToShow => {
    let responsive = slidesToShow===4 ? [
        {
            breakpoint: 1024,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
            draggable: true,
            }
        },
        {
            breakpoint: 800,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2,
            draggable: true,
            }
        },
        {
            breakpoint: 600,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            draggable: true,
            }
        }
        ] : [];
    return {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow,
        slidesToScroll: 1,
        autoplay : true,
        arrows : true,
        draggable: false,
        autoHeight: true,
        prevArrow: <SamplePrevArrow icon={slidesToShow===4 ? leftArrowBlack : leftArrowWhite}/>,
        nextArrow: <SampleNextArrow icon={slidesToShow===4 ? rightArrowBlack : rightArrowWhite}/>,
        responsive,
    }
  };