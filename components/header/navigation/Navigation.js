import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setBasketCount, setWishlistCount } from '../../account/store/action';
import { requestServer } from '../../Helper';
import NavigationMobile from './navigationMobile/NavigationMobile';
import './Navigation.css';
import './Navigation-Media.css';

//import icons
import logo from './icons/logo-blue.jpg'
import heart from './icons/heart.png';
import shop from './icons/shop.png';

class Navigation extends React.Component{

    state = {
        basketCount : 0,
        productData: null,
        result: null,
        showResult: false
    }

    request = () => {

        fetch(requestServer('basket', 'GET'))
        .then(res => res.json())
        .then(baskets=> {
            baskets.products ? this.props.setBasketCount(baskets.products.length) : '';
        })
        .catch(error => console.log(error))

        fetch(requestServer('wishlist', 'GET'))
        .then(res => res.json())
        .then(wishlist => {
            wishlist.products ? this.props.setWishlistCount(wishlist.products.length) : '';
        })
        .catch(error => console.log(error))
    }
    
    componentDidUpdate(){
        return this.props.userInside ? this.request() : null
    }

    componentDidMount(){
        const {productData} = this.state;
        if(!productData){
            fetch(requestServer('productData', 'GET'))
                .then(res => res.json())
                .then(productData => {
                    this.setState({ productData })
                })
            .catch(error => console.log(error))
        }
        localStorage.token ? this.request() :  null;
    }

    onInputChange = event => {
        const {productData} = this.state;
        let value = event.target.value.toLowerCase().trim(), result = null;
        
        if (value.length >= 3){
            this.setState({ showResult: true })
            result = productData.filter((single, index) => { 
                return single.name.toLowerCase().includes(value)
            })
            this.setState({ result: result.slice(0,15) });
        }
    }

    onInputLeave = event => {

        setTimeout(() => {

            let { showResult } = this.state;
            if(showResult){
                this.setState({
                    showResult: false
                })
            }
        }, 500)

    };

    render(){
        const {result, showResult} = this.state;
        const {browserWidth, basket, wishlist} = this.props;

        return browserWidth.width<800 ? <NavigationMobile readyResult={result} basket={basket} whishlist={wishlist}/> :
        (
            <section id="navigation" className="navigation">
                <div id="navigation-div">
                    <div id="navigation-logo">
                        <Link to="/" onClick={()=>window.scrollTo({top : 0, behavior : 'smooth'})}><img src={logo} alt=""/></Link>
                    </div>
                    <div id='navigation-middle'>
                        <ul id="navigation-list">
                            <li><Link to="/products/glasses/%7B%7D">ԱԿՆՈՑՆԵՐ</Link></li>
                            <li><Link to="/products/contact-lens/%7B%7D">ԿՈՆՏԱԿՏԱՅԻՆ ՈՍՊՆՅԱԿՆԵՐ</Link></li>
                            <li><Link to="/products/eye-lens/%7B%7D">ԱԿՆՈՑԱՅԻՆ ՈՍՊՆՅԱԿՆԵՐ</Link></li>
                            <li><Link to="/products/care/%7B%7D">ԽՆԱՄՔԻ ՄԻՋՈՑՆԵՐ</Link></li>
                        </ul>
                    </div>
                    <div id="navigation-end">
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
                                            <div className='result-list' key={index}>
                                                <div onClick={() => {
                                                        this.props.history.push(`/products/detail/${element.slug}`)
                                                    } } className='result-list-item' >
                                                    <div className='searched-product-image'>
                                                        <img src={element.image} alt={element.name} />
                                                    </div>
                                                    <div className='searched-product-desc'>
                                                        <h5> {element.name} </h5>
                                                        <p> {element.price}֏ </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) 
                                    })
                                }
                            </div>
                            }
                        </div>   
                        <Link to="/account/wishlist" className="icons">
                            <img src={heart} alt=""/>
                            <span>{wishlist}</span>
                        </Link>
                        <Link to="/account/basket" className="icons">
                            <img src={shop} alt=""/>
                            <span>{basket}</span>
                        </Link>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    browserWidth : state.width,
    basket : state.basketWishCount.basket,
    wishlist : state.basketWishCount.wishlist,
    userInside : state.modal.userInside,
})

const mapDispatchToProps = {
    setBasketCount,
    setWishlistCount
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));