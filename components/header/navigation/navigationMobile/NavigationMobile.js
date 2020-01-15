import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { requestServer } from '../../../Helper';
//import icons
import logo from '../icons/logo-blue.jpg';
import heart from '../icons/heart.png';
import shop from '../icons/shop.png';
import menu from '../icons/menu.png';
import './Navigation-mobile.css';

class NavigationMobile extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            productData: null,
            result: null,
            showResult: false,
            open: false
        }
    }

    handleClick = () => {
        this.setState({ open: !this.state.open })
    }

    onInputChange = event => {
        const {productData} = this.state;
        let value = event.target.value.toLowerCase().trim(), result = null;
        
        if (value.length >= 3){
            this.setState({ showResult: true })
            result = productData.filter((single) => {
                return single.name.toLowerCase().includes(value)
            })
            this.setState({ result: result.slice(0, 15) });
        }
    }

    onInputLeave = event => {
        let { showResult } = this.state; 
        setTimeout(() => {
            if(showResult){
                this.setState({
                    showResult: false
                })
            }
        }, 500)
    };

    componentDidMount() {
        const {readyResult} = this.props;
         if(!readyResult){
            fetch(requestServer('productData', 'GET'))
            .then(res => res.json())
            .then(productData => {
                this.setState({ productData })
            })
            .catch(error => console.log(error))
        }
    }

    render() {
        const {result, showResult, open} = this.state;
        const {whishlist, basket} = this.props;
        return (
            <section id="navigation-media" className="navigation">
            <div id="navigation-media-menu">
                <div>
                    <span onClick={()=> this.handleClick()} id="menu-button"><img src={menu} alt="menu-button"/></span>
                    {open && <div id="menu-list">
                        <ul>
                            <Link to="/products/glasses/%7B%7D"><li>ԱԿՆՈՑՆԵՐ</li></Link>
                            <Link to="/products/contact-lens/%7B%7D"><li>ԿՈՆՏԱԿՏԱՅԻՆ ՈՍՊՆՅԱԿՆԵՐ</li></Link>
                            <Link to="/products/eye-lens/%7B%7D"><li>ԱԿՆՈՑԱՅԻՆ ՈՍՊՆՅԱԿՆԵՐ</li></Link>
                            <Link to="/products/care/%7B%7D"><li>ԽՆԱՄՔ</li></Link>
                        </ul>
                    </div>}
                    
                    <div className='search-result'>
                        <span>
                            <input className="icons" type="text" name="search" placeholder="Search.." 
                                    onClick={event => !showResult ? this.setState({ showResult: true }) : '' }
                                    onInput={event => this.onInputChange(event)} 
                                    onBlur={event => this.onInputLeave(event)}
                                    />
                        </span>
                        {result && showResult &&
                        <div className='result'>
                            {
                                result.map((element, index) => {
                                    return (
                                        <div className='result-list' key={index} >
                                            <Link to={`/products/detail/${element.slug}`} className='result-list-item'>
                                                <div className='searched-product-image'>
                                                    <img src={element.image} alt={element.name} />
                                                </div>
                                                <div className='searched-product-desc'>
                                                    <h5> {element.name} </h5>
                                                    <p> {element.price}֏ </p>
                                                </div>
                                            </Link>
                                        </div>
                                    ) 
                                })
                            }
                        </div>
                        }
                    </div>   
                
                </div>
                <div id="navigation-media-logo">
                    <Link to="/" onClick={()=>window.scrollTo({top : 0, behavior : 'smooth'})}>
                        <img src={logo} alt=""/>
                    </Link>
                </div>
                <div id="navigation-media-end">
                    <Link to="/account/wishlist">
                        <img src={heart} alt=""/>
                        <span>{whishlist}</span>
                    </Link>
                    <Link to="/account/basket">
                        <img src={shop} alt=""/>
                        <span>{basket}</span>
                    </Link>
                        </div>
                    </div>
            </section>
        )
    }

}

export default NavigationMobile;