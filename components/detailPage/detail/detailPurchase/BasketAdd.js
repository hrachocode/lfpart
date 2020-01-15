import React from 'react';
import Sucsses from '../../icons/checked.png';

const BasketAdd = props => (
        <section className="checkout-portal" id="basket-add">
            <div className="checkout">
                {!props.login ? 
                    <React.Fragment> 
                        <h2>Ապրանքը հաջողությամբ ավելացել է Ձեր զամբյուղ</h2>
                        <img src={Sucsses} alt=""/>
                    </React.Fragment> : 
                    <h1>Խնդրում ենք գրանցվել</h1>
                }
            </div>
        </section>
    )

export default BasketAdd;