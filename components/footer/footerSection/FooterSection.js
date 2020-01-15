import React from 'react'
import facebook from '../icons/facebook.png'
import instagram from '../icons/instagram.png'
import insta from '../icons/insta.png'
import twitter from '../icons/twitter.png'

export const FooterSection = () => {
    return(
        <div id="footer-nav">
            <section id="footer-nav-container">
                <div>
                    <div>
                        <h4>Ընկերություն</h4>
                        <p>Մեր Մասին</p>
                        <p>Ծառայություններ</p>
                        <p>Ապրանքներ</p>
                        <p>Բլոգ</p>
                        <p>Հաճախ տրվող հարցեր</p>
                    </div>
                </div>
                <div>
                    <div>
                        <h4>Սպասարկում</h4>
                        <p> <a href='/refund' target='_blank'>Առաքում</a> </p>
                        <p> <a href='/shipment' target='_blank'>Վճարման Պայմաններ</a></p>
                    </div>
                </div>
                <div>
                    <div>
                        <h4>Կապ</h4>
                        <p>Հասցե</p>
                        <p>Մաշտոցի 7/7, ք. Երևան.</p>
                        <p>Հեռախոսահամար</p>
                        <p>Հեռ. +374 10 533 221</p>
                        <p>Բջջ. +374 93 539 502</p>
                        <p>Աշխատանքային ժամեր</p>
                        <p>10:00 - 20:00 / Երկուշաբթի - Շաբաթ</p>
                        <p>11։00 - 18։00 / Կիրակի</p>
                    </div>
                </div>
                <div id="join-us">
                    <div>
                        <h4>Հետևեք</h4>
                        <a href="https://www.facebook.com/linzoptic" target='_blank'> 
                            <span><img src={facebook} alt="Facebook Icon"/></span>
                        </a>
                        <a href="https://www.instagram.com/linzoptic" target='_blank'> 
                            <span><img src={instagram} alt="Instagram Icon"/></span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}