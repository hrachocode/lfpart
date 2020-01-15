import React from 'react';
import FooterNavigation from '../components/homePage/footerNavigation/FooterNavigation';
import ProductSlider from '../components/productSlider/ProductSlider';
import BigSlider from '../components/homePage/bigSliders/BigSlider';
import BannerElems from '../components/homePage/banners/Banner';

export const fullWidth = () => {
    return(
        <div>
            <BigSlider id="carouselExampleIndicatorsTop"/>
			<h2 id="text-area">ՆՈՐ ՏԵՍԱԿԱՆԻ</h2>
			<div className="banners-elems">
				<BannerElems index={0}/>
                <BannerElems index={1}/>
            </div>
			<ProductSlider/>
			<div className="banners-elems">
                <BannerElems index={2}/>
                <BannerElems index={3}/>
			</div>
			<ProductSlider/>
            <BigSlider id="carouselExampleIndicatorsBottom"/>
		</div>
    )  
}

export const mobileWidth = () => {
    return (
        <div className="media-home">
			<BannerElems index={0}/>
            <h2 id="text-area">ՆՈՐ ՏԵՍԱԿԱՆԻ</h2>
            <ProductSlider/>
            <BannerElems index={1}/>
            <BannerElems index={2}/>
            <ProductSlider/>
            <BannerElems index={3}/>
            <FooterNavigation/>
        </div>
    )
}