import React from 'react';
import { Feild } from '../../authentication/Helper';
import ValidHOC from '../../authentication/ValidHOC';
import { requestServer } from '../../Helper';

class ChangePassword extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            handleResponse: null
        }

        this.newPass = React.createRef();
        this.currPass = React.createRef();
        this.reapeatPass = React.createRef();

    }

    changePass = (event) => {
        event.preventDefault();
        let old_password = this.currPass.current.value;
        let new_password = this.newPass.current.value;
        let repeat_password = this.reapeatPass.current.value;
        


        fetch(requestServer('/user/changePass', 'POST', { old_password, new_password, repeat_password }))
        .then(res => res.json())
        .then(handleResponse => {
            this.setState({
                handleResponse: handleResponse.msg 
            });
        })
        .catch(error => console.log(error))
    }

    render() {
        const {handleResponse} = this.state;
        const {password, newPassword, inputValid ,mailValid, passwordValid, newPasswordValid} = this.props.state;
        const {handleChange, submit} = this.props;
        return(
            <div className="authentication-form">
                <h2>Change Password</h2>
                <form action="/account/personal-info" method="POST">
                    <label>
                        <input 
                            type="password" 
                            name="newPassword"
                            className="authentication-input" 
                            placeholder="New password"
                            ref={this.currPass}
                            required
                            // value={newPassword}
                            // onChange={event=>handleChange('newPassword', event)}
                        />
                        <input 
                            type="password" 
                            name="password"
                            className="authentication-input" 
                            placeholder="Current password"
                            ref={this.newPass}
                            required
                            // value={password}
                            // onChange={event=>handleChange('password', event)}
                        />
                        <input 
                            type="password" 
                            name="password"
                            className="authentication-input" 
                            placeholder="Repeat Current password"
                            ref={this.reapeatPass}
                            required
                            // value={password}
                            // onChange={event=>handleChange('password', event)}
                        />
                        <input
                            type="submit" 
                            className="submit-form" 
                            value="Change password"
                            onClick={event => this.changePass(event)} 
                            // onClick={event=>submit('changePass', event)}
                        />
                        <div className="input-valid">
                            {handleResponse ? handleResponse : ''}
                            {/* {Feild(mailValid, passwordValid, inputValid, newPasswordValid)} */}
                        </div>
                    </label>
                </form>
            </div>
        )
    }
}

export default ValidHOC(ChangePassword);