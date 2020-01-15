import React from 'react';
import { connect } from 'react-redux';
import { LoaderModal } from '../../../Helper';
import Login from '../../../authentication/login/Login';
import FastRegister from '../../../authentication/fastRegister/FastRegister';
import BuyingPage from '../../../buyingPage/BuyingPage';
import './Checkout.css';

const style = {
    width: '80%',
    height: '360px',
    position: 'absolute',
    backgroundColor: '#e0e0e0',
    minHeight: '50vh',
    maxWidth: '850px',
    top: '55%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}

const Checkout = props => {
    const showModal = () => {
        return <BuyingPage/>
    }

    return (
        <section className="checkout-portal">
            <div className="checkout">
                {showModal()}
            </div>
            {props.loading && <LoaderModal style={style}/>}
        </section>
    )
}

const mapStateToProps = state => ({
    modal : state.modal.modal,
    loading : state.modal.loading
})

export default connect(mapStateToProps)(Checkout);