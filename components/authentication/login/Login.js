import React from 'react';
import { Link } from 'react-router-dom';
import { Feild } from '../Helper';
import ValidHOC from '../ValidHOC';
import forgotPassword from '../forgotPassword/forgotPassword';

const Login = props => {
    const {mail, password, inputValid ,mailValid, passwordValid, error} = props.state;
    const {handleChange, submit} = props;
    
    return(
        <div className="authentication" id="login">
            <div className="authentication-form">
                <h2>Account Login</h2>
                <form onSubmit={event=>submit('login', event)}>
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
                            value="Sign in" 
                            onClick={event=>submit('login', event)}
                        />
                    </label>
                </form>
                <div className="forgot-create" >
                    <Link to='/forgot-password'>
                        <p>Forgot<span> Password?</span></p>
                    </Link>
                </div>
                <div className="input-valid">
                    {Feild(mailValid, passwordValid, inputValid, true, error)}
                </div>
            </div>
        </div>
    )
}

export default ValidHOC(Login);