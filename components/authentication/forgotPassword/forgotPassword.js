import React from 'react';
import { requestServer } from '../../Helper';

class forgotPassword extends React.Component{
      state = {
            handleResponse: null,
            token: null
      }

      email = React.createRef();

      sendMail = (event) => {
            event.preventDefault();
            let {token} = this.state;
            let email = this.email.current.value, successCaptcha = false;
            let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(email.length > 0 && emailRegex.test( String(email.toLowerCase()) ) ){
                  this.setState({
                        handleResponse: ''
                  })
                  grecaptcha.ready(() => {
                        grecaptcha.execute('6LeiOcAUAAAAAPNP3_KuPwNPbneiPX6DcrvQI6ld', {action: 'sendMail'})
                              .then((token) => {
                                    if(token){
                                          fetch(requestServer('/password/reset', 'POST', {email, token}))
                                          .then(res => res.json())
                                          .then(success => {
                                                if(success.error){
                                                      this.setState({ handleResponse: 'Նման էլ հասցեով օգտատեր չի գտնվել' })
                                                }else{
                                                      this.setState({ handleResponse: 'Էլ հասցեին ուղարկվել է հղումը գաղտնաբառը փոփոխելու համար' }); 
                                                }
                                          } )
                                          .catch(e => {
                                                console.log(e)
                                          })
                                    }
                              });
                  });
            }else{
                  this.setState({
                        handleResponse: 'Խնդրում ենք մուտքագրել Էլ․հասցե'
                  })
            }
              
      }

      render(){
            let {handleResponse} = this.state;
            return (
                  <div>
                        <div className="authentication-form">
                              <h2>Մուտքագրել Էլ հասցեն</h2>
                              <form action="" method="POST">
                                    <label>
                                          <input 
                                                type="email" 
                                                name="email"
                                                className="authentication-input" 
                                                placeholder="Էլ․ հասցե"
                                                ref={this.email}
                                                required
                                          />

                                          <input
                                                type="submit" 
                                                className="submit-form" 
                                                value="Հաստատել"
                                                onClick={event => this.sendMail(event)} 
                                          />
                                          
                                          <div className="input-valid">
                                                {handleResponse ? handleResponse : ''}
                                          </div>
                                    </label>
                              </form>
                        </div>
                  </div>
            )
      }
}

export default forgotPassword;