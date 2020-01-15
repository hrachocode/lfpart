import React from 'react';
import Sucsses from '../detailPage/icons/checked.png';

const congratsMessage = props => (
      <section className="checkout-portal" id="basket-add">
            <div className="checkout">
                  <React.Fragment>
                        <h2>Գնումը հաջողությամբ կատարվել, մեր աշխատակիցը շուտով կապ կհաստատի Ձեզ հետ</h2>
                        <img src={Sucsses} alt="" />
                  </React.Fragment>
            </div>
      </section>
)

export default congratsMessage;