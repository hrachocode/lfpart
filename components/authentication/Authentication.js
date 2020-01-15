import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Login from './login/Login';
import Register from './register/Register';
import { LoaderModal } from '../Helper';
import './Authentication.css';

const Authentication = props => {
    if(localStorage.token){
        props.history.replace('account');
    }

    return(
        <div id="authentication">
            <Login/>
            <Register/>
            {props.loading && <LoaderModal/>}
        </div>
    )
}

const mapStateToProps = state => ({
    loading : state.modal.loading,
    modal : state.modal.modal,
    userInside : state.modal.userInside
})

export default withRouter(connect(mapStateToProps)(Authentication));