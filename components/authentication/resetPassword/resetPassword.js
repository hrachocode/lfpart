import React from 'react';
import { requestServer } from '../../Helper';

class resetPassword extends React.Component {

      state = {
            handleResponse: null
      }

      newPass = React.createRef();
      reapeatPass = React.createRef();

      changePass = (event) => {
            event.preventDefault();
            let newPassword = this.newPass.current.value;
            let repeat_password = this.reapeatPass.current.value;
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');

            if (String(newPassword) == String(repeat_password)) {
                  fetch(requestServer('/password/change', 'POST', { token, newPassword }))
                        .then(res => res.json())
                        .then(success => {
                              if(success.message){
                                    this.setState({
                                          handleResponse: 'Գաղտնաբառը հաջողությամբ փոփոխված է'
                                    });
                              }
                        })
                        .catch(error => {
                              error.status = 400 ? this.setState({ handleResponse: 'Տվյալ հղումը անհասանելի է' }) : console.log(error)
                        })
            } else {
                  this.setState({
                        handleResponse: 'Գաղտանաբառերը չեն համընկնում'
                  })
            }

      }

      render() {
            const { handleResponse } = this.state;

            return (
                  <div className="authentication-form">
                        <h2>Մուտքագրել նոր գաղտնաբառը</h2>
                        <form action="" method="POST">
                              <label>
                                    <input
                                          type="password"
                                          name="password"
                                          className="authentication-input"
                                          placeholder="Նոր Գաղտնաբառ"
                                          ref={this.newPass}
                                          required
                                    />
                                    <input
                                          type="password"
                                          name="password"
                                          className="authentication-input"
                                          placeholder="Կրկնել նոր գաղտնաբառը"
                                          ref={this.reapeatPass}
                                          required
                                    />
                                    <input
                                          type="submit"
                                          className="submit-form"
                                          value="Change password"
                                          onClick={event => this.changePass(event)}
                                    />
                                    <div className="input-valid">
                                          {handleResponse ? handleResponse : ''}
                                    </div>
                              </label>
                        </form>
                  </div>
            )
      }
}

export default resetPassword;