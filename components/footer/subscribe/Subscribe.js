import React from 'react';
import './Subscribe.css';
import './Subscribe-Media.css';

const Subscribe = () => {
    return(
        <div id="subscribe">
            <h3>
                ԲԱԺԱՆՈՐԴԱԳՐՎԻՐ ՄԵՐ ՆՈՐՈՒԹՅՈՒՆՆԵՐԻՆ
            </h3>
            <form id="subscribe-form">
                <input type="email" name="email" placeholder="էլ․ փոստ հասցե" required="required"/>
                <input type="button"/>
            </form>
        </div>
    )
}

export default Subscribe;