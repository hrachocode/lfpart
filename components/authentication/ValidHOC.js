import React from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import { setModal, loading, authentified } from './store/action';
import Loader from '../Loader';
import './Authentication.css';

const ValidHOC = Copmonent => (
    class extends React.Component {
        state = {
            firstName : '',
            lastName : '',
            country : 'Armenia',
            shippingAddress : '',
            mail : '',
            phone : '',
            password : '',
            newPassword : '',
            birthDay : '',
            inputValid : true,
            mailValid : true,
            passwordValid : true,
            newPasswordValid : true,
            error : ''
        }

        handleChange = (name, event) => {
            this.setState({[name] : event.target.value})
        }

        phoneChange = event => {
            let reg = /^[0-9\b]+$/;
            event.target.value === '' || reg.test(event.target.value) ? this.setState({phone : event.target.value}) : console.log('Not number');
        }
    
        inputTest = (name, event) => {
            const validRegexp = {
                newPassword :  new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{4,})').test(this.state.newPassword),
                password :  new RegExp('^(|((?=.*[a-z])))(?=.{4,})').test(this.state.password),
                mail : /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.mail)
            }
            if(!validRegexp[name]){
                this.setState({[name+'Valid'] : false});
                event.target.closest('label').children[name].style.borderColor = 'red';
                return this.valid = false;
            }else{
                this.setState({[name+'Valid'] : true});
            }
        }
    
        submit = (api, event) => {
            const {setModal, loading, authentified} = this.props;
            event.preventDefault();
            loading(true);
            let inputs = event.target.closest('label').children;
            let body = {};
            this.valid = true;
            for(let key in this.state){
                for(let elem in inputs){
                    if(inputs[elem].name===key){
                        if(this.state[key].length===0){
                            this.valid = false;
                            inputs[elem].style.borderColor = 'red';
                        }else{
                            inputs[elem].style.borderColor = '#eaeaea';
                            body[key]=inputs[elem].value;
                        }
                    }
                }
            }
            
            !this.valid ? this.setState({inputValid : false}) : this.setState({inputValid : true});
            this.state.mail && this.inputTest('mail', event);
            this.state.password && this.inputTest('password', event);
            this.state.newPassword && this.inputTest('newPassword', event);
            if(!this.valid){
                loading(false);
                return false;
            }

            let requestURL = `${window.location.protocol}//${window.location.host}/api/v1/user/${api}?token=674e3a8b-fd97-4534-8b01-ade4618a757c`;
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let init = {
                method: 'POST',
                body : JSON.stringify(body),
                headers
            }
            let request = new Request(requestURL, init);
     
            fetch(request)
                .then(res => res.json())
                .then(data => {
                    loading(false);
                    if(data.token){
                        localStorage.setItem('token', data.token);
                        data.user ? localStorage.setItem('shippingAddress', data.shipping_address) : localStorage.setItem('shippingAddress', data.newUser.shipping_address);
                        data.user ? localStorage.setItem('id', data.user._id) : localStorage.setItem('id', data.newUser._id);
                        setModal(true);
                        authentified(true);
                    }else{
                        this.setState({error : data[Object.keys(data)[0]]})
                    }
                })
                .catch(e => console.log(e))
        }

        render(){
            const {handleChange, phoneChange, inputTest, submit, state} = this;

            return (
                <Copmonent 
                    state={state}
                    handleChange={handleChange}
                    phoneChange={phoneChange}
                    inputTest={inputTest}
                    submit={submit}
                />
            )
        }

    }
)

const mapStateToProps = state => ({
    load : state.modal.loading,
})

const mapDispatchToProps = {
    setModal,
    loading,
    authentified
}

const composedValidHoc = compose(
    connect(mapStateToProps, mapDispatchToProps),
    ValidHOC
)

export default composedValidHoc;