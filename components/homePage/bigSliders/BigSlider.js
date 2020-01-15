import React from 'react';
import Loader from '../../Loader';
import { productsAPI } from '../../productsAPI';
import { sliderSettings } from '../../sliderHelper';
import Slider from "react-slick";
import './BigSlider.css';
import './BigSlider-Media.css';

class BigSlider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading : false,
            elems : []
        }
    }

    componentDidMount(){
        this.setState({loading : true});
        this.signal = true;
        fetch(productsAPI('slider'))
        .then(res => res.json())
        .then(elems => {
            this.signal && this.setState({
                loading : false,
                elems,
            })
        })
    }

    componentWillUnmount(){
        this.signal = false;
    }

    render(){
        const {id} = this.props;
        const {loading, elems} = this.state;
        const settings = sliderSettings(1);

        return loading ? <Loader style={{height : '400px'}} size="big"/> : ( 
            <div id={id} className="big-carousel">
                <Slider {...settings}>
                    {elems.length>0 && elems.map((elem, index) => (
                        <div key={elem._id} className="carousel-inner">
                            <div className="absolute-div">
                                <h1>{elem.title}</h1>
                                <p>{elem.description}</p>
                                <button type="button" className="big-slider-button">{elem.button_text}</button>
                            </div>
                            <img className="d-block w-100" src={elem.img} alt="First slide"/>
                        </div>
                    ))}
                </Slider>
            </div>
        )
    }
}
    
export default BigSlider;