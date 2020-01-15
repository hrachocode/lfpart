import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { requestServer } from '../../../Helper';
import { setWishlistCount } from '../../../account/store/action';
import { fetchData } from '../../../Helper';
import DetailZoom from '../detailZoom/DetailZoom';
import heart from '../../icons/heart.png';
import like from '../../icons/like.png';
import './DetailPhoto.css';

class DetailPhoto extends React.Component{
    state = {
        zoom : false,
        img : null,
        heart : false
    }

    onHover = img => this.setState({img})

    setZoom = () => {
        window.scrollTo(0,0);
        const {zoom} = this.state;
        this.setState({zoom : !zoom});
        document.getElementById('root').style.display = 'block';
    }

    addWishlist = () => {
        const {setWishlistCount, wishlist} = this.props;
        if(!localStorage.token || this.state.heart){
            return false;
        }
        this.setState({heart : true});
        let product_id = this.props.id;
        let body = {
            product_id,
            product_count : 1
        }

        fetchData(requestServer('wishlist', 'POST', body),()=>setWishlistCount(wishlist+1));
    }

    componentDidMount(){
        this.setState({img : this.props.images[0]})
        this.newPortal = document.createElement('div');
        document.body.appendChild(this.newPortal);
    }

    componentWillUnmount(){
        document.body.removeChild(this.newPortal);
    }

    render(){
        const {setZoom, onHover, addWishlist} = this;
        const {images} = this.props;
        
        return(
            this.state.zoom ? ReactDOM.createPortal(<DetailZoom images={images} setZoom={setZoom}/>, this.newPortal) :
            <div id="detail-photo">
                <div id="path-name">
                  <Link to="/">{"Home <"}</Link><span onClick={()=>this.props.history.goBack()} > {"back <"} </span>
                </div>
                {images && <ul>
                    {images.map((element, index)=>(
                    <li key={index} onMouseOver={()=>{onHover(element)}}>
                        <img src={element} alt="" />
                    </li>
                ))}
                </ul>}
                <div className="detail-image">
                    <img src={this.state.img} alt="" onClick={setZoom}/>
                </div>
                <img src={this.state.heart ? like : heart} alt="hearth" className="detail-hearth" onClick={addWishlist}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    wishlist : state.basketWishCount.wishlist
})

const mapDispatchToProps = {
    setWishlistCount
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailPhoto));