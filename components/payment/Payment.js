import React from 'react';
import { Link } from 'react-router-dom';
import './Payment.css';
import smile from './icons/smiling.png';
import sad from './icons/sad.png';

class Payment extends React.Component {

    state = {
        success : undefined
    }
    
    render(){
        return (
            <div id="payment">
                <div>
                    <Link to="/">Home > </Link>
                    <Link to="/account/order-history">Orders </Link>
                </div>
                {this.state.success ? 
                <div id="success" className="payment-info">
                    <img src={smile} alt="smile"/>
                    <h1>Շնորհավորում ենք, ձեր գնումը հաջողությամբ կատարվել է</h1>
                </div> :
                <div id="payment-failure" className="payment-info">
                    <img src={sad} alt="sad"/>
                    <h1>Ձեր գնումը չի կատարվել</h1>
                    <p> Խնդրում ենք կապ հաստատել Հախախորդների սպասրակման կենտրոն չաթի միջոցով․ Խնդիրը պարզելու համար </p>
                </div>
                }
            </div>
        )
    }
}

export default Payment;