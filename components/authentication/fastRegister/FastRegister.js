import React from 'react';
import ValidHOC from '../ValidHOC';
import { Feild } from '../Helper';
import './FastRegister.css';

const FastRegister = props =>  {
    const {mail, phone, inputValid ,mailValid, shippingAddress, error} = props.state;
    const {handleChange, phoneChange, submit} = props;

    return(
        <div className="authentication" id="fast-register">
            <div className="authentication-form">
                <h2>Fast registration</h2>
                <form onSubmit={event=>submit('quick_checkout', event)}>
                    <label>
                        <input 
                            type="email"
                            name="mail"
                            className="authentication-input" 
                            placeholder="Էլ հասցե" 
                            value={mail}
                            onChange={event=>handleChange('mail', event)}
                        />  
                        <input 
                            type="text" 
                            name="shippingAddress"
                            className="authentication-input" 
                            placeholder="Առաքման հասցե" 
                            value={shippingAddress}
                            onChange={event=>handleChange('shippingAddress', event)}
                        />
                        <input 
                            type="tel" 
                            name="phone"
                            className="authentication-input" 
                            placeholder="Հեռախոս" 
                            value={phone}
                            onChange={event=>phoneChange(event)}
                        />
                        <input
                            type="submit" 
                            className="submit-form" 
                            value="Գնել" 
                            onClick={event=>submit('quick_checkout', event)}
                        />
                    </label>
                </form>
                <div className="forgot-create">
                    <p>Create an account?<span> Sign up</span></p>
                </div>
                <div className="input-valid">
                    {Feild(mailValid, true, inputValid, true, error)}
                </div>
            </div>
        </div>
    )
}

export default ValidHOC(FastRegister);