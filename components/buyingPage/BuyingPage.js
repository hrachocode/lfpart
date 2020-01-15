import React from 'react';
import ReactDOM from 'react-dom';
import congratsMessage from './congratsMessage';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { API, API_TOKEN} from '../detailPage/Helper';
import idram from '../icons/idram.png';
import visa from '../icons/visa.jpg';
import master from '../icons/master.jpg';
import './BuyingPage.css';

class BuyingPage extends React.Component{

    state = {
        detail : [],
        payment : 'card',
        randomtKey : '',
        formCreated: false,
        formData: {},
        congratsMessage: false
    }

    phoneNumber = React.createRef();
    shippingAddress = React.createRef();

    componentDidMount(){
        fetch(`${API}${this.props.match.params.slug}${API_TOKEN}`)
            .then(res => res.json())
            .then(detail => {
                this.setState({
                    detail,
                })
            })
        this.setState({randomtKey : Math.floor(Math.random() * 10000)});
    }

    handleChange = event => {
        const {value} = event.target;
        this.setState({payment : value});
    }

    handleIdramPayment = event => {
        event.preventDefault();
        event.target.setAttribute('disabled', 'disabled');
        const {detail, payment, randomtKey, formCreated, formData} = this.state;
        const {
            leftEye,
            rightEye,
            leftCYL,
            rightCYL,
            leftAxis,
            rightAxis,
            leftBoxes,
            rightBoxes,
            bothEye,
            glassCount,
            BothEyesEye,
            BothEyesCYL,
            BothEyesAxis,
            BothEyesBoxes
        } = this.props;

        const productBoxes = bothEye ? BothEyesBoxes : leftBoxes + rightBoxes;
        const totalPrice = detail.left_eye_minus ? productBoxes * detail.price : glassCount*detail.price;
        
        let product_infos = [
            {
                productId: detail._id,
                product_count: glassCount,
                left_eye: leftEye,
                right_eye: rightEye,
                left_eye_count: leftBoxes,
                right_eye_count: rightBoxes
            }
        ];

        let shipping_address = localStorage.shippingAddress ? localStorage.shippingAddress : 'Addrress is not specified';
        let billNumber = Math.floor(Math.random() * 10000);

        let headers = new Headers();
            
        headers.append('Authorization', `Bearer ${localStorage.token}`);
        headers.append('Content-Type', 'application/json');

        let init = {
            headers,
            method: 'POST',
            body: JSON.stringify({product_infos, totalPrice, billNumber, shipping_address})
        };
        let reqURL = `${window.location.protocol}//${window.location.host}/result/order`;
        let req = new Request(reqURL, init);
        
        fetch(req)
            .then(res => res.json())
            .then(data => {
        
                if(data){
                    this.setState({
                        formCreated: true,
                        formData: data
                    })
                    if(typeof data.action != 'undefined'){
                        document.getElementById('idram-form-handle').submit();
                    }else{
                        console.log(data);
                    }
                }
            })
            .catch(error => console.log(error))

    }

    handleCardPayment = event => {
        event.preventDefault();
        event.target.setAttribute('disabled', 'disabled');
        const {detail, payment, randomtKey} = this.state;
        const {
            leftEye,
            rightEye,
            leftCYL,
            rightCYL,
            leftAxis,
            rightAxis,
            leftBoxes,
            rightBoxes,
            bothEye,
            glassCount,
            BothEyesEye,
            BothEyesCYL,
            BothEyesAxis,
            BothEyesBoxes
        } = this.props;

        
        const productBoxes = bothEye ? BothEyesBoxes : leftBoxes + rightBoxes;

        const product_price = detail.left_eye_minus ? productBoxes * detail.price : glassCount*detail.price;
        let amount = product_price * 100;
        let product_infos = [
            {
                productId: detail._id,
                product_count: glassCount,
                left_eye: leftEye,
                right_eye: rightEye,
                left_eye_count: leftBoxes,
                right_eye_count: rightBoxes
            }
        ];

        let payment_name = 'ARCA';
        let shipping_address = localStorage.shippingAddress ? localStorage.shippingAddress : '';
        let headers = new Headers();

        headers.append('Authorization', `Bearer ${localStorage.token}`);
        headers.append('Content-Type', 'application/json');

        let init = {
            headers,
            method: 'POST',
            body: JSON.stringify({amount, product_price, product_infos, payment_name, shipping_address})
        };
        let reqURL = `${window.location.protocol}//${window.location.host}/arca`;
        let req = new Request(reqURL, init);

        fetch(req)
            .then(res => res.json())
            .then(data => {
                if(data.formUrl){
                    window.location.href = data.formUrl;  
                }
            })
            .catch(error => console.log(error))
    }

    handleInPlacePayment = event => {
        event.preventDefault();
        let {detail} = this.state;
        let {glassCount, leftEye, rightEye, leftBoxes, rightBoxes} = this.props;

        let phone = this.phoneNumber.current.value;
        let shippingAddress = this.shippingAddress.current.value;

        let amount = product_price * 100;
        const product_price = detail.left_eye_minus ? productBoxes * detail.price : glassCount*detail.price;
        let product_infos = [
            {
                productId: detail._id,
                product_count: glassCount,
                left_eye: leftEye,
                right_eye: rightEye,
                left_eye_count: leftBoxes,
                right_eye_count: rightBoxes
            }
        ];

        let body, route;
        let payment_name = 'pay_in_store';
        let headers = new Headers();

        if(!localStorage.token){
            body = JSON.stringify({phone, shippingAddress});
            route = '/user/quick_checkout';
        }else{
            headers.append('Authorization', `Bearer ${localStorage.token}`);
            body = JSON.stringify({amount, product_price, product_infos, payment_name, shippingAddress});
            route = '/arca';
        }

        let init = {
            headers,
            method: 'POST',
            body 
        };
        let reqURL = `${window.location.protocol}//${window.location.host}${route}`;
        let req = new Request(reqURL, init);

        fetch(req)
            .then(res => res.json())
            .then(data => {
                if(data.token){
                    let token = data.token;
                    route = '/arca';
                    body = JSON.stringify({amount, product_price, product_infos, payment_name, shipping_address});
                    headers.append('Authorization', `Bearer ${localStorage.token}`);
                    init = {
                        headers,
                        method: 'POST',
                        body 
                    };
                    
                    reqURL = `${window.location.protocol}//${window.location.host}${route}`;
                    fetch(reqURL, init)
                        .then(res => res.json())
                        .then(data => {
                            if(data.formUrl){
                                window.location.href = data.formUrl;
                            }else{
                                this.setState({
                                    congratsMessage: true
                                })
                            }
                        })
                }
            })
            .catch(error => console.log(error))

        

    }

    render(){
        const {detail, payment, randomtKey, formCreated, formData, congratsMessage} = this.state;
        const {
            leftEye,
            rightEye,
            leftCYL,
            rightCYL,
            leftAxis,
            rightAxis,
            leftBoxes,
            rightBoxes,
            bothEye,
            glassCount,
            BothEyesEye,
            BothEyesCYL,
            BothEyesAxis,
            BothEyesBoxes
        } = this.props;
        const productBoxes = bothEye ? BothEyesBoxes : leftBoxes + rightBoxes;
        const productPrice = detail.left_eye_minus ? productBoxes * detail.price : glassCount*detail.price;

        return detail.img ? (
            <div id="buying">
                <section id="buying-detail" className="p-2">
                    <div id="product-data">
                        <div id="product-img">
                            <img src={detail.img[0]} alt=""/>
                        </div>
                        <div>
                            <h3>{detail.name}</h3>
                            <h4>{detail.description.replace(/(<([^>]+)>)/ig, "") != 'No description' ? detail.description.replace(/(<([^>]+)>)/ig, "") : ''}</h4>
                        </div>
                    </div>
                    <div id="order-summary">
                        {detail.left_eye_minus ? <table>
                            <thead>
                                <tr>
                                    <th>Աչք</th>
                                    <th>Տեսողություն</th>
                                    <th>Քանակ</th>
                                    <th>Արժեք</th>
                                </tr>
                            </thead>
                            {bothEye ?
                                 <tbody>
                                    <tr>
                                        <td>Զույգ Աչք</td>
                                        <td>{BothEyesEye}</td>
                                        <td>{BothEyesBoxes}-զույգ</td>
                                        <td>{BothEyesBoxes * detail.price}֏ X2</td>
                                    </tr>
                                 </tbody>
                                : <tbody>
                                <tr>
                                    <td>Ձախ</td>
                                    <td>{leftEye}</td>
                                    <td>{leftBoxes}</td>
                                    <td>{leftBoxes * detail.price}֏</td>
                                </tr>
                               <tr>
                                    <td>Աջ</td>
                                    <td>{rightEye}</td>
                                    <td>{rightBoxes}</td>
                                    <td>{rightBoxes * detail.price}֏</td>
                                </tr>
                            </tbody>}
                        </table> :
                         <table>
                            <thead>
                                <tr>
                                    <th>Քանակ</th>
                                    <th>Գին</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{glassCount}</td>
                                    <td>{detail.price}֏</td>
                                </tr>
                            </tbody>
                        </table> }
                        <p><span>Ընդհանուր Գին: </span> {productPrice}֏</p>
                    </div>
                </section>
                <section id="user-details" className="p-2 mb-4">
                    <h3> Առաքման Տվյալներ </h3>
                    <form action="">
                        <input className="authentication-input p-2 mb-3" type="text" placeholder="Հեռախոսահամար" ref={this.phoneNumber} /> <br />
                        <input className="authentication-input p-2" type="text" placeholder="Առաքման հասցե" ref={this.shippingAddress} />
                    </form>
                </section>
                <section id="buying-card" className="p-2">
                    <h3>Վճարման տարբերակներ</h3>
                    <div>
                        <div class="card-payments">
                            <h4>Ընդունվում է Քարտային Վճարում Visa / Master, Idram և Տեղում վճարում</h4>
                            <div id="credit-card">
                            <section id="payment-metods">
                                <input 
                                    type="radio" 
                                    value="card" 
                                    name="payment-method" 
                                    checked={payment==='card'}
                                    onChange={this.handleChange}
                                /> <div><img src={visa} alt="visa"/><img src={master} alt="master"/></div>
                                <input 
                                    type="radio" 
                                    value="idramArca" 
                                    name="payment-method" 
                                    checked={payment==='idramArca'}
                                    onChange={this.handleChange}
                                /> <div><img src={idram} alt="idram"/></div>
                                <input 
                                    type="radio" 
                                    value="in-place" 
                                    name="payment-method" 
                                    checked={payment==='in-place'}
                                    onChange={this.handleChange}
                                /> <div> <p title='Վճարել տեղում - Գումարը վճարում եք առաքիչին Ձեր նշած հասցեում` ապրանքը ստանալու պահին:'>Վճարել տեղում*</p> </div>
                            </section>
                            {payment === 'card' && <div>
                                <form className='masterVisaForm' >
                                    <input onClick={this.handleCardPayment} type="submit" value="submit" className="button-static"/>
                                </form>
                            </div>}
                            {payment === 'idramArca' && <div>
                                    <form className='masterVisaForm' >
                                        <input onClick={event => this.handleIdramPayment(event)} type="submit" value="submit" className="button-static"/>
                                    </form>
                            </div>}
                            {payment === 'in-place' && <div>
                                    <form className='masterVisaForm' >
                                        <input onClick={event => this.handleInPlacePayment(event)} type="submit" value="submit" className="button-static"/>
                                    </form>
                            </div>}
                            </div>
                        </div>
                    </div>
                </section>
                {this.state.congratsMessage && ReactDOM.createPortal(<congratsMessage />, document.getElementById('root'))}
            </div>
        ) : null
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
    rightBoxes : state.linzCount.rightBoxes,
    BothEyesEye : state.linzCount.BothEyesEye,
    BothEyesCYL : state.linzCount.BothEyesCYL,
    BothEyesAxis : state.linzCount.BothEyesAxis,
    BothEyesBoxes : state.linzCount.BothEyesBoxes,
    bothEye : state.linzCount.bothEye,
    glassCount : state.linzCount.glassCount,
})

export default withRouter(connect(mapStateToProps)(BuyingPage));