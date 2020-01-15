import React from 'react';
import NotFound from '../notFound/NotFound';
import ProductsFilter from './productsFilter/ProductsFilter';
import ProductsView from './productsView/ProductsView';
import ProductsList from './productsList.js/ProductsList';
import './Products.css'

class Products extends React.Component {
    state = { hasError: false };
  
    static getDerivedStateFromError() {
        return { hasError: true };
    }
  
    render(){
        return this.state.hasError ? <NotFound/> :
            <div id="products">
                <ProductsFilter/>
                <div id="products-list-view">
                    <ProductsView/>
                    <ProductsList/>
                </div>
            </div>
    }
}


export default Products;