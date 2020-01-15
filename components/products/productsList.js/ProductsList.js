import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setProductsLength } from '../store/action';
import Loader from '../../Loader';
import './ProductsList.css';

class ProductsList extends React.Component{
    
    state = {
        products : [],
        elemsFilter : [],
        update : true,
    }

    handleClick = () => this.props.setProductsLength(this.props.count);

    componentDidUpdate(prevProps, prevState){
        let {products, sort, productsLength, productsCost, path} = this.props;
        if(
            this.state.products.length!== products.length || 
            this.state.update!==prevState.update || 
            sort!==prevProps.sort || 
            path!==prevProps.path ||
            productsLength!==prevProps.productsLength || 
            productsCost!==prevProps.productsCost
        ){
            switch (sort){
                case 'A-Z':
                    products.sort((a, b)=> a.name>b.name ? 1 : a.name<b.name ? -1 : 0);
                    break;
                case 'Z-A':
                    products.sort((a, b)=> a.name>b.name ? -1 : a.name<b.name ? 1 : 0);
                    break;
                case 'Cheap':
                    products.sort((a, b)=> b.price - a.price);
                    break;
                case 'Expensive':
                    products.sort((a, b)=> a.price - b.price);
                    break;
                default : 
                    products.sort((a, b)=> new Date(b.date) - new Date(a.date));
            };
            products = products.filter(elem=>{
                return elem.price>=productsCost.min && elem.price<=productsCost.max
            })
            this.setState({
                products : this.props.products,
                elemsFilter : products,
                update : false,
            })
        }
    }
    
    render(){
        const {elemsFilter} = this.state;

        return(
            <React.Fragment>
                {this.props.loading ? <Loader style={{height : '90%', width: '100%', backgroundColor: '#e3e3e3'}}/> : 
                <div id="product-list" > 
                    {elemsFilter.map(elem =>
                        <div key={elem._id}>
                            <img src={elem.img[0]} alt="" className="product-img" onClick={()=>this.props.history.push(`/products/detail/${elem.slug}`)}/>
                            <div>
                                Անվանում : <span>{elem.name}</span> <br/>
                                Արժեք : <span>{elem.price } ֏</span>
                            </div>
                        </div>
                    )}
                </div>}
                {!this.props.loading && <div id="products-load">
                    <button onClick={this.handleClick}>Բեռնել Ավելին</button>
                </div>}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    count : state.products.count,
    productsLength : state.products.productsLength,
    sort : state.products.sort,
    products : state.products.products,
    loading : state.products.loading,
    path : state.products.path,
    productsCost : state.products.productsCost
})

const mapDispatchToProps = {
    setProductsLength
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductsList));