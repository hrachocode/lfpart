import React from 'react';
import ReactDOM from 'react-dom';
import BasketAdd from '../../detailPage/detail/detailPurchase/BasketAdd';
import { connect } from 'react-redux';
import { setBasketCount, setWishlistCount } from '../store/action';
import { requestServer } from '../../Helper';
import Loader from '../../Loader';
import './Wishlist.css';

class Wishlist extends React.Component {

    state = {
        loading : true,
        showBasketPortal : false,
        wishlist : []
    }

    modal = event => event.target.className ==='checkout-portal' ? this.setState({showBasketPortal : false}) : null;

    basketCount = () => {
        fetch(requestServer('basket', 'GET'))
        .then(res => res.json())
        .then(basket => this.props.setBasketCount(basket.products.length))
        .catch(error => console.log(error))
    }

    addToBag = elem => {
        this.setState({showBasketPortal : true})
        const {glassCount} = this.props;
        let product_id = elem._id;
        let product_count = glassCount;
        let body = {
            product_id,
            product_count
        }

        fetch(requestServer('basket', 'POST', body))
        .then(res => res.json())
        .then(()=>this.basketCount())
        .catch(error => console.log(error))
    }

    remove = (elem, index, event) => {
        const {wishlist} = this.state;
        wishlist.splice(index ,1);
        event.target.parentElement.parentElement.style.opacity = 0;
        event.target.parentElement.parentElement.style.transitionDuration = '1s';
        setTimeout(()=>this.setState({wishlist}), 1000)

        fetch(requestServer('wishlist/deleteProduct', 'POST', { index: index }))
        .then(res => {
            this.setState({loading: false})
            return res.json();
        })
        .then(wishlist => {
            this.props.setWishlistCount(wishlist.products.length);
            this.setState({wishlist : wishlist.products});
        })
        .catch(error => console.log(error))
    }
    
    componentDidMount(){
        document.addEventListener('click', this.modal)
        this.signal = true;
        window.scrollTo({top : 0});
        this.setState({loading : true})
        fetch(requestServer('wishlist', 'GET'))
        .then(res => {
            this.setState({loading: false})
            return res.json();
        })
        .then(wishlist => {
            if(wishlist.products){
                this.props.setWishlistCount(wishlist.products.length);
                this.setState({wishlist : wishlist.products});
            }
        })
        .catch(error => console.log(error))
    }

    componentWillUnmount(){
        this.signal = false;
        document.removeEventListener('click', this.modal)
    }
    
    render(){
        const {elems, loading, showBasketPortal} = this.state;
        const {wishlist} = this.state;

        return(
            <div id="wishlist">
                <h1>Նախնըտրած Ապրանքներ</h1>
                {loading ? <Loader/> : 
                wishlist.length===0 ? <h2>Դուք Այս պահին չունեք նախընտրած ապրանքներ</h2> :
                <div id="wishlist-contain" > 
                    {wishlist.map((elem, index)=>
                        <div key={elem._id}>
                            <img src={elem.productID.img[0]} alt="" className="product-img" onClick={()=>this.props.history.push(`/products/detail/${elem.productID.slug}`)}/>
                            <div className="wish-detail">
                                <p>Անվանում : <span>{elem.productID.name}</span></p>
                                <p>Արժեք : <span>{elem.productID.price} ֏</span></p>
                            </div>
                            <div className="wish-buttons">
                                <button className="button-static" onClick={()=>this.addToBag(elem.productID)}>Ավելացնել զամբյուղ</button>
                                <button className="button-static" onClick={event=>this.remove(elem.productID, index, event)}>Հեռացնել</button>
                            </div>
                        </div>
                    )}
                </div>
                }
                {showBasketPortal && ReactDOM.createPortal(<BasketAdd/>, document.getElementById('root'))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    glassCount : state.linzCount.glassCount,
})

const mapDispatchToProps = {
    setBasketCount,
    setWishlistCount
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);