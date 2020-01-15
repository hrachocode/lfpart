import React from 'react';
import './PersonalInfo.css';
import ChangePassword from './ChangePassword';
import {requestServer} from '../../Helper';
import { Feild } from '../../authentication/Helper';
import ValidHOC from '../../authentication/ValidHOC';

class PersonalInfo extends React.Component{

    state = {
        user: null
    };

    name = React.createRef();
    surname = React.createRef();
    country = React.createRef(); 
    phone = React.createRef();
    email = React.createRef();
    address = React.createRef();
   
    // getDateParse = () => {
    //     let time = new Date();
    //     return `${time.toLocaleString('am', {year:'numeric'})}-${time.toLocaleString('am', {month:'numeric'}).padStart(2, '0')}-${time.toLocaleString('am', {day:'numeric'}).padStart(2, '0')}`;
    // }

    updateUser = (event) => {
        event.preventDefault();

        let name = this.name.current.value;
        let surname = this.surname.current.value;
        let country = this.country.current.value;
        let phone = this.phone.current.value;
        let mail = this.email.current.value;
        let address = this.address.current.value;

        fetch(requestServer('/user/update', 'POST', { name, surname, country, phone, mail, address  }))
        .then(res => res.json())
        .then(handleResponse => {
            this.setState({
                handleResponse: handleResponse.msg 
            });
        })
        .catch(error => console.log(error))
    }

    componentDidMount() {
        let req = new Request(`${window.location.protocol}//${window.location.host}/api/v1/user/?token=674e3a8b-fd97-4534-8b01-ade4618a757c`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.token
            }),
        })
        fetch(req)
        .then(res => res.json())
        .then(user=>this.setState({user}))
        .catch(error => console.log(error))
    }

    render(){
        const {user} = this.state;
        let userPhone = user ? user.phone : '';
        let userEmail = user ? user.mail : ''; 
        let userName = user ? user.name : ''; 
        let userSureName = user ? user.surname : ''; 
        let country = user ? user.country : ''; 
        let address = user ? user.address : ''; 
        const {firstName, lastName, /*mail, phone,*/ password, inputValid ,mailValid, passwordValid, birthDay} = this.props.state;
        const {handleChange, phoneChange, submit} = this.props;

        return(
            <div id="personal-info">
                <h2>Ձեր անձնական տվյալները</h2>
                <p>Խնդրում ենք թարմացնել Ձեր անձնական տվյալները, եթե դրանք փոփոխվել են</p>
                <div id="personal-forms">
                    <div className="authentication-form">
                        <h2>Change Current Info</h2>
                        <form>
                            <label>
                                <input 
                                    type="text"
                                    name="firstName"
                                    className="authentication-input" 
                                    placeholder={userName ? userName : 'Անուն'} 
                                    // value={userName}
                                    ref={this.name}
                                    // onChange={event=>handleChange('firstName', event)}
                                /> 
                                <input 
                                    type="text"
                                    name="lastName"
                                    className="authentication-input" 
                                    placeholder={userSureName ? userSureName : 'Ազգանուն'} 
                                    // value={userSureName ? userSureName : 'Ազգանուն'}
                                    ref={this.surname}
                                    // onChange={event=>handleChange('lastName', event)}
                                />
                                <input 
                                    type="text"
                                    name="country"
                                    className="authentication-input" 
                                    placeholder={country ? country : 'Երկիր'}
                                    // value={country ? country : 'Երկիր'}
                                    ref={this.country}
                                    // onChange={event=>handleChange('lastName', event)}
                                /> 
                                <input 
                                    type="text"
                                    name="address"
                                    className="authentication-input" 
                                    placeholder={address ? address : 'Հասցե'} 
                                    // value={address ? address : 'Հասցե'}
                                    ref={this.address}
                                    // onChange={event=>handleChange('lastName', event)}
                                /> 
                                {/* <input 
                                    type="date" 
                                    name="birthDay"
                                    className="authentication-input" 
                                    min="1900-01-01" 
                                    value={birthDay || "2000-01-01"}
                                    max={this.getDateParse()}
                                    onChange={event=>handleChange('birthDay', event)}
                                /> */}
                                <input 
                                    type="tel" 
                                    name="phone"
                                    className="authentication-input" 
                                    placeholder='Հհեռախոս' 
                                    value={userPhone ? userPhone : 'Հհեռախոս'}
                                    ref={this.phone}
                                    // onChange={event=>phoneChange(event)}
                                    disabled
                                />
                                <input
                                    type="email"
                                    name="mail"
                                    className="authentication-input" 
                                    placeholder="Email" 
                                    value={userEmail}
                                    ref={this.email}
                                    // onChange={event=>handleChange('mail', event)}
                                    disabled
                                />         
                                <input
                                    type="submit" 
                                    className="submit-form" 
                                    value="Save changes" 
                                    // onClick={event=>submit('register', event)}
                                    onClick={event => this.updateUser(event)}
                                />
                            </label>
                            <div className="input-valid">
                                
                                {/* {Feild(mailValid, passwordValid, inputValid)} */}
                            </div>               
                        </form>    
                    </div>
                    <div id="horizon-line"/>
                    <ChangePassword/>
                </div>
            </div>
        )
    }
}

export default ValidHOC(PersonalInfo);