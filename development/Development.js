import React from 'react';
import { connect } from 'react-redux';
import { fullWidth, mobileWidth } from './Extensions';
import { bannersPhotoFetch } from './store/action';
import { productsAPI } from '../components/productsAPI';

import arevayin from '../components/homePage/banners/images/arevayin.jpg';
import optikakan from '../components/homePage/banners/images/optikakan.jpg';
import kontaktayin from '../components/homePage/banners/images/kontaktayin.jpg';
import aknocayin from '../components/homePage/banners/images/aknocayin.jpg';

class Development extends React.Component{
	state = {
        loading : true,
        elems : [
            {
                text : 'ԱՐԵՎԱՅԻՆ',
                img : arevayin
            },
            {
                text : 'ՕՊՏԻԿԱԿԱՆ',
                img : optikakan
            },
            {
                text : 'ԿՈՆՏԱԿՏԱՅԻՆ ՈՍՊՆՅԱԿ',
                img : kontaktayin
            },
            {
                text : 'ԱԿՆՈՑԱՅԻՆ ՈՍՊՆՅԱԿ',
                img : aknocayin
            },
        ]
    }
	
	componentDidMount(){
        this.props.bannersPhotoFetch(this.state.elems);
        this.signal = true;
        fetch(productsAPI('slider'))
        .then(res => res.json())
        .then(elems => {
            this.signal && this.setState({
                loading : false,
                elems,
            })
        })
        window.scrollTo({top : 0, behavior : 'smooth'})
    }
    
    componentWillUnmount(){
        this.signal = false;
    }

	render(){
		return this.props.browserWidth > 800 ? fullWidth() : mobileWidth();	
	}
}

const mapStateToProps = state => ({
	bannersPhoto : state.banners.photo,
	browserWidth : state.width.width,
})

const mapDispatchToProps = {
	bannersPhotoFetch
}

export default connect(mapStateToProps, mapDispatchToProps)(Development);


