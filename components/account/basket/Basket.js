import React from 'react';
import { connect } from 'react-redux'
import { setBasketCount } from '../store/action';
import { requestServer } from '../../Helper';
import Loader from '../../Loader';
import garbage from '../images/garbage.png';
import car from '../images/car.jpg';
import idram from '../../icons/idram.png';
import visa from '../../icons/visa.jpg';
import master from '../../icons/master.jpg';
import './Basket.css';

class Basket extends React.Component{

    state = {
        baskets : [],
        detail : [],
        payment : 'card',
        checked: false,
        user_id: null,
        shippingAddresses: null,
        loading : false,
        formCreated: false,
        formData: {}
    }

    getDateParse = date => {
        let time = new Date(date);
        return `${time.getDate()}.${time.getMonth()}.${time.getFullYear()}`;
    }

    handleCheckout = () => {
        const {baskets} = this.state;
    }

    handleChange = event => {
        const {value} = event.target
        this.setState({payment : value})
    }

    handleChangeChk = checkbox => {
        let {checked} = this.state;
        if (checked){
            this.setState({
                checked: false
            })
        }else{
            this.setState({
                checked: true
            })
        }
    }

    handleClick = (id, event) => {
        let {baskets} = this.state;
        let currentIndex;
        
        event.target.closest('tr').style.opacity = 0;
        event.target.closest('tr').style.transitionDuration = '1s';

        baskets.map((elem, index)=>{
            currentIndex = index;
            if(elem._id===id){
                return baskets.splice(index, 1)
            }
            return null
        })

        fetch(requestServer('/basket/deleteProduct', 'POST', {index: currentIndex}))
        .then(res => res.json())
        .then(baskets => baskets)
        .catch(error => console.log(error));

        setTimeout(()=>this.setState({baskets}), 1000)
        this.props.setBasketCount(baskets.length);
    }

    componentDidMount() {
        this.setState({loading : true})
        fetch(requestServer('basket', 'GET'))
        .then(res => res.json())
        .then(baskets=> {
            if(baskets.products){
                this.props.setBasketCount(baskets.products.length);
                this.setState({baskets : baskets.products})
            }
        })
        .catch(error => console.log(error))
        
        fetch(requestServer('user', 'GET'))
        .then(res => res.json())
        .then(user=>this.setState({
            user_id : user._id,
            loading : false
        }))
        .catch(error => console.log(error))
    }

    handleIdramPayment = event => {
        event.preventDefault();
        event.target.setAttribute('disabled', 'disabled');
        let {baskets} = this.state;
        let product_infos = [];
        let totalPrice = null;
        baskets && baskets.map(elem => {
            const productCount = (elem.left_eye_count && elem.right_eye_count) ? elem.left_eye_count + elem.right_eye_count : elem.productCount;

            totalPrice += productCount * elem.productID.price;
            product_infos.push({
                productId: elem.productID._id,
                product_count: elem.productCount,
                left_eye: elem.left_eye,
                right_eye: elem.right_eye,
                left_eye_count: elem.left_eye_count,
                right_eye_count: elem.right_eye_count,
                color: 'blue'
            })
        })

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
        const {baskets} = this.state;
        
        let product_infos = [];
        let product_price = null;
        baskets && baskets.map(elem => {
            const productCount = (elem.left_eye_count && elem.right_eye_count) ? elem.left_eye_count + elem.right_eye_count : elem.productCount;
            
            product_price +=  productCount * elem.productID.price;
            product_infos.push({
                productId: elem.productID._id,
                product_count: elem.productCount,
                left_eye: elem.left_eye,
                right_eye: elem.right_eye,
                left_eye_count: elem.left_eye_count,
                right_eye_count: elem.right_eye_count,
                color: 'blue'
            })
        })

        let amount = product_price * 100;
        let shipping_address = localStorage.shippingAddress ? localStorage.shippingAddress : '';
        let payment_name = 'ARCA';
        let headers = new Headers();
            
        headers.append('Authorization', `Bearer ${localStorage.token}`);
        headers.append('Content-Type', 'application/json');

        let init = {
            headers,
            method: 'POST',
            body: JSON.stringify({amount, product_infos, product_price, payment_name, shipping_address})
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
    
    render(){
        const {baskets, payment, checked, formCreated, formData, loading} = this.state;
        const {
            leftEye,
            rightEye,
            // leftCYL,
            // rightCYL,
            // leftAxis,
            // rightAxis,
            leftBoxes,
            rightBoxes,
            // bothEye,
            glassCount,
            // BothEyesEye,
            // BothEyesCYL,
            // BothEyesAxis,
            // BothEyesBoxes
        } = this.props;
        let totalPorducts = 0;
        let orderNumber =   Math.floor(Math.random() * 10000);
        // const productBoxes = bothEye ? BothEyesBoxes : leftBoxes + rightBoxes;
        const productFinalDetails = {
            shipping_address: localStorage.shippingAddress,
            user_id: localStorage.id,
            product_infos: []
        };

        baskets && baskets.map(elem => {
            productFinalDetails.product_infos.push({
                productId: elem.productID._id,
                product_count: elem.productCount,
                left_eye: elem.left_eye,
                right_eye: elem.right_eye,
                left_eye_count: elem.left_eye_count,
                right_eye_count: elem.right_eye_count,
                color: 'blue'
            })
        })
        

        return(
            <div id="basket" className="table-list">
                <h2>Պատվերների պատմություն</h2>
                <p>Այստեղ այն պատվերներն են, որտեղ Դուք տեղադրել եք Ձեր հաշվի ստեղծման պահից</p>
                {loading ? <Loader/> :
                baskets.length > 0 ?
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Ապրանք</th>
                                <th>Բնութագիր</th>
                                <th>Աջ Աչք</th>
                                <th>Ձախ Աչք</th>
                                <th>Գին</th>
                                <th>Քանակը</th>
                                <th>Ընդհանուր</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {baskets.map(elem=>{
                                const productCount = (elem.left_eye_count && elem.right_eye_count) ? elem.left_eye_count + elem.right_eye_count : elem.productCount;
                                totalPorducts += productCount * elem.productID.price;
                                return(
                                    <tr key={elem._id}>
                                        <td><img src={elem.productID.img[0]} alt={elem.productID.name}/></td>
                                        <td>{elem.productID.name}</td>
                                        <td>{elem.left_eye_count}</td>
                                        <td>{elem.right_eye_count}</td>
                                        <td>{elem.productID.price}֏</td>
                                        <td>{productCount}</td>
                                        <td>{productCount * elem.productID.price}֏</td>
                                        <td><img src={garbage} onClick={event=>this.handleClick(elem._id, event)} alt="basket"/></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <section id="delivery-options">
                        <h2>ԱՌԱՔՄԱՆ ՏԱՐԲԵՐԱԿՆԵՐԸ</h2>
                        <p>Ընտրել առաքման տարբերակը</p>
                        <div id="select-option">
                            <input type="radio" checked />
                            <img src={car} alt=""/>
                            <p>Անվճար առաքում</p>
                        </div>
                        <p>Ընտրել առաքման Հասցեն</p>
                        <div id="select-option" className="shipping-address-wrapper">
                            <input type="text" className="shipping-address" placeholder="Ք․ Երևան, Խաչատրյան 22/4" 
                                    onInput={event => localStorage.setItem('shippingAddress', event.target.value.trimLeft()) } />
                        </div>
                        <div className="total-wrapper">
                            <div className="total-price">
                                <div>
                                    <p className="total-heading">Ընդհանուր</p>
                                    <p>{totalPorducts}֏</p>
                                </div>
                            </div>
                        </div>
                        <input type="checkbox" onChange={this.handleChangeChk}/> Ես համաձայն եմ Ծառայության մատուցման պայմաններին և կպահպանեմ դրանք անվերապահորեն (ընթերցել Ծառայության մատուցման պայմանները)
                    </section>
                    {checked && 
                    <section id="buying-card">
                        <h2>ԽՆԴՐՈՒՄ ԵՆՔ ԸՆՏՐԵԼ ՎՃԱՐՄԱՆ ՏԱՐԲԵՐԱԿԸ</h2>
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
                            </section>
                            {payment==='card' && <div>
                            <form className='masterVisaForm' >
                                <input onClick={event => this.handleCardPayment(event)} type="submit" value="submit" className="button-static"/>
                            </form>
                            </div>}
                            {payment==='idramArca' && 
                            
                            <div>
                                {formCreated && <form id="idram-form-handle" action={formData.action} method="POST" encType="multipart/form-data">
                                    <input type="hidden" name="EDP_LANGUAGE" value={formData.EDP_LANGUAGE} />
                                    <input type="hidden" name="EDP_REC_ACCOUNT" value={formData.EDP_REC_ACCOUNT} />
                                    <input type="hidden" name="EDP_DESCRIPTION" value={formData.EDP_DESCRIPTION} />
                                    <input type="hidden" name="EDP_AMOUNT" value={formData.EDP_AMOUNT} />
                                    <input type="hidden" name="EDP_BILL_NO" value={formData.EDP_BILL_NO}/>
                                    <input type="hidden" name="EDP_EMAIL" value={formData.EDP_EMAIL} />
                                    {/* <input type="submit" value="submit" className="button-static" /> */}
                                </form> }
                                <form className='masterVisaForm' >
                                    <input onClick={event => this.handleIdramPayment(event)} type="submit" value="submit" className="button-static"/>
                                </form>
                            </div>
                            }
                        </div>
                    </section>}
                </div> : 
                <p> Դուք դեռ չունեք ապրանք զամբյուղում, 
                    <a href={window.location.protocol + "//" + window.location.hostname + ':' + (window.location.port ? window.location.port : '')}>
                        Ավելացրեք Առաջինը
                    </a>
                </p>
                }
               
            </div>
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
    rightBoxes : state.linzCount.rightBoxes,
    BothEyesEye : state.linzCount.BothEyesEye,
    BothEyesCYL : state.linzCount.BothEyesCYL,
    BothEyesAxis : state.linzCount.BothEyesAxis,
    BothEyesBoxes : state.linzCount.BothEyesBoxes,
    bothEye : state.linzCount.bothEye,
    glassCount : state.linzCount.glassCount,
})

const mapDispatchToProps = {
    setBasketCount
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket);