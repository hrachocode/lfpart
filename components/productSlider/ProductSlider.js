import React from 'react';
import Loader from '../Loader';
import Slider  from 'react-slick';
import { sliderSettings } from '../sliderHelper';
import { withRouter } from 'react-router-dom';
import { productsAPI } from '../productsAPI';
import { fetchData } from '../Helper';

import './ProductSlider.css';
import './ProductSlider-Media.css';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const style = {
    height : '360px'
}

class ProductSlider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            elems : [],
            loading : false
        }
    }

    hystoryChange = (elem, history) => {
        window.scrollTo(0, 0);
        history.push(`/products/detail/${elem.slug}`);
    }

    componentDidMount(){
        this.setState({loading : true});
        this.signal = true;
        fetch(productsAPI('products')+'&limit=10')
        .then(res => res.json())
        .then(elems => {
            this.signal && this.setState({
                loading : false,
                elems
            })
        })
    }

    componentWillUnmount(){
        this.signal = false;
    }

    render(){
        const {elems, loading} = this.state;
        const settings = sliderSettings(4);

        return loading ? <Loader style={style}/> : (
            <div className="product-slider-parent">
                <Slider {...settings}>
                    {elems.map(elem=> (
                        <div key={elem._id} className="product-image-div" >
                            <img 
                                src={elem.img[0]} alt={elem.name}
                                className="top-product-slider-elems" 
                                onClick={() => this.hystoryChange(elem, this.props.history)}
                             />
                            <div className="product-paragraph">
                                <p>{elem.name}</p>
                                <p>{elem.price} ֏</p> 
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        ) 
    }
}

export default withRouter(ProductSlider);