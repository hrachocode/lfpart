import React from 'react';
import './ProductsView.css';
import Show from './components/Show';
import Sort from './components/Sort';
import Comparison from './components/Comparison';

const ProductsView = () => {
    return(
        <div id="products-view">
            <Comparison />
            <Show />
            <Sort />
        </div>
    )
}

export default ProductsView;