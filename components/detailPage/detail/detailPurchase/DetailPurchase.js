import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import Checkout from '../checkout/Checkout';
import { setBasketCount } from '../../../account/store/action';
import BasketAdd from './BasketAdd';
import { requestServer, fetchData } from '../../../Helper';
import Linz from './linz/Linz';
import Glass from './Glass';
import './DetailPurchase.css';

class DetailPurchase extends React.Component {
    state = {
        showWindowPortal : false,
        showBasketPortal : false,
        login : false,
        defaultColor: null
    }

    modal = event => event.target.className ==='checkout-portal' ? this.setState({showWindowPortal : false, showBasketPortal : false}) : null;

    basketCount = () => {
        let request = requestServer('basket', 'GET');
        fetchData(request, baskets=>this.props.setBasketCount(baskets.products.length))
    }

    addToBag = () => {
        const {detail, glassCount, leftEye, rightEye, leftCYL, rightCYL,  leftAxis, rightAxis,  leftBoxes, rightBoxes} = this.props;
        if(!localStorage.token){
            return this.setState({
                login : true,
                showBasketPortal : true
            })
        }

        this.setState({showBasketPortal : true})
        let productID = detail._id;
        let productCount = glassCount;
        let linzDetails = {
            left_eye: leftEye ? leftEye : null,
            right_eye: rightEye ? rightEye : null,
            left_eye_cylinder: rightCYL ? rightCYL : null,
            right_eye_cylinder: leftCYL ? leftCYL : null,
            axis_left: leftAxis ? leftAxis : null,
            axis_right: rightAxis ? rightAxis : null,
            left_eye_count: leftBoxes ? leftBoxes : null,
            right_eye_count: rightBoxes ? rightBoxes : null
        };
        let productTypeSlug = detail.productTypeSlug;
        
        let body = {
            productID,
            productCount
        }, filteredBody;

        if(productTypeSlug == 'Kontaktayin-Ospnyak'){
            filteredBody = {...body, ...linzDetails};
        }else{
            filteredBody = {...body};
        }
        
        // return false;
        let request = requestServer('basket', 'POST', filteredBody);
        fetchData(request, ()=>this.basketCount())
    }

    shareOnFb = () => {
        FB.ui({
            method: 'share',
            href: document.URL,
        }, function(response){});
    }

    componentDidMount(){
        this.signal = true;
        document.addEventListener('click', this.modal)
    }

    componentWillUnmount(){
        this.signal = false;
        document.removeEventListener('click', this.modal)
    }

    render(){
        const {detail} = this.props;

        return(
            <div id="product-cost" >
                <div>
                    <h3 onClick={this.createTable}>{detail.name}</h3>
                    <h4>
                        Արտիկուլ {detail.shrift_code}
                    </h4>
                    <h3>{detail.price} ֏</h3>
                    {detail.description.replace(/(<([^>]+)>)/ig, "") !== 'No description' ? detail.description.replace(/(<([^>]+)>)/ig, "") : ''}
                    {detail.left_eye_minus ? <Linz {...detail}/> : <Glass quantity={detail.quantity}/>}
                    <div id="get-product" className={detail.left_eye_minus ? "linz-buttons" : "glass-buttons"}>
                        <button id="add-to-bag" onClick={()=>this.addToBag()}>Ավելացնել Զամբյուղ</button>
                        <button id="checkout-button" onClick={()=>this.setState({showWindowPortal : true})}>
                            <span>Արագ Գնում</span>
                        </button>
                    </div>
                    <p className="socialsharing_product list-inline no-print"> 
                        {/* <button data-type="twitter" type="button" className="btn btn-default btn-twitter social-sharing"> 
                            <img src="https://img.icons8.com/doodle/48/000000/twitter--v3.png" alt=""/> Թվիթ 
                        </button>  */}
                        <button data-type="facebook" onClick={event => this.shareOnFb()} type="button" className="btn btn-default btn-facebook social-sharing"> 
                            <img src="https://img.icons8.com/office/16/000000/facebook-new.png" alt=""/> Կիսվել 
                        </button>
                    </p>
                    {this.state.showAddedProduct && <span>Ավելացված է</span>}
                </div>
                {this.state.showWindowPortal && ReactDOM.createPortal(<Checkout/>, document.getElementById('root'))}
                {this.state.showBasketPortal && ReactDOM.createPortal(<BasketAdd login={this.state.login}/>, document.getElementById('root'))}
            </div>
            // <div>
            //     <p>test</p>
            // </div>
        )
    }
}

const mapStateToProps = state => ({
    leftEye : state.linzCount.leftEye,
    rightEye : state.linzCount.rightEye,
    leftCYL : state.linzCount.leftCYL,
    rightCYL : state.linzCount.rightCYL,
    leftAxis : state.linzCount.leftAxis,
    rightAxis : state.linzCount.rightAxis,
    leftBoxes : state.linzCount.leftBoxes,
    rightBoxes : state.linzCount.rightBoxes,// aj u dzax achqeri qanak@ linza arneluc
    BothEyesEye : state.linzCount.BothEyesEye,
    BothEyesCYL : state.linzCount.BothEyesCYL,
    BothEyesAxis : state.linzCount.BothEyesAxis,
    BothEyesBoxes : state.linzCount.BothEyesBoxes,
    bothEye : state.linzCount.bothEye,
    glassCount : state.linzCount.glassCount,
    color : state.linzCount.color,
})

const mapDispatchToProps = {
    setBasketCount
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPurchase);