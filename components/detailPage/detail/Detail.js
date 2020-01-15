import React from 'react';
import DetailPhoto from './detailPhoto/DetailPhoto';
import TechSpecs from './techSpecs/TechSpecs';
import DetailPurchase from './detailPurchase/DetailPurchase';
import { withRouter } from 'react-router-dom';
import { API, API_TOKEN, style} from '../Helper';
import Loader from '../../Loader';
import { fetchData } from '../../Helper';
import './Detail-Media.css';
import './Detail.css';

class Detail extends React.Component{

    state = {
        detail : {},
        loading : true,
    }

    detailFetch = () => {
        const api = `${API}${this.props.match.params.slug}${API_TOKEN}`;
        fetchData(api, (detail)=>this.setState({
            loading : false,
            detail,
        }))
    }

    componentDidUpdate(nextProps){ 
        if(nextProps.location.pathname!==this.props.location.pathname){
            this.setState({loading : true});
            this.detailFetch();
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        this.signal = true;
        this.detailFetch();
    }

    componentWillUnmount(){
        this.signal = false;
    }

    render(){
        const {detail, loading} = this.state;

        return detail.img ? (
            <div>
                <section id="detail-top">
                    {loading ? <Loader style={style}/> : <DetailPhoto images={detail.img} id={detail._id}/>}
                    <DetailPurchase detail={detail}/>
                </section>
                <TechSpecs/>
            </div>
        ) : null
    }
}

export default withRouter(Detail);