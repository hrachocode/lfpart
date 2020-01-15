import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Banner.css';
import './Banner-Media.css';

const Banner = props => {
        const {index, bannersPhoto} = props;
        let path = index===0 ? 'glasses': index===1 ? 'contact-lens' : index===3 ? 'eye-lens': 'care'

        return(
            <div>
                {bannersPhoto.length>0 && <Link to={`/products/${path}/{}`} >
                    <div className="banner-child">
                      <React.Fragment>
                            <img src={bannersPhoto[index].img} alt="First slide"/>
                            <div className="banner-absolute-div ">
                                <h1>{bannersPhoto[index].text}</h1>
                                <h4>Դիտել ամբողջը</h4>
                            </div>
                       </React.Fragment>
                    </div>
                </Link>}
            </div>
        )
    }

const mapStateToProps = state => ({
    bannersPhoto : state.banners.photo,
})

export default withRouter(connect(mapStateToProps)(Banner));