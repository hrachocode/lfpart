import React from 'react';
import { countries } from '../../countries';
import { Feild } from '../Helper';
import ValidHOC from '../ValidHOC';

const Register = props => {
    const {firstName, lastName, country, mail, phone, password, inputValid ,mailValid, passwordValid, error} = props.state;
    const {handleChange, phoneChange, submit} = props;

    return(
        <div className="authentication" id="register">
            <div className="authentication-form">
                <h2>Register</h2>
                <form onSubmit={event=>submit('register', event)}>
                    <label>
                        <input 
                            type="text"
                            name="firstName"
                            className="authentication-input" 
                            placeholder="Անուն" 
                            value={firstName}
                            onChange={event=>handleChange('firstName', event)}
                        />   
                        <input 
                            type="text"
                            name="lastName"
                            className="authentication-input" 
                            placeholder="Ազգանուն" 
                            value={lastName}
                            onChange={event=>handleChange('lastName', event)}
                        /> 
                        <select name="country" value={country} onChange={event=>handleChange('country', event)}>
                            {countries.map((elem, index)=>
                                <option value={elem.name} key={index}>
                                    {elem.name}
                                </option>)}
                        </select> 
                        <input 
                            type="email"
                            name="mail"
                            className="authentication-input" 
                            placeholder="Էլ հասցե" 
                            value={mail}
                            onChange={event=>handleChange('mail', event)}
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
                            type="password" 
                            name="password"
                            className="authentication-input" 
                            placeholder="Գաղտնաբառ"
                            value={password}
                            onChange={event=>handleChange('password', event)}
                        />
                        <input
                            type="submit" 
                            className="submit-form" 
                            value="Գրանցվել" 
                            onClick={event=>submit('register', event)}
                        />
                        <div className="input-valid">
                            {Feild(mailValid, passwordValid, inputValid, true, error)}
                        </div>
                    </label>
                </form>
            </div>
        </div>
    )
}

export default ValidHOC(Register);