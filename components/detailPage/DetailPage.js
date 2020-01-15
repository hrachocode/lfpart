import React from 'react';
import ProductSlider from '../productSlider/ProductSlider';
import Detail from './detail/Detail';

const DetailPage = () => (
    <div id="detail">
        <Detail/>
        <section id="detail-product-slider"> 
            <h2>SIMILAR PRODUCTS</h2>
            <ProductSlider /> 
        </section>
    </div>
)

export default DetailPage;